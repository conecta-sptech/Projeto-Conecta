-- Criação de Usuário no Banco de Dados
CREATE USER "UserConecta"@"localhost" IDENTIFIED BY "Conecta2024";

GRANT ALL PRIVILEGES ON Conecta.* to "UserConecta"@"localhost";

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
	idMaquina INT,
    hostnameMaquina VARCHAR (25),
    ramMaquina INT,
    discoMaquina INT,
    clockProcessadorMaquina decimal(4,2),
    nucleosProcessadorMaquina INT,
    fkEmpresaMaquina INT,
		CONSTRAINT fkEM FOREIGN KEY (fkEmpresaMaquina) REFERENCES Empresa(idEmpresa),
	PRIMARY KEY (idMaquina, fkEmpresaMaquina)	
);

-- Daqui em diante, precisa de validação.
CREATE TABLE Leitura ( 
idLeitura INT PRIMARY KEY AUTO_INCREMENT,
RAM VARCHAR(45),
Disco VARCHAR(45),
CPU VARCHAR(45),
Rede VARCHAR(45),
MaquinaPertencente INT,
FOREIGN KEY (MaquinaPertencente) 
REFERENCES Maquinas(idMaquina)
);

CREATE TABLE Alertas ( 
idAlerta INT PRIMARY KEY AUTO_INCREMENT,
Nome VARCHAR(45),
Componente VARCHAR(45),
FaixaAlerta VARCHAR(45)
);

CREATE TABLE LogAlertas ( 
idLogLeitura INT PRIMARY KEY AUTO_INCREMENT,
fkLeitura INT,
fkAlerta INT,
DataHora DATETIME,
FOREIGN KEY (fkLeitura) 
REFERENCES Leitura(idLeitura),
FOREIGN KEY (fkAlerta) 
REFERENCES Alertas(idAlerta)
);