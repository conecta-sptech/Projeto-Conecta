import com.github.britooo.looca.api.core.Looca;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import oshi.SystemInfo;

import java.io.File;
import java.nio.ByteBuffer;
import java.util.List;
import java.util.concurrent.TimeUnit;

public class Main {
    public static void main(String[] args) throws InterruptedException{
        Conexao conexao = new Conexao();
        JdbcTemplate interfaceConexao = conexao.getConexaoDoBanco();

        Looca looca = new Looca();
        SystemInfo oshi = new SystemInfo();

//        verifica se a máquina está cadastrada
        String hostname = looca.getRede().getParametros().getHostName();
        List<Maquina> maquinaBanco = interfaceConexao.query("SELECT * FROM Maquina WHERE hostnameMaquina = '%s'".formatted(hostname), new BeanPropertyRowMapper<>(Maquina.class));

        switch (maquinaBanco.size()){
            case 0:
//               maquina nao encontrada
                System.out.println("Cadastre a máquina antes de prosseguir");
            break;

            default:
//                maquina encontrada, liberado enviar leituras

//                leitura de disco
                Long taxa_escrita_memoria = looca.getGrupoDeDiscos().getDiscos().get(0).getBytesDeEscritas();
                Long taxa_leitura_memoria = looca.getGrupoDeDiscos().getDiscos().get(0).getBytesDeLeitura();
                Thread.sleep(15000);
                taxa_escrita_memoria = (looca.getGrupoDeDiscos().getDiscos().get(0).getBytesDeEscritas() - taxa_escrita_memoria)/15;
                taxa_leitura_memoria = (looca.getGrupoDeDiscos().getDiscos().get(0).getBytesDeLeitura() - taxa_leitura_memoria)/15;
                File f = new File("/");
                Double disco_disponivel = f.getFreeSpace()/(1024.0 * 1024 * 1024);


//                leitura de memoria
                Double memoria_disponivel = (looca.getMemoria().getDisponivel()) / (1024.0 * 1024 * 1024);
                Double memoria_virtual = (oshi.getHardware().getMemory().getVirtualMemory().getSwapUsed()  / (1024.0 * 1024 * 1024));
                Long tempo_ligado = (looca.getSistema().getTempoDeAtividade()/3600);


//                leitura de rede
                Long taxa_upload_rede = looca.getRede().getGrupoDeInterfaces().getInterfaces().get(0).getBytesEnviados();
                Long taxa_dowload_rede = looca.getRede().getGrupoDeInterfaces().getInterfaces().get(0).getBytesRecebidos();
                Thread.sleep(15000);
                taxa_upload_rede = (looca.getRede().getGrupoDeInterfaces().getInterfaces().get(0).getBytesEnviados() - taxa_upload_rede)/15;
                taxa_dowload_rede = (looca.getRede().getGrupoDeInterfaces().getInterfaces().get(0).getBytesRecebidos() - taxa_dowload_rede)/15;


//                leitura de cpu
                Double velocidade_cpu = looca.getProcessador().getFrequencia() - looca.getProcessador().getUso();
                Double carga_cpu = oshi.getHardware().getProcessor().getSystemCpuLoad(1000);
                Double temperatura_cpu = (oshi.getHardware().getSensors().getCpuTemperature());

        }
    }
}
