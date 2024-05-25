import com.github.britooo.looca.api.core.Looca;
import oshi.SystemInfo;


import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Scanner;

public class Dispositivo {
    Looca looca = new Looca();
    SystemInfo oshi = new SystemInfo();

    private String nome;
    private String mensagem;
    private List<Dispositivo> dispositivosConectados;

    public Dispositivo(String nome) {
        this.nome = nome;
        this.dispositivosConectados = new ArrayList<>();
    }

    public void verificarDispositivos() {
        String senha = "urubu100";
        List<String> dispositivosConectados = new ArrayList<>();

        for (int i = 0; i < dispositivosConectados.size(); i++) {


            if (!Objects.equals(oshi.getHardware().getUsbDevices(true).get(i).getConnectedDevices().toString(), dispositivosConectados.get(i))) {
                System.out.println("Novo dispositivo");
                System.out.println(oshi.getHardware().getUsbDevices(true).get(i).getConnectedDevices().toString());
                System.out.println(dispositivosConectados.get(i));

                dispositivosConectados.set(i, oshi.getHardware().getUsbDevices(true).get(i).getConnectedDevices().toString());

                LocalDateTime dateTime = LocalDateTime.now();
                DateTimeFormatter dateTimeTemplate = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
                String dateTimeFormatted = dateTime.format(dateTimeTemplate);
                mensagem += dateTimeFormatted + "\n" + dispositivosConectados.get(i) + "\n\n";

            }

        }

    }

    public void verificarSenhaParaExcluir(String dispositivo) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Digite a senha para excluir o dispositivo " + dispositivo + ": ");
        String senha = scanner.nextLine();

        if (senha.equals(senha)) {
            dispositivosConectados.remove(dispositivo);
            System.out.println("Dispositivo " + dispositivo + " removido com sucesso.");
        } else {
            System.out.println("Senha incorreta. O dispositivo não será removido.");
        }
    }


    public String getNome() {
        return nome;
    }

    @Override
    public String toString() {
        return nome;
    }
}
