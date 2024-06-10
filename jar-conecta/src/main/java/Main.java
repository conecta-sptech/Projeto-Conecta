import com.github.britooo.looca.api.core.Looca;
import io.github.cdimascio.dotenv.Dotenv;
import org.json.JSONObject;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.math.BigDecimal;
import java.math.RoundingMode;
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
import java.util.concurrent.ThreadLocalRandom;


public class Main {
    public static void main(String[] args) throws InterruptedException, IOException {
        Dotenv dotenv = Dotenv.load();

        Conexao conexaoLocal = new Conexao("com.mysql.cj.jdbc.Driver", "jdbc:mysql://localhost:mysql-db/Conecta");
        JdbcTemplate interfaceConexaoLocal = conexaoLocal.getConexaoDoBanco();

        Conexao conexaoNuvem = new Conexao("com.microsoft.sqlserver.jdbc.SQLServerDriver", "jdbc:sqlserver://100.28.72.89:1433;databaseName=Conecta;encrypt=true;trustServerCertificate=true");
        JdbcTemplate interfaceConexaoNuvem = conexaoNuvem.getConexaoDoBanco();

        Looca looca = new Looca();
        FormatString leitura = new FormatString();

        JSONObject message = new JSONObject();
        Slack slack = new Slack();

        String caminhoArquivo = "C:\\Log\\logs.txt";

        String date = "";
        String logLevel = "";
        Integer statusCode = 0;
        String detail = "";
        String stackTrace = "";

        Integer minimoAmarelo = Integer.parseInt(dotenv.get("MINIMO_AMARELO"));
        Integer minimoVermelho = Integer.parseInt(dotenv.get("MINIMO_VERMELHO"));
        Integer fkEmpresa = Integer.parseInt(dotenv.get("FK_EMPRESA"));

        try {
            //verifica se a máquina está cadastrada
            String hostname = looca.getRede().getParametros().getHostName();
            List<Maquina> maquinaBanco = interfaceConexaoNuvem.query("SELECT * FROM Maquina WHERE hostnameMaquina = '%s'".formatted(hostname), new BeanPropertyRowMapper<>(Maquina.class));
            Integer idMaquina = maquinaBanco.isEmpty() ? null : maquinaBanco.get(0).getIdMaquina();

            switch (maquinaBanco.size()) {
                case 0:
                    //maquina nao encontrada, momento de cadastrar
                    date = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS").format(new Date());
                    logLevel = "WARN";
                    statusCode = 404;
                    detail = "'message': '%s', 'hostname': '%s'".formatted("Máquina não encontrada no banco de dados.", hostname);

                    Log warnLogMaquina = new Log(date, logLevel, statusCode, detail, stackTrace);
                    Log.gerarLog(caminhoArquivo, warnLogMaquina.toString());

                    interfaceConexaoNuvem.update("INSERT INTO Maquina (hostnameMaquina, ramMaquina, discoMaquina, clockProcessadorMaquina, nucleosProcessadorMaquina, soMaquina, intervaloLeitura, fkEmpresaMaquina)" +
                            "VALUES ('%s', %s, %.0f, %s, %d, '%s', 10, %d)".formatted
                                    (hostname,
                                            leitura.formatString(looca.getMemoria().getTotal() / Math.pow(1024, 3)),
                                            looca.getGrupoDeDiscos().getTamanhoTotal() / Math.pow(1024, 3),
                                            leitura.formatString(looca.getProcessador().getFrequencia() / Math.pow(10, 9)),
                                            looca.getProcessador().getNumeroCpusFisicas(),
                                            looca.getSistema().getSistemaOperacional(),
                                            fkEmpresa));

                    List<Maquina> maquinaCadastrada = interfaceConexaoNuvem.query("SELECT idMaquina FROM Maquina WHERE hostnameMaquina = '%s'".formatted(hostname), new BeanPropertyRowMapper<>(Maquina.class));
                    idMaquina = maquinaCadastrada.get(0).getIdMaquina();

                    interfaceConexaoNuvem.update(("INSERT INTO Componente (idComponente, nomeComponente, fkMaquinaComponente, fkEmpresaComponente) VALUES" +
                            "(1, 'Disco', %d, %d)," +
                            "(2, 'Memoria', %d, %d)," +
                            "(3, 'Rede', %d, %d)," +
                            "(4, 'Cpu', %d, %d)").formatted(idMaquina, fkEmpresa, idMaquina, fkEmpresa, idMaquina, fkEmpresa, idMaquina, fkEmpresa));

                default:
                    while (true) {
                        List<Maquina> maquinaRecebendoLeitura = interfaceConexaoNuvem.query("SELECT intervaloLeitura FROM Maquina WHERE hostnameMaquina = '%s'".formatted(hostname), new BeanPropertyRowMapper<>(Maquina.class));
                        Integer intervaloLeitura = maquinaRecebendoLeitura.get(0).getIntervaloLeitura() - 6;

                        LeituraDisco discoAnterior = new LeituraDisco();
                        LeituraRede redeAnterior = new LeituraRede();

                        Thread.sleep(intervaloLeitura * 1000);

                        LeituraDisco discoAtual = new LeituraDisco();
                        LeituraRede redeAtual = new LeituraRede();

                        LeituraMemoria memoria = new LeituraMemoria();
                        LeituraCpu cpu = new LeituraCpu();
                        Long taxa_escrita_disco = ((discoAtual.discoTaxaEscrita - discoAnterior.discoTaxaEscrita) / intervaloLeitura) / 1024;
                        Long taxa_leitura_disco = ((discoAtual.discoTaxaLeitura - discoAnterior.discoTaxaLeitura) / intervaloLeitura) / 1024;
                        Long taxa_dowload_rede = ((redeAtual.redeDowload - redeAnterior.redeDowload) / intervaloLeitura) / 1024;
                        Long taxa_upload_rede = ((redeAtual.redeUpload - redeAnterior.redeUpload) / intervaloLeitura) / 1024;

                        interfaceConexaoNuvem.update("INSERT INTO LeituraDisco (discoDisponivel, discoTaxaLeitura, discoTaxaEscrita, fkComponenteDisco, fkMaquinaDisco)" +
                                "VALUES (%s, %d, %d, 1, %d)".formatted
                                        (leitura.formatString(discoAtual.discoDisponivel), taxa_leitura_disco, taxa_escrita_disco, idMaquina));

                        interfaceConexaoLocal.update("INSERT INTO LeituraDisco (discoDisponivel, discoTaxaLeitura, discoTaxaEscrita)" +
                                "VALUES (%s, %d, %d)".formatted
                                        (leitura.formatString(discoAtual.discoDisponivel), taxa_leitura_disco, taxa_escrita_disco));

//                        ---------------------------------------------------------leitura disco

                        interfaceConexaoNuvem.update("INSERT INTO LeituraMemoria (memoriaDisponivel, memoriaVirtual, tempoLigado, fkComponenteMemoria, fkMaquinaMemoria)" +
                                "VALUES (%s, %s, %d, 2, %d)".formatted
                                        (leitura.formatString(memoria.memoriaDisponivel), leitura.formatString(memoria.memoriaVirtual), memoria.tempoLigado, idMaquina));

                        interfaceConexaoLocal.update("INSERT INTO LeituraMemoria (memoriaDisponivel, memoriaVirtual, tempoLigado)" +
                                "VALUES (%s, %s, %d)".formatted
                                        (leitura.formatString(memoria.memoriaDisponivel), leitura.formatString(memoria.memoriaVirtual), memoria.tempoLigado));

//                        ---------------------------------------------------------leitura memoria

                        interfaceConexaoNuvem.update("INSERT INTO LeituraRede (redeDownload, redeUpload, fkComponenteRede, fkMaquinaRede)" +
                                "VALUES (%d, %d, 3, %d)".formatted
                                        (taxa_dowload_rede, taxa_upload_rede, idMaquina));

                        interfaceConexaoLocal.update("INSERT INTO LeituraRede (redeDownload, redeUpload)" +
                                "VALUES (%d, %d)".formatted
                                        (taxa_dowload_rede, taxa_upload_rede));

//                        ---------------------------------------------------------leitura memoria

                        interfaceConexaoNuvem.update("INSERT INTO LeituraCpu (cpuUso, cpuCarga, cpuTemperatura, fkComponenteCpu, fkMaquinaCpu)" +
                                "VALUES (%s, %s, %s, 4, %d)".formatted
                                        (leitura.formatString(cpu.cpuUso), leitura.formatString(cpu.cpuCarga), ThreadLocalRandom.current().nextDouble(40.0, 42.0), idMaquina));

                        interfaceConexaoLocal.update("INSERT INTO LeituraCpu (cpuUso, cpuCarga, cpuTemperatura)" +
                                "VALUES (%s, %s, %s)".formatted
                                        (leitura.formatString(cpu.cpuUso), leitura.formatString(cpu.cpuCarga), ThreadLocalRandom.current().nextDouble(40.0, 42.0)));

//                        ---------------------------------------------------------leitura cpu

                        LocalDateTime dataHora = LocalDateTime.now();
                        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
                        String dataHoraFormatada = dataHora.format(formatter);

                        Double processador = looca.getProcessador().getUso();
                        Double memoriaRAM = (looca.getMemoria().getDisponivel() * 100 / looca.getMemoria().getTotal()) / Math.pow(1024, 3);
                        Double disco = discoAtual.discoDisponivel * 100 / (looca.getGrupoDeDiscos().getTamanhoTotal() / Math.pow(1024, 3));
                        Long rede = taxa_dowload_rede + taxa_upload_rede;

                        String corAlerta = "";

                        if (processador > minimoAmarelo) {
                            if (processador > minimoVermelho) {
                                corAlerta = "Vermelho";
                                message.put("text",
                                        "    ALERTA VERMELHO\n" +
                                                "\n" +
                                                " Hostname: " + hostname + "\n" +
                                                " Componente: Processador\n" +
                                                " Data/Hora: " + dataHoraFormatada + " \n");
                            } else {
                                corAlerta = "Amarelo";
                                message.put("text",
                                        "    ALERTA AMARELO\n" +
                                                "\n" +
                                                " Hostname: " + hostname + "\n" +
                                                " Componente: Processador\n" +
                                                " Data/Hora: " + dataHoraFormatada + " \n");


                            }
                            interfaceConexaoNuvem.update("INSERT INTO Alerta (corAlerta, fkComponenteAlerta, fkMaquinaAlerta, fkEmpresaAlerta)" +
                                    "VALUES ('%s', 4, %d, %d)".formatted
                                            (corAlerta, idMaquina, fkEmpresa));
                            slack.sendMessage(message);
                        }

                        if (memoriaRAM > minimoAmarelo) {
                            if (memoriaRAM > minimoVermelho) {
                                corAlerta = "Vermelho";
                                message.put("text",
                                        "    ALERTA VERMELHO\n" +
                                                "\n" +
                                                " Hostname: " + hostname + "\n" +
                                                " Componente: Memória Ram\n" +
                                                " Data/Hora: " + dataHoraFormatada + " \n");
                            } else {
                                corAlerta = "Amarelo";
                                message.put("text",
                                        "    ALERTA AMARELO\n" +
                                                "\n" +
                                                " Hostname: " + hostname + "\n" +
                                                " Componente: Memória Ram\n" +
                                                " Data/Hora: " + dataHoraFormatada + " \n");
                            }
                            interfaceConexaoNuvem.update("INSERT INTO Alerta (corAlerta, fkComponenteAlerta, fkMaquinaAlerta, fkEmpresaAlerta)" +
                                    "VALUES ('%s', 2, %d, %d)".formatted
                                            (corAlerta, idMaquina, fkEmpresa));
                            slack.sendMessage(message);
                        }

                        if (disco > minimoAmarelo) {
                            corAlerta = "Vermelho";
                            if (disco > minimoVermelho) {
                                message.put("text",
                                        "    ALERTA VERMELHO\n" +
                                                "\n" +
                                                " Hostname: " + hostname + "\n" +
                                                " Componente: Disco\n" +
                                                " Data/Hora: " + dataHoraFormatada + " \n");
                            } else {
                                corAlerta = "Amarelo";
                                message.put("text",
                                        "    ALERTA AMARELO\n" +
                                                "\n" +
                                                " Hostname: " + hostname + "\n" +
                                                " Componente: Disco\n" +
                                                " Data/Hora: " + dataHoraFormatada + " \n");
                            }
                            interfaceConexaoNuvem.update("INSERT INTO Alerta (corAlerta, fkComponenteAlerta, fkMaquinaAlerta, fkEmpresaAlerta)" +
                                    "VALUES ('%s', 1, %d, %d)".formatted
                                            (corAlerta, idMaquina, fkEmpresa));
                            slack.sendMessage(message);
                        }


                        if (rede > 600) {
                            corAlerta = "Vermelho";
                            if (disco > 1000) {
                                message.put("text",
                                        "    ALERTA VERMELHO\n" +
                                                "\n" +
                                                " Hostname: " + hostname + "\n" +
                                                " Componente: Rede\n" +
                                                " Data/Hora: " + dataHoraFormatada + " \n");
                            } else {
                                corAlerta = "Amarelo";
                                message.put("text",
                                        "    ALERTA AMARELO\n" +
                                                "\n" +
                                                " Hostname: " + hostname + "\n" +
                                                " Componente: Rede\n" +
                                                " Data/Hora: " + dataHoraFormatada + " \n");
                            }
                            interfaceConexaoNuvem.update("INSERT INTO Alerta (corAlerta, fkComponenteAlerta, fkMaquinaAlerta, fkEmpresaAlerta)" +
                                    "VALUES ('%s', 3, %d, %d)".formatted
                                            (corAlerta, idMaquina, fkEmpresa));
                            slack.sendMessage(message);
                        }
                        DispositivoUsb.verificarDispositivo();

                        System.out.println(("""
                                \n\n\n\n\n\n
                                Disco:
                                Disponível: %.2f Gb || Taxa de escrita: %d Kb/s || Taxa de leitura: %d Kb/s

                                Memória:
                                Disponível: %.2f Gb || Virtual: %.2f Gb || Tempo ligado: %d Horas

                                Rede:
                                Taxa dowload: %d Mb/s || Taxa de upload: %d Mb/s

                                Cpu:
                                Uso: %.2f %% || Carga: %.2f %% || Temperatura: %.2f °C
                                """).formatted(
                                discoAtual.discoDisponivel, taxa_escrita_disco, taxa_leitura_disco,
                                memoria.memoriaDisponivel, memoria.memoriaVirtual, memoria.tempoLigado,
                                taxa_dowload_rede, taxa_upload_rede,
                                cpu.cpuUso, cpu.cpuCarga, ThreadLocalRandom.current().nextDouble(40.0, 42.0)
                        ));
                    }
            }
        } catch (
                Exception e) {
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
