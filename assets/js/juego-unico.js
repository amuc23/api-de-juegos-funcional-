// Obtener el nombre del juego de la URL
const params = new URLSearchParams(window.location.search);
const juegoName = params.get('name');

console.log('Nombre del juego:', juegoName); // Verificar el nombre del juego

// Función para obtener los detalles del juego por su nombre
const obtenerDetallesJuego = async (nombre) => {
  try {
    const response = await fetch('https://run.mocky.io/v3/d1f85e57-309c-4feb-afde-e6c146f476e5');
    if (!response.ok) {
      throw new Error('La solicitud falló');
    }
    const juegos = await response.json();
    const juego = juegos.find(juego => juego.name === nombre);
    if (!juego) {
      throw new Error('Juego no encontrado');
    }
    console.log('Detalles del juego:', juego); // Verificar los detalles del juego
    renderizarDetalleJuego(juego);
  } catch (error) {
    console.error('Error:', error);
  }
};

// Función para renderizar los detalles del juego
const renderizarDetalleJuego = (juego) => {
  const juegoDetailContainer = document.getElementById("juegoDetailContainer");
  juegoDetailContainer.innerHTML = ""; // Limpiar el contenedor

  const juegoHTML = `
  <div class="card">
      <img src="${juego.img}" class="card-img-top" alt="">
      <div class="card-body">
          <h5 class="card-title">${juego.name}</h5>
          <p class="card-text">Descripción: ${juego.descrip}</p>
          <p class="card-text">Consolas: ${juego.consolas}</p>
          <p class="card-text">Precio: ${juego.precio}</p>
          <p class="card-text"> ${juego.stock}</p>
          <!-- Aquí puedes agregar más detalles si es necesario -->
          <a href="javascript:history.back()" class="btn btn-primary">Volver</a>
      </div>
  </div>
`;

  // Insertar el HTML en el contenedor
  juegoDetailContainer.innerHTML = juegoHTML;
};

// Cargar los detalles del juego al cargar la página
obtenerDetallesJuego(juegoName);
