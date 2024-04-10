const usuarioModel = require("../models/usuarioModel");

function cadastrarEmpresa(req, res) {
    const nomeEmpresa = req.body.nomeServer;
    const cnpjEmpresa = req.body.cnpjServer;
    const emailEmpresa = req.body.emailServer;
    const senhaEmpresa = req.body.senhaServer;

    if (nomeEmpresa == undefined) {
        res.status(400).send("Nome da empresa está undefined!");

    } else if (cnpjEmpresa == undefined) {
        res.status(400).send("Cnpj da empresa está undefined!");

    } else if (emailEmpresa == undefined) {
        res.status(400).send("E-mail da empresa está undefined!");

    } else if (senhaEmpresa == undefined) {
        res.status(400).send("Senha da empresa está undefined!");

    } else {
        usuarioModel.cadastrarEmpresa(nomeEmpresa, cnpjEmpresa).then(function (resposta) {
            console.log(resposta);
            let idEmpresa = resposta.insertId;
            res.status(200).send("Empresa cadastrada com sucesso");

            usuarioModel.cadastrarUsuarioEmpresa(emailEmpresa, senhaEmpresa, idEmpresa).then(function (resposta) {
                console.log(resposta);
                res.status(200).send("Usuário administrador da empresa cadastrada com sucesso");
            
            }).catch(function (erro) {
                res.status(500).json(erro.sqlMessage);
            })

        }).catch(function (erro) {
            res.status(500).json(erro.sqlMessage);
        })
    }
}

function autenticar(req, res) {
    const email = req.body.emailServer;
    const senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Email do usuário está undefined!");

    } else if (senha == undefined) {
        res.status(400).send("Senha do usuário está indefinida!");

    } else {

        usuarioModel.autenticar(email, senha).then(
            function (resultadoAutenticar) {
                console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                if (resultadoAutenticar.length == 1) {
                    console.log(resultadoAutenticar);
                    res.json({
                        id: resultadoAutenticar[0].idUsuario,
                        nome: resultadoAutenticar[0].nomeUsuario,
                        funcao: resultadoAutenticar[0].funcaoUsuario,
                        nomeEmpresa: resultadoAutenticar[0].nomeEmpresa
                    });
                    
                } else if (resultadoAutenticar.length == 0) {
                    res.status(403).send("Email e/ou senha inválido(s)");
                
                } else {
                    res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
    }

}

module.exports = {
    cadastrarEmpresa,
    autenticar
}