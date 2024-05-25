// Función mejorada para generar el HTML de una tarjeta de juguetes
const generateJugueteCard = ({ img, name, precio, stock }) => {
    return `
        <div class="card col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12 mb-5">
            <img src="${img}" class="card-img-top" alt="">
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p class="card-text">Precio: ${precio}</p>
                <p class="card-text">Stock: ${stock}</p>
                <button class="btn btn-primary"><i class="fa-solid fa-cart-shopping"></i>&nbsp;Comprar</button>
            </div>
        </div>
    `;
  };
  
  // Función para obtener los juguetes desde la API y renderizar las tarjetas
  const obtenerYRenderizarJuguetes = async () => {
    try {
      const response = await fetch('https://run.mocky.io/v3/e7444942-34a2-4929-9166-f9dc80625a47');
      if (!response.ok) {
        throw new Error('La solicitud falló');
      }
      const juguetes = await response.json();
      console.log('Data de la API:', juguetes); // Mostrar los datos de la API en la consola
      renderJuguetes(juguetes); // Llama a la función renderJuguetes para mostrar las tarjetas
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  // Función para renderizar las tarjetas de juguetes y almacenarlas en localStorage
  const renderJuguetes = (juguetes) => {
    const contenedor = document.getElementById("contenedorJuguete");
    contenedor.innerHTML = ""; // Limpiar el contenedor antes de renderizar las tarjetas
    juguetes.forEach((juguete) => {
      const cardHTML = generateJugueteCard(juguete); // Genera el HTML de la tarjeta para cada juguete
      contenedor.innerHTML += cardHTML; // Agrega la tarjeta al contenedor
      
      // Almacenar el juguete en localStorage
      localStorage.setItem(juguete.name, JSON.stringify(juguete));
    });
  };
  
  // Mostrar todos los juguetes al cargar la página
  obtenerYRenderizarJuguetes();
  
  // Listener de evento para el campo de búsqueda
  const searchInput = document.getElementById("nombre");
  searchInput.addEventListener("input", async () => {
    const searchTerm = searchInput.value.trim().toLowerCase();
    try {
      const response = await fetch('https://run.mocky.io/v3/e7444942-34a2-4929-9166-f9dc80625a47');
      if (!response.ok) {
        throw new Error('La solicitud falló');
      }
      const juguetes = await response.json();
      const filteredJuguetes = juguetes.filter((juguete) =>
        juguete.name.toLowerCase().includes(searchTerm)
      );
      renderJuguetes(filteredJuguetes); // Renderiza las tarjetas filtradas
    } catch (error) {
      console.error('Error:', error);
    }
  });
  
  // Listener de evento para el botón "compra"
  const contenedor = document.getElementById("contenedorJuguete");
  contenedor.addEventListener("click", async (event) => {
    if (event.target.classList.contains("btn-primary")) {
      const button = event.target;
      const jugueteCard = button.closest(".card");
      const jugueteName = jugueteCard.querySelector(".card-title").textContent;
      
      // Obtener los detalles del juguete desde localStorage
      const juguete = JSON.parse(localStorage.getItem(jugueteName));
      if (!juguete) {
        console.error('El juguete no está en el almacenamiento local');
        return;
      }
  
      // Almacenar el juguete actual en localStorage
      localStorage.setItem('jugueteActual', JSON.stringify(juguete)); 
  
      // Redireccionar al detalle del juguete seleccionado
      window.location.href = `juguete-unico.html?name=${encodeURIComponent(jugueteName)}`;
    }
  });
  