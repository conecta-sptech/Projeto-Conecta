// Gráfico de Inatividade Dashboard Gerentes

let options = {
    series: [33, 77],
    chart: {
        type: 'donut',
        width: 400
    },
    dataLabels: {
        enabled: true,
        formatter: function (val) {
            return val + "%"
        },
        style: {
            colors: ['#ffffff']
        },
        offsetX: -10
    },
    labels: [' Máquinas Inativas', ' Máquinas Ativas'],
    colors: ['#808080', '#5ac69c']
};

let chart = new ApexCharts(document.querySelector("#chartInatividade"), options);
chart.render();