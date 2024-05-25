// Obtener el nombre de la consola de la URL
const params = new URLSearchParams(window.location.search);
const consolaName = params.get('name');

console.log('Nombre de la consola:', consolaName); // Verificar el nombre de la consola

// Función para obtener los detalles de la consola por su nombre
const obtenerDetallesConsola = async (nombre) => {
  try {
    const response = await fetch('https://run.mocky.io/v3/5b911f00-e002-4557-bab2-cc31fa50c177');
    if (!response.ok) {
      throw new Error('La solicitud falló');
    }
    const consolas = await response.json();
    const consola = consolas.find(consola => consola.name === nombre);
    if (!consola) {
      throw new Error('Consola no encontrada');
    }
    console.log('Detalles de la consola:', consola); // Verificar los detalles de la consola
    renderizarDetalleConsola(consola);
  } catch (error) {
    console.error('Error:', error);
  }
};

// Función para renderizar los detalles de la consola
const renderizarDetalleConsola = (consola) => {
  const consolaDetailContainer = document.getElementById("consolaDetailContainer");
  consolaDetailContainer.innerHTML = ""; // Limpiar el contenedor

  const consolaHTML = `
  <div class="card">
      <img src="${consola.img}" class="card-img-top" alt="">
      <div class="card-body">
          <h5 class="card-title">${consola.name}</h5>
          <p class="card-text">Precio: ${consola.precio}</p>
          <p class="card-text">Stock: ${consola.stock}</p>
          <!-- Aquí puedes agregar más detalles si es necesario -->
          <a href="javascript:history.back()" class="btn btn-primary">Volver</a>
      </div>
  </div>
`;

  // Insertar el HTML en el contenedor
  consolaDetailContainer.innerHTML = consolaHTML;
};

// Cargar los detalles de la consola al cargar la página
obtenerDetallesConsola(consolaName);
