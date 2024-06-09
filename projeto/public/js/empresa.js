const inputNomeEmpresa = document.getElementById("inputNomeEmpresa");
const inputCnpjEmpresa = document.getElementById("inputCnpjEmpresa");
const inputEmailEmpresa = document.getElementById("inputEmailEmpresa");
const inputCepEmpresa = document.getElementById("inputCepEmpresa");
const inputNumeroEmpresa = document.getElementById("inputNumeroEmpresa");
const inputTelefoneEmpresa = document.getElementById("inputTelefoneEmpresa");

function atualizarDadosEmpresa() {
    const cepEmpresa = inputCepEmpresa.value;
    const numeroEmpresa = inputNumeroEmpresa.value;
    const telefoneEmpresa = inputTelefoneEmpresa.value;

    fetch(`/usuario/empresa/${sessionStorage.ID_USUARIO}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            cepServer: cepEmpresa,
            numeroServer: numeroEmpresa,
            telefoneServer: telefoneEmpresa
        }),
    }).then((res) => {
        res.text().then((text) => {
            if (res.ok) {
                sessionStorage.CEP_EMPRESA = cepEmpresa;
                sessionStorage.NUMERO_EMPRESA = numeroEmpresa;
                sessionStorage.TELEFONE_EMPRESA = telefoneEmpresa;
                abrirModalSucesso(text);
            } else {
                abrirModalErro(text);
            }
        });
    }).catch((error) => {
        abrirModalErro("Houve um problema ao tentar atualizar os dados da empresa.");
        console.log(error);
    });
}

function mascararCep() {
    const inputLength = inputCepEmpresa.value.length;

    if (inputLength == 5) {
        inputCepEmpresa.value += "-";
    }
}

function mascararTelefone() {
    const inputLength = inputTelefoneEmpresa.value.length;

    if (inputLength == 0) {
        inputTelefoneEmpresa.value += "(";
    } else if (inputLength == 3) {
        inputTelefoneEmpresa.value += ") ";
    } else if (inputLength == 9) {
        inputTelefoneEmpresa.value += "-";
    }
}

function resetarDadosModalEmpresa() {
    inputNomeEmpresa.value = sessionStorage.NOME_EMPRESA;
    inputCnpjEmpresa.value = sessionStorage.CNPJ_EMPRESA;
    inputEmailEmpresa.value = sessionStorage.EMAIL_USUARIO;

    if (sessionStorage.CEP_EMPRESA != null && sessionStorage.NUMERO_EMPRESA != null && sessionStorage.TELEFONE_EMPRESA != null) {
        inputCepEmpresa.value = sessionStorage.CEP_EMPRESA;
        inputNumeroEmpresa.value = sessionStorage.NUMERO_EMPRESA;
        inputTelefoneEmpresa.value = sessionStorage.TELEFONE_EMPRESA;
    }
}

window.onload = () => {
    resetarDadosModalEmpresa();
}