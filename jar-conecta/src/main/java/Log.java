import java.io.*;
import java.util.ArrayList;
import java.util.List;

public class Log {
    private String date;
    private String logLevel;
    private Integer statusCode;
    private String detail;
    private String stackTrace;

    public Log(String date, String logLevel, Integer statusCode, String detail, String stackTrace) {
        this.date = date;
        this.logLevel = logLevel;
        this.statusCode = statusCode;
        this.detail = detail;
        this.stackTrace = stackTrace;
    }

    private static void criarDiretorio() throws IOException {
        File diretorio = new File("C:\\Log\\");
        File documentoTxt = new File("C:\\Log\\" + File.separator + "logs.txt");

        if (!diretorio.exists()) {
            diretorio.mkdirs();
        }

        if (diretorio.exists() && !documentoTxt.exists()) {
            documentoTxt.createNewFile();
        }
    }

    public static void gerarLog(String caminhoArquivo, String logText) throws IOException {
        criarDiretorio();

        // Acessa o arquivo txt como leitor
        BufferedReader br = new BufferedReader(new FileReader(caminhoArquivo));

        // Realiza a leitura do arquivo txt e salva cada linha em uma lista
        List<String> listaLogs = new ArrayList<>();
        String linha = "";
        while ((linha = br.readLine()) != null) {
            if (!linha.isEmpty()) {
                listaLogs.add(linha);
            }
        }

        // Acessa o arquivo txt como "escritor"
        OutputStream os = new FileOutputStream(caminhoArquivo);
        Writer wr = new OutputStreamWriter(os);
        BufferedWriter bw = new BufferedWriter(wr);

        // Atualiza o arquivo txt com o novo log gerado + os logs antigos
        bw.write(logText);
        for (String log : listaLogs) {
            bw.newLine();
            bw.newLine();
            bw.write(log);
        }
        bw.close();
    }

    @Override
    public String toString() {
        return "[%s] %s {\"statusCode\": %s, \"detail\": \"{%s}\", \"stackTrace\": \"%s\"}".formatted(date, logLevel, statusCode, detail, stackTrace);
    }
}