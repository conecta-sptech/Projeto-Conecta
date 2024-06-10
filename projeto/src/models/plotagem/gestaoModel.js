const database = require("../../database/config");

function buscarMaquinas(idEmpresa){
    const instrucao = `
       SELECT
           m.idMaquina,
           m.hostnameMaquina,
           m.ociosidadeMaquina,
           MAX(COALESCE(ld.dataHoraLeitura, lm.dataHoraLeitura, lr.dataHoraLeitura, lc.dataHoraLeitura)) AS ultimaLeitura,
           CASE
               WHEN MAX(COALESCE(ld.dataHoraLeitura, lm.dataHoraLeitura, lr.dataHoraLeitura, lc.dataHoraLeitura)) IS NULL
                    OR MAX(COALESCE(ld.dataHoraLeitura, lm.dataHoraLeitura, lr.dataHoraLeitura, lc.dataHoraLeitura)) < DATEADD(HOUR, -24, GETDATE())
               THEN 'Inativa'
               ELSE 'Ativa'
           END AS statusMaquina,
           ultimoComponenteAlerta.nomeComponente AS ultimoComponenteAlerta
       FROM
           Maquina m
       LEFT JOIN
           LeituraDisco ld ON m.idMaquina = ld.fkMaquinaDisco
       LEFT JOIN
           LeituraMemoria lm ON m.idMaquina = lm.fkMaquinaMemoria
       LEFT JOIN
           LeituraRede lr ON m.idMaquina = lr.fkMaquinaRede
       LEFT JOIN
           LeituraCpu lc ON m.idMaquina = lc.fkMaquinaCpu
       OUTER APPLY (
           SELECT TOP 1
               c.nomeComponente
           FROM
               Componente c
           INNER JOIN
               Alerta a ON c.idComponente = a.fkComponenteAlerta
           WHERE
               a.fkMaquinaAlerta = m.idMaquina
           ORDER BY
               a.dataHoraAlerta DESC
       ) AS ultimoComponenteAlerta
       WHERE
           m.fkEmpresaMaquina = ${idEmpresa}
       GROUP BY
           m.idMaquina, m.hostnameMaquina, m.ociosidadeMaquina, ultimoComponenteAlerta.nomeComponente;
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    buscarMaquinas
}