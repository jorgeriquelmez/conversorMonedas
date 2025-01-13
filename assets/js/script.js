const cantidadInput = document.getElementById("cantidad");
const divisaSelect = document.getElementById("divisa");
const buscarButton = document.getElementById("buscar");
const resultadoDiv = document.getElementById("resultado");
const graficaDiv = document.getElementById("grafica");
let divisaSeleccionada = 0;
let moneda = 0;

divisaSelect.addEventListener("change", () => {
  divisaSeleccionada = divisaSelect.value;
});

const api = async () => {
  try {
    const response = await fetch("https://mindicador.cl/api/");
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const selectOptions = async () => {
  const data = await api();
  if (divisaSeleccionada === "dolar") {
    return data.dolar.valor;
  } else if (divisaSeleccionada === "euro") {
    return data.euro.valor;
  } else if (divisaSeleccionada === "uf") {
    return data.uf.valor;
  } else {
    console.log("no identificado");
  }
};

buscarButton.addEventListener("click", async () => {
  const cantidad = parseFloat(cantidadInput.value);
  if (isNaN(cantidad)) {
    resultadoDiv.textContent = "Ingrese una cantidad válida.";
    return;
  }
  const moneda = await selectOptions();
  if (moneda) {
    const resultado = cantidad / moneda;
    resultadoDiv.textContent = `Resultado: ${resultado.toFixed(2)}`;
  }
});

// buscarButton.addEventListener("click", () => {
//   const cantidad = parseFloat(cantidadInput.value);
//   const divisa = divisaSelect.value;

// //Se busca el valor en la api

//   //Aqui se genera el resultado al tener los valores de la API mas lo tecleado
//   const tipoDeCambio = tiposDeCambio[divisa];

//   if (isNaN(cantidad)) {
//     resultadoDiv.textContent = "Ingrese una cantidad válida.";
//     return;
// }
// const resultado = cantidad / tipoDeCambio;
// resultadoDiv.textContent = `Resultado: ${resultado.toFixed(2)}`;

// });
