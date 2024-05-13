// Función mejorada para generar el HTML de una tarjeta de juegos
const generateJuegoCard = ({ img, name, precio }) => {
  return `
      <div class="card col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12 mb-5">
          <img src="${img}" class="card-img-top" alt="${precio}">
          <div class="card-body">
              <h5 class="card-title">${name}</h5>
              <h5 class="card-title">${precio}</h5>
              <button class="btn btn-primary"><i class="fa-solid fa-cart-shopping"></i>&nbsp;Comprar</button>
          </div>
      </div>
  `;
};

// Función para obtener los juegos desde la API y renderizar las tarjetas
const obtenerYRenderizarJuegos = async () => {
  try {
    const response = await fetch('https://my.api.mockaroo.com/users.json?key=9bc25200');
    if (!response.ok) {
      throw new Error('La solicitud falló');
    }
    const juegos = await response.json();
    renderJuegos(juegos); // Llama a la función renderJuegos para mostrar las tarjetas
  } catch (error) {
    console.error('Error:', error);
  }
};

// Función para renderizar las tarjetas de juegos
const renderJuegos = (juegos) => {
  const contenedor = document.getElementById("contenedorJuego");
  contenedor.innerHTML = ""; // Limpiar el contenedor antes de renderizar las tarjetas
  juegos.forEach((juego) => {
      const cardHTML = generateJuegoCard(juego); // Genera el HTML de la tarjeta para cada juego
      contenedor.innerHTML += cardHTML; // Agrega la tarjeta al contenedor
  });
};

// Mostrar todos los juegos al cargar la página
obtenerYRenderizarJuegos();

// Listener de evento para el campo de búsqueda
const searchInput = document.getElementById("nombre");
searchInput.addEventListener("input", async () => {
  const searchTerm = searchInput.value.trim().toLowerCase();
  try {
    const response = await fetch('https://my.api.mockaroo.com/users.json?key=9bc25200');
    if (!response.ok) {
      throw new Error('La solicitud falló');
    }
    const juegos = await response.json();
    const filteredJuegos = juegos.filter((juego) =>
      juego.name.toLowerCase().includes(searchTerm)
    );
    renderJuegos(filteredJuegos); // Renderiza las tarjetas filtradas
  } catch (error) {
    console.error('Error:', error);
  }
});

// Listener de evento para el botón "compra"
const contenedor = document.getElementById("contenedorJuego");
contenedor.addEventListener("click", (event) => {
  if (event.target.classList.contains("btn-primary")) {
    const button = event.target;
    const juegoCard = button.closest(".card");
    const juegoName = juegoCard.querySelector(".card-title").textContent;
    // Redirecciona al detalle del juego seleccionado
    window.location.href = `juego-unico.html?name=${encodeURIComponent(juegoName)}`;
  }
});