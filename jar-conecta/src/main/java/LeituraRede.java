import com.github.britooo.looca.api.core.Looca;
import io.github.cdimascio.dotenv.Dotenv;

public class LeituraRede {
    Dotenv dotenv = Dotenv.load();
    Integer rede = Integer.parseInt(dotenv.get("REDE"));
    Looca looca = new Looca();
    Long redeDowload = looca.getRede().getGrupoDeInterfaces().getInterfaces().get(rede).getBytesRecebidos();
    Long redeUpload = looca.getRede().getGrupoDeInterfaces().getInterfaces().get(rede).getBytesEnviados();
    //    validar com professor
}
