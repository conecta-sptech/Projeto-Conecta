import com.github.britooo.looca.api.core.Looca;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import oshi.SystemInfo;

import java.io.File;
import java.util.List;
import java.util.Scanner;


public class Main {
    public static void main(String[] args) throws InterruptedException {
        Scanner leitor = new Scanner(System.in);
        Conexao conexao = new Conexao();
        JdbcTemplate interfaceConexao = conexao.getConexaoDoBanco();

        Looca looca = new Looca();
        SystemInfo oshi = new SystemInfo();

//        verifica usuario
        System.out.println("Digite seu login");
        String login_digitado = leitor.nextLine();

        System.out.println("Digite sua senha");
        String senha_digitada = leitor.nextLine();

//        verifica se a máquina está cadastrada
        List<Usuario> usuarioBanco = interfaceConexao.query("SELECT * FROM Usuario WHERE emailUsuario = '%s' AND senhaUsuario = '%s'".formatted(login_digitado, senha_digitada), new BeanPropertyRowMapper<>(Usuario.class));

        switch (usuarioBanco.size()) {
            case 0:
//                usuario nao encontrado
                System.out.println("Login ou senha incorretos ou inexistentes");
                break;

            default:
                System.out.println("Login realizado, aguarde as leituras... \n\n\n\n\n\n");
                while (true) {
//                 verifica se a máquina está cadastrada
                    String hostname = looca.getRede().getParametros().getHostName();
                    List<Maquina> maquinaBanco = interfaceConexao.query("SELECT * FROM Maquina WHERE hostnameMaquina = '%s'".formatted(hostname), new BeanPropertyRowMapper<>(Maquina.class));

                    switch (maquinaBanco.size()) {
                        case 0:
//               maquina nao encontrada
                            System.out.println("Cadastre a máquina antes de prosseguir");
                            break;

                        default:
//                maquina encontrada, liberado enviar leitura
                            Long taxa_escrita_disco = looca.getGrupoDeDiscos().getDiscos().get(0).getBytesDeEscritas();
                            Long taxa_leitura_disco = looca.getGrupoDeDiscos().getDiscos().get(0).getBytesDeLeitura();

                            Long taxa_dowload_rede = looca.getRede().getGrupoDeInterfaces().getInterfaces().get(3).getBytesRecebidos();
                            Long taxa_upload_rede = looca.getRede().getGrupoDeInterfaces().getInterfaces().get(3).getBytesEnviados();

                            Thread.sleep(15000);

//                leitura de disco
                            File f = new File("/");
                            Double disco_disponivel = f.getFreeSpace() / Math.pow(1024.0, 3);                                                               //gb
                            String disco_disponivel_formatado = String.format("%.2f", disco_disponivel).replace(",", ".");
                            taxa_escrita_disco = ((looca.getGrupoDeDiscos().getDiscos().get(0).getBytesDeEscritas() - taxa_escrita_disco) / 15) / 1024; //kb/s
                            taxa_leitura_disco = ((looca.getGrupoDeDiscos().getDiscos().get(0).getBytesDeLeitura() - taxa_leitura_disco) / 15) / 1024;  //kb/s

//                leitura de memoria
                            Double memoria_disponivel = looca.getMemoria().getDisponivel() / Math.pow(1024.0, 3);                                      //gb
                            String memoria_disponivel_formatado = String.format("%.2f", memoria_disponivel).replace(",", ".");
                            Double memoria_virtual = oshi.getHardware().getMemory().getVirtualMemory().getSwapUsed() / Math.pow(1024.0, 3);            //gb
                            String memoria_virtual_formatado = String.format("%.2f", memoria_virtual).replace(",", ".");
                            Long tempo_ligado = (looca.getSistema().getTempoDeAtividade() / 3600);                                                     //horas

//                leitura de rede
                            taxa_dowload_rede = ((looca.getRede().getGrupoDeInterfaces().getInterfaces().get(3).getBytesRecebidos() - taxa_dowload_rede) / 15) / 1024; //mb
                            taxa_upload_rede = ((looca.getRede().getGrupoDeInterfaces().getInterfaces().get(3).getBytesEnviados() - taxa_upload_rede) / 15) / 1024;    //mb


//                leitura de cpu
                            Double uso_cpu = looca.getProcessador().getUso();                                                                        //%
                            String uso_cpu_formatado = String.format("%.2f", uso_cpu).replace(",", ".");
                            Double carga_cpu = oshi.getHardware().getProcessor().getSystemCpuLoad(1000) * 100;                                 //%
                            String carga_cpu_formatado = String.format("%.2f", carga_cpu).replace(",", ".");
                            Double temperatura_cpu = (oshi.getHardware().getSensors().getCpuTemperature());                                          //°C
                            String temperatura_cpu_formatado = String.format("%.2f", temperatura_cpu).replace(",", ".");

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
                                    disco_disponivel, taxa_escrita_disco, taxa_leitura_disco,
                                    memoria_disponivel, memoria_virtual, tempo_ligado,
                                    taxa_dowload_rede, taxa_upload_rede,
                                    uso_cpu, carga_cpu, temperatura_cpu
                            ));

                            String fk_empresa = maquinaBanco.get(0).getFkEmpresaMaquina();
                            interfaceConexao.update("INSERT INTO LeituraDisco (discoDisponivel, discoTaxaLeitura, discoTaxaEscrita, fkComponenteDisco, fkMaquinaDisco)" + "VALUES (%s, %d, %d, 1, %s)".formatted(disco_disponivel_formatado, taxa_leitura_disco, taxa_escrita_disco, fk_empresa));

                            interfaceConexao.update("INSERT INTO LeituraMemoria (memoriaDisponivel, memoriaVirtual, tempoLigado, fkComponenteMemoria, fkMaquinaMemoria)" + "VALUES (%s, %s, %d, 2, %s)".formatted(memoria_disponivel_formatado, memoria_virtual_formatado, tempo_ligado, fk_empresa));

                            interfaceConexao.update("INSERT INTO LeituraRede (redeDownload, redeUpload, fkComponenteRede, fkMaquinaRede)" + "VALUES (%d, %d, 3, %s)".formatted(taxa_dowload_rede, taxa_upload_rede, fk_empresa));

                            interfaceConexao.update("INSERT INTO LeituraCpu (cpuUso, cpuCarga, cpuTemperatura, fkComponenteCpu, fkMaquinaCpu)" + "VALUES (%s, %s, %s, 4, %s)".formatted(uso_cpu_formatado, carga_cpu_formatado, temperatura_cpu_formatado, fk_empresa));

                    }
                }
        }
    }
}
