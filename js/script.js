let myChart;

// Función para parsear entradas de texto como fracciones o decimales
function parseInput(value) {
    if (value.includes('/')) {
        const [numerator, denominator] = value.split('/').map(Number);
        return numerator / denominator;
    }
    return parseFloat(value);
}

document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener y parsear los valores de los inputs
    const k = parseInput(document.getElementById('k').value);
    const a = parseInput(document.getElementById('a').value);
    const b = parseInput(document.getElementById('b').value);
    const c = parseInput(document.getElementById('c').value);

    // Generar valores de x e y para la gráfica
    const xValues = Array.from({ length: 21 }, (_, i) => i - 10);
    const yValues = xValues.map(x => k * Math.pow(a, x - b) + c);

    const ctx = document.getElementById('myChart').getContext('2d');

    // Destruir el gráfico existente si lo hay
    if (myChart) {
        myChart.destroy();
    }

    // Crear un nuevo gráfico con ajustes de escala y paso de 2 en 2 en el eje Y
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: xValues,
            datasets: [{
                label: `f(x) = ${k} * ${a}^(x - ${b}) + ${c}`,
                data: yValues,
                borderColor: 'rgba(0, 150, 136, 1)',
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false,
                    suggestedMin: Math.floor(Math.min(...yValues) / 2) * 2, // Ajuste a múltiplos de 2
                    suggestedMax: Math.ceil(Math.max(...yValues) / 2) * 2,
                    ticks: {
                        stepSize: 2,  // Escala de 2 en 2
                        callback: function(value) { return value.toFixed(2); }
                    }
                }
            }
        }
    });

    // Actualizar resultados de la gráfica
    document.getElementById('asintota').textContent = `Asíntota Horizontal: y = ${c}`;
    document.getElementById('ordenada').textContent = `Ordenada al Origen: y = ${k * Math.pow(a, -b) + c}`;

    if (k !== 0 && a > 0 && a !== 1 && -c / k > 0) {
        const raiz = b + Math.log(-c / k) / Math.log(a);
        document.getElementById('raiz').textContent = `Raíz: x ≈ ${raiz.toFixed(2)}`;
    } else {
        document.getElementById('raiz').textContent = "Raíz: No tiene raíz real";
    }
});

document.getElementById('clear').addEventListener('click', function() {
    if (myChart) {
        myChart.destroy();
    }
    document.getElementById('k').value = 1;
    document.getElementById('a').value = 2;
    document.getElementById('b').value = 0;
    document.getElementById('c').value = 0;

    document.getElementById('asintota').textContent = "Asíntota Horizontal: ";
    document.getElementById('ordenada').textContent = "Ordenada al Origen: ";
    document.getElementById('raiz').textContent = "Raíz: ";
});
