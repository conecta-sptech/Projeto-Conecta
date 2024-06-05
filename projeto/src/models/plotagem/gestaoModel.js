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
                     OR MAX(COALESCE(ld.dataHoraLeitura, lm.dataHoraLeitura, lr.dataHoraLeitura, lc.dataHoraLeitura)) < NOW() - INTERVAL 24 HOUR
                THEN 'Inativa'
                ELSE 'Ativa'
            END AS statusMaquina,
            (
                SELECT nomeComponente
                FROM Componente c
                INNER JOIN Alerta a ON c.idComponente = a.fkComponenteAlerta
                    WHERE a.fkMaquinaAlerta = m.idMaquina
                    ORDER BY a.dataHoraAlerta DESC
                    LIMIT 1
            ) AS ultimoComponenteAlerta
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
            WHERE
                m.fkEmpresaMaquina = ${idEmpresa}
            GROUP BY
                m.idMaquina, m.hostnameMaquina, m.ociosidadeMaquina;
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    buscarMaquinas
}