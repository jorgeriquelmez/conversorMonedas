const cantidadInput = document.getElementById('cantidad');
const divisaSelect = document.getElementById('divisa');
const buscarButton = document.getElementById('buscar');
const resultadoDiv = document.getElementById('resultado');
const graficaDiv = document.getElementById('grafica');

buscarButton.addEventListener('click', () => {
    const cantidad = parseFloat(cantidadInput.value);
    const divisa = divisaSelect.value;

    // Aquí iría la lógica para obtener el tipo de cambio desde una API
    // Por ahora, usaremos valores fijos para demostración
    const tiposDeCambio = {
        USD: 1,
        EUR: 0.85,
        GBP: 0.73,
    };

    const tipoDeCambio = tiposDeCambio[divisa];

    if (isNaN(cantidad)) {
        resultadoDiv.textContent = "Ingrese una cantidad válida.";
        return;
    }

    const resultado = cantidad / tipoDeCambio;
    resultadoDiv.textContent = `Resultado: ${resultado.toFixed(2)}`;

    // Ejemplo de cómo obtener datos de una API y mostrar una gráfica (usando fetch y una librería de gráficos como Chart.js)
    fetch('URL_DE_TU_API') // Reemplaza con la URL de tu API
        .then(response => response.json())
        .then(data => {
            // Aquí iría la lógica para procesar los datos de la API y crear la gráfica con Chart.js
            // Ejemplo básico (asumiendo que la API devuelve un array de números):
            const ctx = document.getElementById('grafica').getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: data.map((_, i) => i + 1), // Etiquetas del eje X (ejemplo: 1, 2, 3...)
                    datasets: [{
                        label: 'Datos de la API',
                        data: data,
                        borderColor: 'blue',
                        borderWidth: 1
                    }]
                },
                options: {
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  }
                }
            });
        })
        .catch(error => console.error('Error al obtener datos de la API:', error));
});