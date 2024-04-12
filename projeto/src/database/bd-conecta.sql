CREATE DATABASE Conecta;

USE Conecta;

CREATE TABLE Empresa ( 
idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
nomeEmpresa VARCHAR(45),
cnpjEmpresa VARCHAR(18), 
cepEmpresa VARCHAR(8),
numeroEmpresa INT,
telefoneEmpresa VARCHAR(12)
);

CREATE TABLE Usuario ( 
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
nomeUsuario VARCHAR(45),
emailUsuario VARCHAR(45),
senhaUsuario VARCHAR(20),
funcaoUsuario VARCHAR(45),
fkEmpresa INT,
FOREIGN KEY (fkEmpresa) 
REFERENCES Empresa(idEmpresa)
);

CREATE TABLE Maquinas ( 
idMaquina INT PRIMARY KEY AUTO_INCREMENT,
Hostname VARCHAR(45),
RAM VARCHAR(45),
Disco VARCHAR(45),
CPU VARCHAR(45),
fkEmpresa INT, 
FOREIGN KEY (fkEmpresa) 
REFERENCES Empresa(idEmpresa)
);

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