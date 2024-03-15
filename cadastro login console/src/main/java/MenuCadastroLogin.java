import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class MenuCadastroLogin {
    public static void main(String[] args) {
        MetodosCadastroLogin metodosCadastroLogin = new MetodosCadastroLogin();
        Scanner leitor = new Scanner(System.in);
        List<String> usuario = new ArrayList<>();

        Integer operacao = 0;

        do {
            System.out.println("""
                ----------------------------------------------
                          SEJA BEM VINDO !!! 
                          
                                CONECTA 💻
                 "TRANSFORMANDO IDEIAS EM REDES DE SUCESSO"

                ---------------------------------------------- 
                Digite:
                1 - Para cadastrar-se
                2 - Para login
                3 - Para sair
                ---------------------------------------------- 
                """);

            operacao = leitor.nextInt();

            switch (operacao){
                case 1:
                    usuario = metodosCadastroLogin.cadastrar(usuario);
                    System.out.println(usuario);
                    break;

                case 2:
                    operacao = metodosCadastroLogin.login(usuario);
                    break;
            }
        }while (!operacao.equals(3));
    }
}
