// Función mejorada para generar el HTML de una tarjeta de juegos
const generateJuegoCard = ({ img, name, precio, stock }) => {
  return `
      <div class="card col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12 mb-5">
          <img src="${img}" class="card-img-top" alt="">
          <div class="card-body">
              <h5 class="card-title">${name}</h5>
              <h5 class="card-title">${precio}</h5>
              <h5 class="card-title">${stock}</h5>
              <button class="btn btn-primary"><i class="fa-solid fa-cart-shopping"></i>&nbsp;Comprar</button>
          </div>
      </div>
  `;
};

// Función para obtener los juegos desde la API y renderizar las tarjetas
const obtenerYRenderizarJuegos = async () => {
  try {
    const response = await fetch('https://run.mocky.io/v3/d1f85e57-309c-4feb-afde-e6c146f476e5');
    if (!response.ok) {
      throw new Error('La solicitud falló');
    }
    const juegos = await response.json();
    console.log('Data de la API:', juegos); // Mostrar los datos de la API en la consola
    renderJuegos(juegos); // Llama a la función renderJuegos para mostrar las tarjetas
  } catch (error) {
    console.error('Error:', error);
  }
};

// Función para renderizar las tarjetas de juegos y almacenarlas en localStorage
const renderJuegos = (juegos) => {
  const contenedor = document.getElementById("contenedorJuego");
  contenedor.innerHTML = ""; // Limpiar el contenedor antes de renderizar las tarjetas
  juegos.forEach((juego) => {
    const cardHTML = generateJuegoCard(juego); // Genera el HTML de la tarjeta para cada juego
    contenedor.innerHTML += cardHTML; // Agrega la tarjeta al contenedor
    
    // Almacenar el juego en localStorage
    localStorage.setItem(juego.name, JSON.stringify(juego));
  });
};

// Mostrar todos los juegos al cargar la página
obtenerYRenderizarJuegos();

// Listener de evento para el campo de búsqueda
const searchInput = document.getElementById("nombre");
searchInput.addEventListener("input", async () => {
  const searchTerm = searchInput.value.trim().toLowerCase();
  try {
    const response = await fetch('https://run.mocky.io/v3/d1f85e57-309c-4feb-afde-e6c146f476e5');
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
contenedor.addEventListener("click", async (event) => {
  if (event.target.classList.contains("btn-primary")) {
    const button = event.target;
    const juegoCard = button.closest(".card");
    const juegoName = juegoCard.querySelector(".card-title").textContent;
    
    // Obtener los detalles del juego desde localStorage
    const juego = JSON.parse(localStorage.getItem(juegoName));
    if (!juego) {
      console.error('El juego no está en el almacenamiento local');
      return;
    }

    // Almacenar el juego actual en localStorage
    localStorage.setItem('juegoActual', JSON.stringify(juego)); 

    // Redireccionar al detalle del juego seleccionado
    window.location.href = `juego-unico.html?name=${encodeURIComponent(juegoName)}`;
  }
});

