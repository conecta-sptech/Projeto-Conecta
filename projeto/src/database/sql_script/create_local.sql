CREATE DATABASE Conecta;
USE Conecta;

CREATE USER "UserConecta"@"localhost" IDENTIFIED BY "Conecta2024";
GRANT ALL PRIVILEGES ON Conecta.* to "UserConecta"@"localhost";

CREATE TABLE LeituraDisco ( 
	idLeituraDisco INT AUTO_INCREMENT,
	discoDisponivel DECIMAL(5,2),
	discoTaxaLeitura INT,
    discoTaxaEscrita INT,
    dataHoraLeitura TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (idLeituraDisco)
);

CREATE TABLE LeituraMemoria ( 
	idLeituraMemoria INT AUTO_INCREMENT,
	memoriaDisponivel DECIMAL(5,2),
	memoriaVirtual DECIMAL(5,2),
	tempoLigado INT,
	dataHoraLeitura TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (idLeituraMemoria)
);

CREATE TABLE LeituraRede ( 
	idLeituraRede INT AUTO_INCREMENT,
	redeDownload INT,
	redeUpload INT,
	dataHoraLeitura TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (idLeituraRede)
);

CREATE TABLE LeituraCpu ( 
	idLeituraCpu INT AUTO_INCREMENT,
	cpuUso DECIMAL(5,2),
    cpuCarga DECIMAL(5,2),
	cpuTemperatura DECIMAL(5,2),
	dataHoraLeitura TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (idLeituraCpu)
);