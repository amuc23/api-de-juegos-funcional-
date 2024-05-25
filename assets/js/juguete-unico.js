// Obtener el nombre del juguete de la URL
const params = new URLSearchParams(window.location.search);
const jugueteName = params.get('name');

console.log('Nombre del juguete:', jugueteName); // Verificar el nombre del juguete

// Función para obtener los detalles del juguete por su nombre
const obtenerDetallesJuguete = async (nombre) => {
  try {
    const response = await fetch('https://run.mocky.io/v3/e7444942-34a2-4929-9166-f9dc80625a47');
    if (!response.ok) {
      throw new Error('La solicitud falló');
    }
    const juguetes = await response.json();
    const juguete = juguetes.find(juguete => juguete.name === nombre);
    if (!juguete) {
      throw new Error('Juguete no encontrado');
    }
    console.log('Detalles del juguete:', juguete); // Verificar los detalles del juguete
    renderizarDetalleJuguete(juguete);
  } catch (error) {
    console.error('Error:', error);
  }
};

// Función para renderizar los detalles del juguete
const renderizarDetalleJuguete = (juguete) => {
  const jugueteDetailContainer = document.getElementById("jugueteDetailContainer");
  jugueteDetailContainer.innerHTML = ""; // Limpiar el contenedor

  const jugueteHTML = `
  <div class="card">
      <img src="${juguete.img}" class="card-img-top" alt="${juguete.name}">
      <div class="card-body">
          <h5 class="card-title">${juguete.name}</h5>
          <p class="card-text">Descripción: ${juguete.descrip}</p>
          <p class="card-text">Edad recomendada: ${juguete.edad}</p>
          <p class="card-text">Precio: ${juguete.precio}</p>
          <p class="card-text">Stock: ${juguete.stock}</p>
          <a href="javascript:history.back()" class="btn btn-primary">Volver</a>
      </div>
  </div>
  `;

  // Insertar el HTML en el contenedor
  jugueteDetailContainer.innerHTML = jugueteHTML;
};

// Cargar los detalles del juguete al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  obtenerDetallesJuguete(jugueteName);
});
