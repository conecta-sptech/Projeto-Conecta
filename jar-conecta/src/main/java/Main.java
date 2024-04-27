import com.github.britooo.looca.api.core.Looca;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import oshi.SystemInfo;

import java.io.File;
import java.nio.ByteBuffer;
import java.util.List;
import java.util.concurrent.TimeUnit;

public class Main {
    public static void main(String[] args) throws InterruptedException {
        Conexao conexao = new Conexao();
        JdbcTemplate interfaceConexao = conexao.getConexaoDoBanco();

        Looca looca = new Looca();
        SystemInfo oshi = new SystemInfo();

//        verifica se a máquina está cadastrada
        String hostname = looca.getRede().getParametros().getHostName();
        List<Maquina> maquinaBanco = interfaceConexao.query("SELECT * FROM Maquina WHERE hostnameMaquina = '%s'".formatted(hostname), new BeanPropertyRowMapper<>(Maquina.class));

        switch (maquinaBanco.size()) {
            case 0:
//               maquina nao encontrada
                System.out.println("Cadastre a máquina antes de prosseguir");
                break;

            default:
//                maquina encontrada, liberado enviar leituras


                Long taxa_escrita_memoria = looca.getGrupoDeDiscos().getDiscos().get(0).getBytesDeEscritas();
                Long taxa_leitura_memoria = looca.getGrupoDeDiscos().getDiscos().get(0).getBytesDeLeitura();

                Long taxa_dowload_rede = looca.getRede().getGrupoDeInterfaces().getInterfaces().get(3).getBytesRecebidos();
                Long taxa_upload_rede = looca.getRede().getGrupoDeInterfaces().getInterfaces().get(3).getBytesEnviados();

                Thread.sleep(15000);

//                leitura de disco
                File f = new File("/");
                Double disco_disponivel = f.getFreeSpace() / Math.pow(1024.0, 3);                                                               //gb
                String disco_disponivel_formatado = String.format("%.2f", disco_disponivel).replace(",", ".");
                taxa_escrita_memoria = ((looca.getGrupoDeDiscos().getDiscos().get(0).getBytesDeEscritas() - taxa_escrita_memoria) / 15) / 1024; //kb/s
                taxa_leitura_memoria = ((looca.getGrupoDeDiscos().getDiscos().get(0).getBytesDeLeitura() - taxa_leitura_memoria) / 15) / 1024;  //kb/s

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

                String fk_empresa = maquinaBanco.get(0).getFkEmpresaMaquina();
                interfaceConexao.update("INSERT INTO LeituraDisco (discoDisponivel, discoTaxaLeitura, discoTaxaEscrita, fkComponenteDisco, fkMaquinaDisco)" +
                        "VALUES (%s, %d, %d, 1, %s)".formatted(disco_disponivel_formatado, taxa_leitura_memoria, taxa_escrita_memoria, fk_empresa));

                interfaceConexao.update("INSERT INTO LeituraMemoria (memoriaDisponivel, memoriaVirtual, tempoLigado, fkComponenteMemoria, fkMaquinaMemoria)" +
                        "VALUES (%s, %s, %d, 2, %s)".formatted(memoria_disponivel_formatado, memoria_virtual_formatado, tempo_ligado, fk_empresa));

                interfaceConexao.update("INSERT INTO LeituraRede (redeDownload, redeUpload, fkComponenteRede, fkMaquinaRede)" +
                        "VALUES (%d, %d, 3, %s)".formatted(taxa_dowload_rede, taxa_upload_rede, fk_empresa));

                interfaceConexao.update("INSERT INTO LeituraCpu (cpuUso, cpuCarga, cpuTemperatura, fkComponenteCpu, fkMaquinaCpu)" +
                        "VALUES (%s, %s, %s, 4, %s)".formatted(uso_cpu_formatado, carga_cpu_formatado, temperatura_cpu_formatado, fk_empresa));

        }
    }
}
