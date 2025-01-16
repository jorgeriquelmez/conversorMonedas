const cantidadInput = document.getElementById("cantidad");
const divisaSelect = document.getElementById("divisa");
const buscarButton = document.getElementById("buscar");
const resultadoDiv = document.getElementById("resultado");
const graficaDiv = document.getElementById("grafica");
let divisaSeleccionada = 0;
let moneda = 0;
let myChartInstance = null;

divisaSelect.addEventListener("change", () => {
    divisaSeleccionada = divisaSelect.value;
});

const api = async () => {
    try {
        const response = await fetch("https://mindicador.cl/api/");
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

const selectOptions = async () => {
    try {
        const data = await api();
        if (divisaSeleccionada === "dolar") {
            return data.dolar.valor;
        } else if (divisaSeleccionada === "euro") {
            return data.euro.valor;
        } else if (divisaSeleccionada === "uf") {
            return data.uf.valor;
        } else {
            resultadoDiv.textContent = "Ingrese moneda válida.";
        }
    } catch (error) {
        console.log(error);
    }
};

buscarButton.addEventListener("click", async () => {
    try {
      const cantidad = parseFloat(cantidadInput.value);
      if (isNaN(cantidad)) {
        resultadoDiv.textContent = "Ingrese una cantidad válida.";
        return;
      }
      if (divisaSeleccionada === "-") {
        if (myChartInstance) {
          myChartInstance.destroy();
          myChartInstance = null; // Reinicia la instancia
        }
        const myChart = document.getElementById("myChart");
        myChart.style.backgroundColor = "";
        myChart.innerHTML = ""; // Limpia el contenido del canvas
        resultadoDiv.textContent = "";
        return;
      }
      const moneda = await selectOptions();
      if (moneda) {
        const resultado = cantidad / moneda;
        resultadoDiv.textContent = `Resultado: ${resultado.toFixed(2)}`;
        renderGrafica();
      }
    } catch (error) {
      console.log(error);
    }
  });

async function getAndCreateDataToChart() {
    try {
        const currentYear = new Date().getFullYear(); // Obtener el año actual
        let res;
        if (divisaSeleccionada === "dolar") {
            res = await fetch(`https://mindicador.cl/api/dolar/${currentYear}`); // Usar el año actual
        } else if (divisaSeleccionada === "euro") {
            res = await fetch(`https://mindicador.cl/api/euro/${currentYear}`); // Usar el año actual
        } else if (divisaSeleccionada === "uf") {
            res = await fetch(`https://mindicador.cl/api/uf/${currentYear}`); // Usar el año actual
        } else {
            resultadoDiv.textContent = "Ingrese moneda válida.";
            return;
        }

        const data = await res.json();
        const labels = data.serie.map(item => ({ fecha: item.fecha, valor: item.valor })).reverse();
        const fechaHoy = new Date();
        const fechaMinima = new Date(fechaHoy.setDate(fechaHoy.getDate() - 10));
        fechaHoy.setDate(fechaHoy.getDate() + 10);
        const datosFiltrados = labels.filter(element => {
            const fecha = new Date(element.fecha);
            return fecha > fechaMinima && fecha <= fechaHoy;
        });
        const fechas = datosFiltrados.map(element => element.fecha);
        const valores = datosFiltrados.map(element => element.valor);
        const datasets = [{ label: "Historial últimos 10 días", borderColor: "rgb(255, 99, 132)", data: valores }];
        return { labels: fechas, datasets };
    } catch (error) {
        console.log(error);
    }
}

async function renderGrafica() {
    const data = await getAndCreateDataToChart();
    if (data) {
        if (myChartInstance) {
            myChartInstance.destroy();
        }

        const config = { type: "line", data };
        const myChart = document.getElementById("myChart");
        myChart.style.backgroundColor = "white";
        myChartInstance = new Chart(myChart, config);
    }
}