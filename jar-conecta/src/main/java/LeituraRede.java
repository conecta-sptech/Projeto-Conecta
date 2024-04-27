import com.github.britooo.looca.api.core.Looca;
import oshi.SystemInfo;

public class LeituraRede {
    Looca looca = new Looca();
    SystemInfo oshi = new SystemInfo();
    Long redeDowload = looca.getRede().getGrupoDeInterfaces().getInterfaces().get(3).getBytesRecebidos();
    Long redeUpload = looca.getRede().getGrupoDeInterfaces().getInterfaces().get(3).getBytesEnviados();
    //    validar com professor
}
