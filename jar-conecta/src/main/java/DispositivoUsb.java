import java.io.*;
import java.nio.file.FileSystems;
import java.nio.file.FileSystem;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

public class DispositivoUsb {
    public static void verificarDispositivo() throws IOException {
        FileSystem fs = FileSystems.getDefault();
        List<String> devices = new ArrayList<>();

        for (Path root : fs.getRootDirectories()) {
            if (!root.toString().equals("C:\\")) {
                devices.add(root.toString());
            }
        }

        for (int i = 0; i < devices.size(); i++) {
            if (!devices.get(i).isEmpty()) {
                String caminho = "%s\\key.txt".formatted(devices.get(i));
                String command = "powershell.exe (New-Object -comObject Shell.Application).Namespace(17).ParseName('" + devices.get(i).replace(":\\", "") + ":').InvokeVerb('Eject')";

                File arquivoTxt = new File(caminho);

                if (arquivoTxt.exists()) {
                    BufferedReader br = new BufferedReader(new FileReader(caminho));
                    String password = br.readLine();

                    if (password.equals("Conecta2024")) {
                        System.out.println("Acesso liberado para o dispositivo %s.".formatted(devices.get(i)));
                    } else {
                        Runtime.getRuntime().exec(command);
                        System.out.println("Dispositivo %s removido com sucesso.".formatted(devices.get(i)));
                    }
                } else {
                    Runtime.getRuntime().exec(command);
                    System.out.println("Dispositivo %s removido com sucesso.".formatted(devices.get(i)));
                }
            } else {
                System.out.println("Dispositivo nÃ£o encontrado.");
            }
        }
    }
}