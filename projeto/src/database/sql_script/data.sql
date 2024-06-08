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