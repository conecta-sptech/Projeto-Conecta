import com.github.britooo.looca.api.core.Looca;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import oshi.SystemInfo;

import java.nio.ByteBuffer;
import java.util.List;

public class Main {
    public static void main(String[] args) {
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
                Double memoriaDisponivel = (looca.getMemoria().getDisponivel()) / (1024.0 * 1024 * 1024);
                Double memoriaSwap = (oshi.getHardware().getMemory().getVirtualMemory().getSwapUsed()  / (1024.0 * 1024 * 1024));

                System.out.println(memoriaSwap);

        }


    }
}
