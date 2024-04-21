public class Maquina {
    private Integer idMaquina;
    private String hostnameMaquina;
    private Integer ramMaquina;
    private Integer discoMaquina;
    private Double clockProcessadorMaquina;
    private Integer nucleosProcessadorMaquina;
    private String soMaquina;
    private String ociosidadeMaquina;
    private String fkEmpresaMaquina;

    public Maquina() {
    }

    public Maquina(Integer idMaquina, String hostnameMaquina, Integer ramMaquina, Integer discoMaquina, Double clockProcessadorMaquina, Integer nucleosProcessadorMaquina, String soMaquina, String ociosidadeMaquina, String fkEmpresaMaquina) {
        this.idMaquina = idMaquina;
        this.hostnameMaquina = hostnameMaquina;
        this.ramMaquina = ramMaquina;
        this.discoMaquina = discoMaquina;
        this.clockProcessadorMaquina = clockProcessadorMaquina;
        this.nucleosProcessadorMaquina = nucleosProcessadorMaquina;
        this.soMaquina = soMaquina;
        this.ociosidadeMaquina = ociosidadeMaquina;
        this.fkEmpresaMaquina = fkEmpresaMaquina;
    }

    public Integer getIdMaquina() {
        return idMaquina;
    }

    public void setIdMaquina(Integer idMaquina) {
        this.idMaquina = idMaquina;
    }

    public String getHostnameMaquina() {
        return hostnameMaquina;
    }

    public void setHostnameMaquina(String hostnameMaquina) {
        this.hostnameMaquina = hostnameMaquina;
    }

    public Integer getRamMaquina() {
        return ramMaquina;
    }

    public void setRamMaquina(Integer ramMaquina) {
        this.ramMaquina = ramMaquina;
    }

    public Integer getDiscoMaquina() {
        return discoMaquina;
    }

    public void setDiscoMaquina(Integer discoMaquina) {
        this.discoMaquina = discoMaquina;
    }

    public Double getClockProcessadorMaquina() {
        return clockProcessadorMaquina;
    }

    public void setClockProcessadorMaquina(Double clockProcessadorMaquina) {
        this.clockProcessadorMaquina = clockProcessadorMaquina;
    }

    public Integer getNucleosProcessadorMaquina() {
        return nucleosProcessadorMaquina;
    }

    public void setNucleosProcessadorMaquina(Integer nucleosProcessadorMaquina) {
        this.nucleosProcessadorMaquina = nucleosProcessadorMaquina;
    }

    public String getSoMaquina() {
        return soMaquina;
    }

    public void setSoMaquina(String soMaquina) {
        this.soMaquina = soMaquina;
    }

    public String getOciosidadeMaquina() {
        return ociosidadeMaquina;
    }

    public void setOciosidadeMaquina(String ociosidadeMaquina) {
        this.ociosidadeMaquina = ociosidadeMaquina;
    }

    public String getFkEmpresaMaquina() {
        return fkEmpresaMaquina;
    }

    public void setFkEmpresaMaquina(String fkEmpresaMaquina) {
        this.fkEmpresaMaquina = fkEmpresaMaquina;
    }
}
