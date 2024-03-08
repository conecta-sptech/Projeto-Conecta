import java.util.Scanner;

public class Login {
    public static void main(String[] args) {

        System.out.println("""
                ----------------------------------------------
                          SEJA BEM VINDO NOVAMENTE !
                                
                                  CONECTA 💻
                 "TRANSFORMANDO IDEIAS EM REDES DE SUCESSO"

                ---------------------------------------------- 
                            Entre em nosso sistema:
                ---------------------------------------------- 
                """);

        // Criação de Variáveis de Simulação do Login do sistema.

        String emailMockado = "hospitalhb@email.com";
        String senhaMockado = "urubu100";

        // Criação de um "Scanner" que irá funcionar como uma input para o usuário.

        Scanner leitor = new Scanner(System.in);

        // Criação dos campos para usuário preencher e poder fazer login.

        System.out.print("Email: ");
        String entradaEmail = leitor.nextLine();

        System.out.print("Senha: ");
        String entradaSenha = leitor.nextLine();

        // Verificação simples para identificar se o usuário existe no sistema.


        if (!entradaEmail.equals(emailMockado) && !entradaSenha.equals(senhaMockado)) {
            System.out.println("""
                    Não foi possivel reazizar o login usuário não encontrado em nosso sistema. 
                    Tente Novamente !
                    """);
        } else {
            System.out.println("Login Realizado com Sucesso !");
        }
    }
}
