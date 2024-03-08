import java.util.Scanner;

public class Cadastro {
    public static void main(String[] args) {

        System.out.println("""
                ----------------------------------------------
                          SEJA BEM VINDO !!! 
                          
                                CONECTA 💻
                 "TRANSFORMANDO IDEIAS EM REDES DE SUCESSO"

                ---------------------------------------------- 
                Faça seu cadastro preenchendo os campos abaixo:
                ---------------------------------------------- 
                """);

        // Criação de Variáveis de Simulação do Cadastro do sistema.

        String nomeEmpresaMockado = "Hospital HB";
        String cnpjMockado = "123.456.789-0/0001";
        String cepMockado = "029100-90";
        String emailMockado = "hospitalhb@email.com";
        String senhaMockado = "urubu100";

        // Criação de um "Scanner" que irá funcionar como uma input para o usuário.

        Scanner leitor = new Scanner(System.in);


        // Criação dos campos para usuário preencher e se cadastrar.

        System.out.print("Empresa: ");
        String entradaEmpresa = leitor.nextLine();

        System.out.print("CNPJ: ");
        String entradaCnpj = leitor.nextLine();

        System.out.print("CEP: ");
        String entradaCep = leitor.nextLine();

        System.out.print("Email: ");
        String entradaEmail = leitor.nextLine();

        System.out.print("Senha: ");
        String entradaSenha = leitor.nextLine();

        System.out.print("Confirmação de Senha: ");
        String entradaConfirmaSenha = leitor.nextLine();


     // Verificação simples para identificar se o usuário pode se cadastrar.

        if (!entradaEmpresa.equals(nomeEmpresaMockado) &&
                !entradaCnpj.equals(cnpjMockado) &&
                !entradaCep.equals(cepMockado) &&
                !entradaEmail.equals(emailMockado) &&
                !entradaSenha.equals(senhaMockado) &&
                !entradaConfirmaSenha.equals(senhaMockado)
        ) {
            System.out.println("""
                    Não foi possível reazizar seu cadastro ! Tente novamente.
                    """);
        } else {
            System.out.println(""" 
                    Cadastro realizado com sucesso !
                                        
                    Redirecionando para tela de  Login...
                    """);
        }
    }
}
