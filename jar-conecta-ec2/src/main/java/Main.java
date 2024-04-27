import com.github.britooo.looca.api.core.Looca;

import java.util.Scanner;

public class Main {
    public static void main(String[] args) throws InterruptedException {
        Scanner leitor = new Scanner(System.in);

        String login = "admin@conecta.com";
        String senha = "Conecta2024";

        System.out.println("Digite seu login");
        String login_digitado = leitor.nextLine();

        System.out.println("Digite sua senha");
        String senha_digitada = leitor.nextLine();

        if (login.equals(login_digitado) && senha.equals(senha_digitada)) {
            System.out.println("Login realizado, aguarde as leituras... \n\n\n\n\n\n");
            while (true) {
                Looca looca01 = new Looca();
                System.out.println(looca01.getRede().getGrupoDeInterfaces().getInterfaces());

                LeituraDisco discoAnterior = new LeituraDisco();
                LeituraRede redeAnterior = new LeituraRede();

                Thread.sleep(15000);

                Looca looca02 = new Looca();
                System.out.println(looca02.getRede().getGrupoDeInterfaces().getInterfaces());

                LeituraDisco discoAtual = new LeituraDisco();
                LeituraRede redeAtual = new LeituraRede();

                LeituraMemoria memoria = new LeituraMemoria();
                LeituraCpu cpu = new LeituraCpu();

                Long taxa_escrita_disco = ((discoAtual.discoTaxaEscrita - discoAnterior.discoTaxaEscrita) / 15) / 1024;  //kb/s
                Long taxa_leitura_disco = ((discoAtual.discoTaxaLeitura - discoAnterior.discoTaxaLeitura) / 15) / 1024;  //kb/s

                Long taxa_dowload_rede = ((redeAtual.redeDowload - redeAnterior.redeDowload) / 15) / 1024; //mb
                Long taxa_upload_rede = ((redeAtual.redeUpload - redeAnterior.redeUpload) / 15) / 1024;    //mb


                System.out.println("""
                        \n\n\n\n\n\n
                        Leituras realizadas com sucesso!
                                            
                        Enviando dados de disco:
                        1 - Disco disponível: %.2f Gb
                        2 - Taxa de escrita: %d Kb/s
                        3 - Taxa de leitura: %d Kb/s
                                            
                        Enviando dados de memória:
                        1 - Memória disponível: %.2f Gb
                        2 - Memória virtual: %.2f Gb
                        3 - Tempo ligado: %d Horas
                                            
                        Enviando dados de rede:
                        1 - Taxa dowload: %d Mb/s
                        2 - Taxa upload: %d Mb/s
                                            
                        Enviando dados de cpu:
                        1 - Uso: %.2f %%
                        2 - Carga: %.2f %%
                        3 - Temperatura: %.2f °C
                        """.formatted(
                        discoAtual.discoDisponivel, taxa_escrita_disco, taxa_leitura_disco,
                        memoria.memoriaDisponivel, memoria.memoriaVirtual, memoria.tempoLigado,
                        taxa_dowload_rede, taxa_upload_rede,
                        cpu.cpuUso, cpu.cpuCarga, cpu.cpuTemperatura
                ));
            }
        } else {
            System.out.println("Login ou senha incorretos!");
        }

    }
}
