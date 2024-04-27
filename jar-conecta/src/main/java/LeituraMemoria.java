import com.github.britooo.looca.api.core.Looca;
import oshi.SystemInfo;

public class LeituraMemoria {
    Looca looca = new Looca();
    SystemInfo oshi = new SystemInfo();
    Double memoriaDisponivel = looca.getMemoria().getDisponivel() / Math.pow(1024.0, 3);
    Double memoriaVirtual = oshi.getHardware().getMemory().getVirtualMemory().getSwapUsed() / Math.pow(1024.0, 3);
    Long tempoLigado = (looca.getSistema().getTempoDeAtividade() / 3600);
    //    validar com professor
}