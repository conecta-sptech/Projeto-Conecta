-- Criação de Usuário no Banco de Dados

CREATE USER "UserConecta"@"localhost" IDENTIFIED BY "Conecta2024";
GRANT ALL PRIVILEGES ON Conecta.* to "UserConecta"@"localhost";
SHOW TABLES;


-- Criação do Banco de Dados 

-----------------------------------------------------------------------------------------------
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
    ramMaquina INT,
    discoMaquina INT,
    clockProcessadorMaquina decimal(4,2),
    nucleosProcessadorMaquina INT,
    soMaquina VARCHAR(20),
    ociosidadeMaquina DATETIME,
	intervaloLeitura INT,
    fkEmpresaMaquina INT,
		CONSTRAINT fkEM FOREIGN KEY (fkEmpresaMaquina) REFERENCES Empresa(idEmpresa),
	PRIMARY KEY (idMaquina, fkEmpresaMaquina)	
);

CREATE TABLE Componente(
	idComponente INT AUTO_INCREMENT,
    nomeComponente VARCHAR(25),
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

CREATE TABLE LeituraDisco ( 
	idLeituraDisco INT AUTO_INCREMENT,
	discoDisponivel DECIMAL(5,2),
	discoTaxaLeitura INT,
    discoTaxaEscrita INT,
    dataHoraLeitura TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fkComponenteDisco INT,
		CONSTRAINT fkCD FOREIGN KEY (fkComponenteDisco) REFERENCES Componente(idComponente),
	fkMaquinaDisco INT,
		CONSTRAINT fkMD FOREIGN KEY (fkMaquinaDisco) REFERENCES Maquina(idMaquina),
	PRIMARY KEY (idLeituraDisco, fkComponenteDisco, fkMaquinaDisco)
);

CREATE TABLE LeituraMemoria ( 
	idLeituraMemoria INT AUTO_INCREMENT,
	memoriaDisponivel DECIMAL(5,2),
	memoriaVirtual DECIMAL(5,2),
	tempoLigado INT,
	dataHoraLeitura TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fkComponenteMemoria INT,
		CONSTRAINT fkCM FOREIGN KEY (fkComponenteMemoria) REFERENCES Componente(idComponente),
	fkMaquinaMemoria INT,
		CONSTRAINT fkMM FOREIGN KEY (fkMaquinaMemoria) REFERENCES Maquina(idMaquina),
	PRIMARY KEY (idLeituraMemoria, fkComponenteMemoria, fkMaquinaMemoria)
);

CREATE TABLE LeituraRede ( 
	idLeituraRede INT AUTO_INCREMENT,
	redeDownload INT,
	redeUpload INT,
	dataHoraLeitura TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fkComponenteRede INT,
		CONSTRAINT fkCR FOREIGN KEY (fkComponenteRede) REFERENCES Componente(idComponente),
	fkMaquinaRede INT,
		CONSTRAINT fkMR FOREIGN KEY (fkMaquinaRede) REFERENCES Maquina(idMaquina),
	PRIMARY KEY (idLeituraRede, fkComponenteRede, fkMaquinaRede)
);

CREATE TABLE LeituraCpu ( 
	idLeituraCpu INT AUTO_INCREMENT,
	cpuUso DECIMAL(5,2),
    cpuCarga DECIMAL(5,2),
	cpuTemperatura DECIMAL(5,2),
	dataHoraLeitura TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	fkComponenteCpu INT,
		CONSTRAINT fkCC FOREIGN KEY (fkComponenteCpu) REFERENCES Componente(idComponente),
	fkMaquinaCpu INT,
		CONSTRAINT fkMC FOREIGN KEY (fkMaquinaCpu) REFERENCES Maquina(idMaquina),
	PRIMARY KEY (idLeituraCpu, fkComponenteCpu, fkMaquinaCpu)
);

CREATE TABLE Alerta ( 
	idAlerta INT AUTO_INCREMENT,
	corAlerta VARCHAR(45),
	dataHoraAlerta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	fkComponenteAlerta INT,
		CONSTRAINT fkCA FOREIGN KEY (fkComponenteAlerta) REFERENCES Componente(idComponente),
	fkMaquinaAlerta INT,
		CONSTRAINT fkMA FOREIGN KEY (fkMaquinaAlerta) REFERENCES Maquina(idMaquina),
	fkEmpresaAlerta INT,
		CONSTRAINT fKEA FOREIGN KEY (fkEmpresaAlerta) REFERENCES Empresa(idEmpresa),
	PRIMARY KEY (idAlerta, fkComponenteAlerta, fkMaquinaAlerta)
);

------------------------------------------------------------------------------------------------------------------
-- Fim da criação do Banco de Dados 

-- Inserção de alguns exemplo de registros na tabela Maquina (deve ser configurado ao menos a primeira máquina manualmente) 

INSERT INTO Maquina (hostnameMaquina, ramMaquina, discoMaquina, clockProcessadorMaquina, nucleosProcessadorMaquina, soMaquina, ociosidadeMaquina, fkEmpresaMaquina) VALUES 
('LENOVOIDEAPADGAMING', 8, 512, 3.50, 8, 'Windows 11', '2024-05-25 14:30:00', 1);

INSERT INTO Maquina (hostnameMaquina, ramMaquina, discoMaquina, clockProcessadorMaquina, nucleosProcessadorMaquina, soMaquina, ociosidadeMaquina, fkEmpresaMaquina) VALUES 
('DELLXPS', 16, 1024, 2.80, 6, 'Ubuntu 20.04', '2024-05-25 14:45:00', 1),
('HPENVY', 32, 2048, 4.00, 12, 'Windows 10', '2024-05-25 15:00:00', 1),
('ASUSROG', 16, 512, 3.60, 8, 'Windows 10', '2024-05-25 15:15:00', 1),
('MACBOOKPRO', 16, 512, 2.60, 4, 'macOS 11', '2024-05-25 15:30:00',1);

-- Inserção de um exemplo de registro na tabela Componente (deve ser configurado manualmente) 
-- NÃO ALTERAR ORDEM DOS COMPONENTES

INSERT INTO Componente (nomeComponente,intervaloLeitura,fkMaquinaComponente) VALUES 
('DISCO',60,1),
('MEMÓRIA',60,1),
('REDE',60,1),
('CPU',60,1);

-- Exemplos de Select's 

SELECT*FROM Empresa;
SELECT*FROM Usuario;
SELECT*FROM Maquina;
SELECT*FROM Componente;

SELECT*FROM LeituraDisco;
SELECT*FROM LeituraMemoria;
SELECT*FROM LeituraRede;
SELECT*FROM LeituraCpu;