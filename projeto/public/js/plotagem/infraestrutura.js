let listaEstado = [];             //[[amarelo], [vermelho]]

function listarIds(cor) {
    return fetch(`/infraestrutura/estado/${cor}/${sessionStorage.getItem("ID_EMPRESA")}`)
        .then(res => res.json())
        .then(data => data.map(item => item.fkMaquinaAlerta));
}
