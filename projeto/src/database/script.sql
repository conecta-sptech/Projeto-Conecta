-- Criação de Usuário no Banco de Dados
CREATE USER "UserConecta"@"localhost" IDENTIFIED BY "Conecta2024";
GRANT ALL PRIVILEGES ON Conecta.* to "UserConecta"@"localhost";
SHOW TABLES;
-- Criação do Banco de Dados
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
	emailUsuario VARCHAR(45),
	senhaUsuario VARCHAR(20),
	funcaoUsuario VARCHAR(45),
	fkEmpresaUsuario INT,
	CONSTRAINT fkEU FOREIGN KEY (fkEmpresaUsuario) REFERENCES Empresa(idEmpresa),
	PRIMARY KEY(idUsuario, fkEmpresaUsuario)
); 

CREATE TABLE Maquina (
	idMaquina INT AUTO_INCREMENT,
    hostnameMaquina VARCHAR (25),
    ramMaquina INT,
    discoMaquina INT,
    clockProcessadorMaquina decimal(4,2),
    nucleosProcessadorMaquina INT,
    soMaquina VARCHAR(20),
    ociosidadeMaquina DATETIME,
    fkEmpresaMaquina INT,
		CONSTRAINT fkEM FOREIGN KEY (fkEmpresaMaquina) REFERENCES Empresa(idEmpresa),
	PRIMARY KEY (idMaquina, fkEmpresaMaquina)	
);

CREATE TABLE Componente(
	idComponente INT AUTO_INCREMENT,
    nomeComponente VARCHAR(25),
    intervaloLeitura INT,
    fkMaquinaComponente INT,
		CONSTRAINT fkMComp FOREIGN KEY (fkMaquinaComponente) REFERENCES Maquina(idMaquina),
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
		CONSTRAINT fkCMet FOREIGN KEY (fkComponenteMetrica) REFERENCES Componente(idComponente),
	fkMaquinaMetrica INT,
		CONSTRAINT fkMMet FOREIGN KEY (fkMaquinaMetrica) REFERENCES Maquina(idMaquina),
	PRIMARY KEY (idMetrica, fkComponenteMetrica, fkMaquinaMetrica)
);

CREATE TABLE LeituraMemoria ( 
	idLeituraMemoria INT AUTO_INCREMENT,
	memoriaDisponivel INT,
	memoriaDedicadaSo INT,
	memoriaTaxaTransferencia INT,
    fkComponenteMemoria INT,
		CONSTRAINT fkCM FOREIGN KEY (fkComponenteMemoria) REFERENCES Componente(idComponente),
	fkMaquinaMemoria INT,
		CONSTRAINT fkMM FOREIGN KEY (fkMaquinaMemoria) REFERENCES Maquina(idMaquina),
	PRIMARY KEY (idLeituraMemoria, fkComponenteMemoria, fkMaquinaMemoria)
);

CREATE TABLE LeituraCpu ( 
	idLeituraCpu INT AUTO_INCREMENT,
	cpuDisponivel INT,
	cpuTemperatura INT,
	fkProcessosLeitura INT,
	fkComponenteCpu INT,
		CONSTRAINT fkCC FOREIGN KEY (fkComponenteCpu) REFERENCES Componente(idComponente),
	fkMaquinaCpu INT,
		CONSTRAINT fkMC FOREIGN KEY (fkMaquinaCpu) REFERENCES Maquina(idMaquina),
	PRIMARY KEY (idLeituraCpu, fkComponenteCpu, fkMaquinaCpu)
);

CREATE TABLE Processo (
	idProcesso INT AUTO_INCREMENT,
    fkLeituraCpu INT,
		CONSTRAINT fkLP FOREIGN KEY (fkLeituraCpu) REFERENCES LeituraCpu(idLeituraCpu),
    fkMaquinaProcesso INT,
		CONSTRAINT fkMP FOREIGN KEY (fkMaquinaProcesso) REFERENCES Maquina(idMaquina),
	PRIMARY KEY (idProcesso, fkLeituraCpu, fkMaquinaProcesso)
);

CREATE TABLE LeituraDisco ( 
	idLeituraDisco INT AUTO_INCREMENT,
	discoDisponivel INT,
	discoMemoriaSwap INT,
    discoTemperatura INT,
    fkComponenteDisco INT,
		CONSTRAINT fkCD FOREIGN KEY (fkComponenteDisco) REFERENCES Componente(idComponente),
	fkMaquinaDisco INT,
		CONSTRAINT fkMD FOREIGN KEY (fkMaquinaDisco) REFERENCES Maquina(idMaquina),
	PRIMARY KEY (idLeituraDisco, fkComponenteDisco, fkMaquinaDisco)
);

CREATE TABLE LeituraRede ( 
	idLeituraRede INT AUTO_INCREMENT,
	redeDownload DECIMAL(5,2),
	redeUpload DECIMAL(5,2),
	redePing INT,
    fkComponenteRede INT,
		CONSTRAINT fkCR FOREIGN KEY (fkComponenteRede) REFERENCES Componente(idComponente),
	fkMaquinaRede INT,
		CONSTRAINT fkMR FOREIGN KEY (fkMaquinaRede) REFERENCES Maquina(idMaquina),
	PRIMARY KEY (idLeituraRede, fkComponenteRede, fkMaquinaRede)
);

CREATE TABLE Alerta ( 
	idAlerta INT AUTO_INCREMENT,
	corAlerta VARCHAR(45),
	dataHoraAlerta VARCHAR(45),
	fkComponenteAlerta INT,
		CONSTRAINT fkCA FOREIGN KEY (fkComponenteAlerta) REFERENCES Componente(idComponente),
	fkMaquinaAlerta INT,
		CONSTRAINT fkMA FOREIGN KEY (fkMaquinaAlerta) REFERENCES Maquina(idMaquina),
	PRIMARY KEY (idAlerta, fkComponenteAlerta, fkMaquinaAlerta)
);