import java.util.List;
import java.util.Scanner;

public class MetodosCadastroLogin {
    List<String> cadastrar(List<String> usuario){
        Scanner leitor = new Scanner(System.in);
        String entradaEmpresa = "";
        String entradaCep = "";
        String entradaLogradouro = "";

        System.out.println("""
                        ---------------------------------------------- 
                        Bem-vindo ao Cadastro.
                        Preencha seus dados!
                        ---------------------------------------------- 
                        
                        """);
        System.out.print("CNPJ: ");
        String entradaCnpj = leitor.nextLine();
        Integer empresaExiste = usuario.indexOf(entradaCnpj);

        switch (empresaExiste){
            case -1:
                System.out.print("Empresa: ");
                entradaEmpresa = leitor.nextLine();

                System.out.print("CEP: ");
                entradaCep = leitor.nextLine();

                System.out.print("Logradouro: ");
                entradaLogradouro = leitor.nextLine();

        }

        System.out.print("Email: ");
        String entradaEmail = leitor.nextLine();

        if((usuario.indexOf(entradaEmail)) != -1){
            System.out.println("O E-mail já está cadastrado");
            return usuario;
        }

        System.out.print("Senha: ");
        String entradaSenha = leitor.nextLine();

        System.out.print("Confirmação de Senha: ");
        String entradaConfirmaSenha = leitor.nextLine();

        if (!entradaSenha.equals(entradaConfirmaSenha)){
            System.out.println("As senhas não condizem");
            return usuario;
        }

        switch (empresaExiste){
            case -1:
                usuario.add(entradaEmpresa);
                usuario.add(entradaCnpj);
                usuario.add(entradaCep);
                usuario.add(entradaLogradouro);
                usuario.add(entradaEmail);
                usuario.add(entradaSenha);
                usuario.add("");
                break;

            default:
                usuario.add((empresaExiste + 3), entradaEmail);
                usuario.add((empresaExiste + 4), entradaSenha);
                break;
        }

        System.out.println("""
                        ---------------------------------------------- 
                        Usuário cadastrado com sucesso!
                        ----------------------------------------------
                        """);
        return usuario;
    }


    Integer login(List<String> usuario){
        Scanner leitor = new Scanner(System.in);

        System.out.println("""
                        ---------------------------------------------- 
                        Bem-vindo ao Login.
                        Preencha seus dados!
                        ---------------------------------------------- 
                        
                        """);
        System.out.print("Email: ");
        String entradaEmail = leitor.nextLine();
        Integer posicaoEmail = usuario.indexOf(entradaEmail);

        System.out.print("Senha: ");
        String entradaSenha = leitor.nextLine();

        if (posicaoEmail >= 0 && entradaSenha.equals(usuario.get(posicaoEmail + 1))){
            System.out.println("""
                        ---------------------------------------------- 
                        Usuário logado com sucesso!
                        ----------------------------------------------
                        """);
            return 3;
        }

        System.out.println("Usuário ou senha inválidos");
        return 2;
    }
}
