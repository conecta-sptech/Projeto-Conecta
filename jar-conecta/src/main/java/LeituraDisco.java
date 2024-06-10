import com.github.britooo.looca.api.core.Looca;

import java.io.File;

public class LeituraDisco {
    Looca looca = new Looca();
    File f = new File("/");
    Double discoDisponivel = f.getFreeSpace() / Math.pow(1024.0, 3);
    Long discoTaxaEscrita = looca.getGrupoDeDiscos().getDiscos().get(0).getBytesDeEscritas();
    Long discoTaxaLeitura = looca.getGrupoDeDiscos().getDiscos().get(0).getBytesDeLeitura();
    //    validar com professor
}

