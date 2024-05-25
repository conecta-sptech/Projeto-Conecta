import java.io.*;
import java.util.ArrayList;
import java.util.List;

public class Log {
    private String date;
    private String logLevel;
    private Integer statusCode;
    private Integer idMaquina;
    private String hostnameMaquina;
    private String message;
    private String stackTrace;

    public Log(String date, String logLevel, Integer statusCode, String message, String stackTrace) {
        this.date = date;
        this.logLevel = logLevel;
        this.statusCode = statusCode;
        this.message = message;
        this.stackTrace = stackTrace;
    }

    public Log(String date, String logLevel, Integer statusCode, Integer idMaquina, String hostnameMaquina, String message, String stackTrace) {
        this.date = date;
        this.logLevel = logLevel;
        this.statusCode = statusCode;
        this.idMaquina = idMaquina;
        this.hostnameMaquina = hostnameMaquina;
        this.message = message;
        this.stackTrace = stackTrace;
    }

    public static void gerarArquivoTxt(String caminhoArquivo, String logText) throws IOException {
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

    public String toStringMessage() {
        return "[%s] %s {'statusCode': %s, 'detail': '{\"message\": \"%s\"}', 'stackTrace': '%s'}".formatted(date, logLevel, statusCode, message, stackTrace);
    }

    @Override
    public String toString() {
        return "[%s] %s {'statusCode': %s, 'detail': '{\"message\": \"%s\", \"idMaquina\": %d, \"hostnameMaquina\": \"%s\"}', 'stackTrace': '%s'}".formatted(date, logLevel, statusCode, message, idMaquina, hostnameMaquina, stackTrace);
    }
}
