const getApi = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  return data;
};

const renderDom = (data) => {
  body.innerHTML = "";
  data.items.forEach((personaje) => {
    body.innerHTML += `
        <div class= "card">
        <img src="${personaje.image}" width=200px>
        <h1>${personaje.name}</h1>
        <p>${personaje.description}</p>
        </div>
        `;
  });
};

const main = async () => {
  const api = await getApi("https://mindicador.cl/api/");
  renderDom(api);
};

main();
