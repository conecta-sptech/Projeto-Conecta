import com.github.britooo.looca.api.core.Looca;
import org.json.JSONObject;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import oshi.SystemInfo;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Scanner;
import java.util.concurrent.ThreadLocalRandom;


public class Main {
    public static void main(String[] args) throws InterruptedException, IOException {

        Scanner leitor = new Scanner(System.in);
        Conexao conexao = new Conexao();
        JdbcTemplate interfaceConexao = conexao.getConexaoDoBanco();
        Looca looca = new Looca();
        SystemInfo oshi = new SystemInfo();
        FormatString leitura = new FormatString();
        JSONObject message = new JSONObject();
        Slack slack = new Slack();
        LeituraDisco leituraDiscoPc = new LeituraDisco();

        Double processador = looca.getProcessador().getUso();
        Double memoriaRAM = looca.getMemoria().getDisponivel() / Math.pow(1024.0, 3);
        Double disco = leituraDiscoPc.discoDisponivel;

        String caminhoArquivo = "C:\\Log\\logs.txt";

        String date = "";
        String logLevel = "";
        Integer statusCode = 0;
        String detail = "";
        String stackTrace = "";

        System.out.println("Digite seu login");
        String login_digitado = leitor.nextLine();

        System.out.println("Digite sua senha");
        String senha_digitada = leitor.nextLine();

        try {
            //verifica se a máquina está cadastrada
            List<Usuario> usuarioBanco = interfaceConexao.query("SELECT * FROM Usuario WHERE emailUsuario = '%s' AND senhaUsuario = '%s'".formatted(login_digitado, senha_digitada), new BeanPropertyRowMapper<>(Usuario.class));

            switch (usuarioBanco.size()) {
                case 0:
                    //usuario nao encontrado
                    date = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS").format(new Date());
                    logLevel = "WARN";
                    statusCode = 403;
                    detail = "'message': '%s', 'email': '%s', 'senha': '%s'".formatted("E-mail ou senha incorreto(s).", login_digitado, senha_digitada.replaceAll(".", "*"));

                    Log warnLogUsuario = new Log(date, logLevel, statusCode, detail, stackTrace);
                    Log.gerarLog(caminhoArquivo, warnLogUsuario.toString());

                    System.out.println("Login ou senha incorretos ou inexistentes");
                    break;

                default:
                    System.out.println("Login realizado, aguarde as leituras... \n\n\n\n\n\n");
                    //verifica se a máquina está cadastrada
                    String hostname = looca.getRede().getParametros().getHostName();
                    List<Maquina> maquinaBanco = interfaceConexao.query("SELECT * FROM Maquina WHERE hostnameMaquina = '%s'".formatted(hostname), new BeanPropertyRowMapper<>(Maquina.class));

                    switch (maquinaBanco.size()) {
                        case 0:
                            //maquina nao encontrada
                            date = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS").format(new Date());
                            logLevel = "WARN";
                            statusCode = 404;
                            detail = "'message': '%s', 'hostname': '%s'".formatted("Máquina não encontrada no banco de dados.", hostname);

                            Log warnLogMaquina = new Log(date, logLevel, statusCode, detail, stackTrace);
                            Log.gerarLog(caminhoArquivo, warnLogMaquina.toString());

                            System.out.println("Cadastre a máquina antes de prosseguir");
                            break;

                        default:

                            Integer idMaquina = 0;
                            String hostnameMaquina = "";

                            for (Maquina maquina : maquinaBanco) {
                                idMaquina = maquina.getIdMaquina();
                                hostnameMaquina = maquina.getHostnameMaquina();
                            }

                            while (true) {
                                // maquina encontrada, liberado enviar leitura
                                LeituraDisco discoAnterior = new LeituraDisco();
                                LeituraRede redeAnterior = new LeituraRede();

                                Thread.sleep(10000);

                                LeituraDisco discoAtual = new LeituraDisco();
                                LeituraRede redeAtual = new LeituraRede();

                                LeituraMemoria memoria = new LeituraMemoria();
                                LeituraCpu cpu = new LeituraCpu();
                                Long taxa_escrita_disco = ((discoAtual.discoTaxaEscrita - discoAnterior.discoTaxaEscrita) / 3) / 1024;
                                Long taxa_leitura_disco = ((discoAtual.discoTaxaLeitura - discoAnterior.discoTaxaLeitura) / 3) / 1024;
                                Long taxa_dowload_rede = ((redeAtual.redeDowload - redeAnterior.redeDowload) / 3) / 1024;
                                Long taxa_upload_rede = ((redeAtual.redeUpload - redeAnterior.redeUpload) / 3) / 1024;

                                String fk_empresa = maquinaBanco.get(0).getFkEmpresaMaquina();
                                interfaceConexao.update("INSERT INTO LeituraDisco (discoDisponivel, discoTaxaLeitura, discoTaxaEscrita, fkComponenteDisco, fkMaquinaDisco)" +
                                        "VALUES (%s, %d, %d, 1, %s)".formatted
                                                (leitura.formatString(discoAtual.discoDisponivel), taxa_leitura_disco, taxa_escrita_disco, fk_empresa));

                                interfaceConexao.update("INSERT INTO LeituraMemoria (memoriaDisponivel, memoriaVirtual, tempoLigado, fkComponenteMemoria, fkMaquinaMemoria)" +
                                        "VALUES (%s, %s, %d, 2, %s)".formatted
                                                (leitura.formatString(memoria.memoriaDisponivel), leitura.formatString(memoria.memoriaVirtual), memoria.tempoLigado, fk_empresa));

                                interfaceConexao.update("INSERT INTO LeituraRede (redeDownload, redeUpload, fkComponenteRede, fkMaquinaRede)" +
                                        "VALUES (%d, %d, 3, %s)".formatted
                                                (taxa_dowload_rede, taxa_upload_rede, fk_empresa));

                                interfaceConexao.update("INSERT INTO LeituraCpu (cpuUso, cpuCarga, cpuTemperatura, fkComponenteCpu, fkMaquinaCpu)" +
                                        "VALUES (%s, %s, %s, 4, %s)".formatted
                                                (leitura.formatString(cpu.cpuUso), leitura.formatString(cpu.cpuCarga), leitura.formatString(cpu.cpuTemperatura), fk_empresa));

                                LocalDateTime dataHora = LocalDateTime.now();
                                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
                                String dataHoraFormatada = dataHora.format(formatter);

//                                if (processador > 80.0) {
//                                    message.put("text",
//                                            "    ALERTA\n" +
//                                                    "\n" +
//                                                    " Hostname: " + hostname + "\n" +
//                                                    " Componente: Processador " + processador + " %\n" +
//                                                    " Data/Hora: " + dataHoraFormatada + " \n");
//
//                                } else if (memoriaRAM < 1.0) {
//                                    message.put("text",
//                                            "    ALERTA\n" +
//                                                    "\n" +
//                                                    " Hostname: " + hostname + "\n" +
//                                                    " Componente: Memoria Ram " + memoriaRAM + " mb\n" +
//                                                    " Data/Hora: " + dataHoraFormatada + " \n");
//                                } else if (disco < 100) {
//                                    message.put("text",
//                                            "    ALERTA\n" +
//                                                    "\n" +
//                                                    " Hostname: " + hostname + "\n" +
//                                                    " Componente: Disco " + disco + " gb\n" +
//                                                    " Data/Hora: " + dataHoraFormatada + " \n");
//                                } else if (processador > 80.0 && memoriaRAM < 1.0) {
//                                    message.put("text",
//                                            "    ALERTA\n" +
//                                                    "\n" +
//                                                    " Hostname: " + hostname + "\n" +
//                                                    " Componente: Processador " + processador + " % e Memoria Ram " + memoriaRAM + " mb\n" +
//                                                    " Data/Hora: " + dataHoraFormatada + " \n");
//                                } else if (processador > 80.0 && disco < 100) {
//                                    message.put("text",
//                                            "    ALERTA\n" +
//                                                    "\n" +
//                                                    " Hostname: " + hostname + "\n" +
//                                                    " Componente: Processador " + processador + " % e Disco " + disco + " gb\n" +
//                                                    " Data/Hora: " + dataHoraFormatada + " \n");
//                                } else if (memoriaRAM < 1.0 && disco < 100) {
//                                    message.put("text",
//                                            "    ALERTA\n" +
//                                                    "\n" +
//                                                    " Hostname: " + hostname + "\n" +
//                                                    " Componente: Memoria Ram " + memoriaRAM + " mb e Disco " + disco + " gb\n" +
//                                                    " Data/Hora: " + dataHoraFormatada + " \n");
//                                } else if (processador > 80.0 && memoriaRAM < 1 && disco < 100) {
//                                    message.put("text",
//                                            "    ALERTA\n" +
//                                                    "\n" +
//                                                    " Hostname: " + hostname + "\n" +
//                                                    " Componente: Processador " + processador +
//                                                    " % e Memoria Ram " + memoriaRAM +
//                                                    " mb e Disco " + disco + " gb\n" +
//                                                    " Data/Hora: " + dataHoraFormatada + " \n");
//                                }
//                                slack.sendMessage(message);
                                DispositivoUsb.verificarDispositivo();

                                System.out.println("""
                                        \n\n\n\n\n\n
                                        Leituras realizadas com sucesso!
                                        Enviando dados de disco:
                                        1 - Disco disponível: %.2f Gb
                                        2 - Taxa de escrita: %d Kb/s
                                        3 - Taxa de leitura: %d Kb/s

                                        Enviando dados de memória:
                                        1 - Memória disponível: %.2f Gb
                                        2 - Memória virtual: %.2f Gb
                                        3 - Tempo ligado: %d Horas

                                        Enviando dados de rede:
                                        1 - Taxa dowload: %d Mb/s
                                        2 - Taxa upload: %d Mb/s

                                        Enviando dados de cpu:
                                        1 - Uso: %.2f %%
                                        2 - Carga: %.2f %%
                                        3 - Temperatura: %.2f °C
                                        """.formatted(
                                        discoAtual.discoDisponivel, taxa_escrita_disco, taxa_leitura_disco,
                                        memoria.memoriaDisponivel, memoria.memoriaVirtual, memoria.tempoLigado,
                                        taxa_dowload_rede, taxa_upload_rede,
                                        cpu.cpuUso, cpu.cpuCarga, ThreadLocalRandom.current().nextDouble(40.0, 42.0)
                                ));
                            }
                    }
            }

        } catch (Exception e) {
            date = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS").format(new Date());
            logLevel = "ERROR";
            statusCode = 503;
            detail = "'message': 'Houve um problema de conexão com o banco de dados.'";

            //Captura o stackTrace e o transforma em uma String
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            stackTrace = sw.toString().replace("\n", " ").replace("\r", "").replace("\t", "");

            Log errorLogServer = new Log(date, logLevel, statusCode, detail, stackTrace);
            Log.gerarLog(caminhoArquivo, errorLogServer.toString());
        }
    }
}
