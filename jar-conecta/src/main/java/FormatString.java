public class FormatString {
    public String formatString(Double leitura_para_converter){
        return (String.format("%.2f", leitura_para_converter).replace(",", "."));
    }
}
