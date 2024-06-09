CREATE DATABASE Conecta;
USE Conecta;

CREATE TABLE Empresa ( 
	idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
	nomeEmpresa VARCHAR(45),
	cnpjEmpresa CHAR(18) UNIQUE, 
	cepEmpresa CHAR(8),
	numeroEmpresa int,
	telefoneEmpresa CHAR(11)
);

CREATE TABLE Usuario ( 
	idUsuario INT AUTO_INCREMENT,
	nomeUsuario VARCHAR(45),
	emailUsuario VARCHAR(45) UNIQUE,
	senhaUsuario VARCHAR(20),
	funcaoUsuario VARCHAR(45),
	fkEmpresaUsuario INT,
	CONSTRAINT fkEU FOREIGN KEY (fkEmpresaUsuario) REFERENCES Empresa(idEmpresa),
	PRIMARY KEY(idUsuario, fkEmpresaUsuario)
); 

CREATE TABLE Maquina (
	idMaquina INT AUTO_INCREMENT,
    hostnameMaquina VARCHAR (25),
    ramMaquina DECIMAL(4,2),
    discoMaquina INT,
    clockProcessadorMaquina DECIMAL(4,2),
    nucleosProcessadorMaquina INT,
    soMaquina VARCHAR(20),
    ociosidadeMaquina DATETIME,
	intervaloLeitura INT,
    fkEmpresaMaquina INT,
		CONSTRAINT fkEM FOREIGN KEY (fkEmpresaMaquina) REFERENCES Empresa(idEmpresa),
	PRIMARY KEY (idMaquina, fkEmpresaMaquina)	
);

CREATE TABLE Componente(
	idComponente INT,
    nomeComponente VARCHAR(25),
    fkMaquinaComponente INT,
    fkEmpresaComponente INT,
		CONSTRAINT fkMComp FOREIGN KEY (fkMaquinaComponente, fkEmpresaComponente) REFERENCES Maquina(idMaquina, fkEmpresaMaquina),
    PRIMARY KEY (idComponente, fkMaquinaComponente)
);

CREATE TABLE Metrica (
	idMetrica INT AUTO_INCREMENT,
    nomeLeitura VARCHAR(45),
    minMetrica1 INT,
    maxMetrica1 INT,
    maxMetrica2 INT,
    maxMetrica3 INT,
    fkComponenteMetrica INT,
	fkMaquinaMetrica INT,
		CONSTRAINT fkM FOREIGN KEY (fkComponenteMetrica, fkMaquinaMetrica) REFERENCES Componente(idComponente, fkMaquinaComponente),
	PRIMARY KEY (idMetrica, fkComponenteMetrica, fkMaquinaMetrica)
);

CREATE TABLE LeituraDisco ( 
	idLeituraDisco INT AUTO_INCREMENT,
	discoDisponivel DECIMAL(5,2),
	discoTaxaLeitura INT,
    discoTaxaEscrita INT,
    dataHoraLeitura TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	fkComponenteDisco INT,
	fkMaquinaDisco INT,
		CONSTRAINT fkLD FOREIGN KEY (fkComponenteDisco, fkMaquinaDisco) REFERENCES Componente(idComponente, fkMaquinaComponente),
	PRIMARY KEY (idLeituraDisco, fkComponenteDisco, fkMaquinaDisco)
);

CREATE TABLE LeituraMemoria ( 
	idLeituraMemoria INT AUTO_INCREMENT,
	memoriaDisponivel DECIMAL(5,2),
	memoriaVirtual DECIMAL(5,2),
	tempoLigado INT,
	dataHoraLeitura TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	fkComponenteMemoria INT,
	fkMaquinaMemoria INT,
		CONSTRAINT fkLM FOREIGN KEY (fkComponenteMemoria, fkMaquinaMemoria) REFERENCES Componente(idComponente, fkMaquinaComponente),
	PRIMARY KEY (idLeituraMemoria, fkComponenteMemoria, fkMaquinaMemoria)
);

CREATE TABLE LeituraRede ( 
	idLeituraRede INT AUTO_INCREMENT,
	redeDownload INT,
	redeUpload INT,
	dataHoraLeitura TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	fkComponenteRede INT,
	fkMaquinaRede INT,
		CONSTRAINT fkLR FOREIGN KEY (fkComponenteRede, fkMaquinaRede) REFERENCES Componente(idComponente, fkMaquinaComponente),
	PRIMARY KEY (idLeituraRede, fkComponenteRede, fkMaquinaRede)
);

CREATE TABLE LeituraCpu ( 
	idLeituraCpu INT AUTO_INCREMENT,
	cpuUso DECIMAL(5,2),
    cpuCarga DECIMAL(5,2),
	cpuTemperatura DECIMAL(5,2),
	dataHoraLeitura TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	fkComponenteCpu INT,
	fkMaquinaCpu INT,
		CONSTRAINT fkLC FOREIGN KEY (fkComponenteCpu, fkMaquinaCpu) REFERENCES Componente(idComponente, fkMaquinaComponente),
	PRIMARY KEY (idLeituraCpu, fkComponenteCpu, fkMaquinaCpu)
);

CREATE TABLE Alerta ( 
	idAlerta INT AUTO_INCREMENT,
	corAlerta VARCHAR(45),
	dataHoraAlerta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	fkComponenteAlerta INT,
	fkMaquinaAlerta INT,
		CONSTRAINT fkCA FOREIGN KEY (fkComponenteAlerta, fkMaquinaAlerta) REFERENCES Componente(idComponente, fkMaquinaComponente),
	fkEmpresaAlerta INT,
		CONSTRAINT fKEA FOREIGN KEY (fkEmpresaAlerta) REFERENCES Empresa(idEmpresa),
	PRIMARY KEY (idAlerta, fkComponenteAlerta, fkMaquinaAlerta)
);