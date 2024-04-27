import com.github.britooo.looca.api.core.Looca;
import oshi.SystemInfo;

public class LeituraCpu {
    Looca looca = new Looca();
    SystemInfo oshi = new SystemInfo();
    Double cpuUso = looca.getProcessador().getUso();
    Double cpuCarga = oshi.getHardware().getProcessor().getSystemCpuLoad(1000) * 100;
    Double cpuTemperatura = oshi.getHardware().getSensors().getCpuTemperature();
    //    validar com professor
}
