import com.github.britooo.looca.api.core.Looca;
import oshi.SystemInfo;

public class LeituraRede {
    Looca looca = new Looca();
    SystemInfo oshi = new SystemInfo();
    Long redeDowload = looca.getRede().getGrupoDeInterfaces().getInterfaces().get(0).getBytesRecebidos();
    Long redeUpload = looca.getRede().getGrupoDeInterfaces().getInterfaces().get(0).getBytesEnviados();
    //    validar com professor
}
