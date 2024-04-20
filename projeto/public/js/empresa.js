const inputNomeEmpresa = document.getElementById("inputNomeEmpresa");
const inputCnpjEmpresa = document.getElementById("inputCnpjEmpresa");
const inputEmailEmpresa = document.getElementById("inputEmailEmpresa");
const inputCepEmpresa = document.getElementById("inputCepEmpresa");
const inputNumeroEmpresa = document.getElementById("inputNumeroEmpresa");
const inputTelefoneEmpresa = document.getElementById("inputTelefoneEmpresa");

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