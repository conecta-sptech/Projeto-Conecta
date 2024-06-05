const gestaoModel = require("../../models/plotagem/gestaoModel");


function obterMaquinasInativas(req, res){
    const idEmpresa = req.params.idEmpresa;

    gestaoModel.buscarMaquinas(idEmpresa).then(function (resultado) {
        const maquinasInativas = resultado.filter(maquina => maquina.statusMaquina === 'Inativa');

       if (maquinasInativas.length > 0) {
            res.status(200).json(maquinasInativas);
            console.log(`\nResultados encontrados: ${maquinasInativas.length}`);
            console.log(`Resultados: ${JSON.stringify(maquinasInativas)}`);
       } else {
            res.status(204).send("Nenhuma máquina inativa encontrada!");
       }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as máquinas cadastradas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function obterQtdMaquinasInativasEAtivas(req, res) {
    const idEmpresa = req.params.idEmpresa;

    let maquinasAtivas = 0;
    let maquinasInativas = 0;
    let totalMaquinas = 0;

    gestaoModel.buscarMaquinas(idEmpresa).then(function (resposta) {
        const maquinas = resposta.map(maquina => {
            totalMaquinas++;
            if (maquina.statusMaquina === 'Ativa') {
                maquinasAtivas++;
            } else {
                maquinasInativas++;
            }

            return {
                idMaquina: maquina.idMaquina,
                hostnameMaquina: maquina.hostnameMaquina,
                ociosidadeMaquina: maquina.ociosidadeMaquina,
                ultimaLeitura: maquina.ultimaLeitura,
                statusMaquina: maquina.statusMaquina,
                ultimoComponenteAlerta: maquina.ultimoComponenteAlerta
            };
        });

        res.json({
            maquinas,
            maquinasAtivas,
            maquinasInativas,
            totalMaquinas
        });

        console.log(`\nResultados encontrados: ${resposta.length}`);
        console.log(`Resultados: ${JSON.stringify(resposta)}`);

    }).catch(function (erro) {
        console.log("Houve um erro ao buscar as máquinas cadastradas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    obterMaquinasInativas,
    obterQtdMaquinasInativasEAtivas
}