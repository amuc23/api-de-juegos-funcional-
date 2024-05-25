// Función mejorada para generar el HTML de una tarjeta de consolas
const generateConsolasCard = ({ img, name, precio, stock }) => {
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

// Función para obtener las consolas desde la API y renderizar las tarjetas
const obtenerYRenderizarConsolas = async () => {
    try {
        const response = await fetch('https://run.mocky.io/v3/5b911f00-e002-4557-bab2-cc31fa50c177');
        if (!response.ok) {
            throw new Error('La solicitud falló');
        }
        const consolas = await response.json();
        console.log('Data de la API:', consolas); // Mostrar los datos de la API en la consola
        renderConsolas(consolas); // Llama a la función renderConsolas para mostrar las tarjetas
    } catch (error) {
        console.error('Error:', error);
    }
};

// Función para renderizar las tarjetas de consolas y almacenarlas en localStorage
const renderConsolas = (consolas) => {
    const contenedor = document.getElementById("contenedorConsola");
    contenedor.innerHTML = ""; // Limpiar el contenedor antes de renderizar las tarjetas
    consolas.forEach((consola) => {
        const cardHTML = generateConsolasCard(consola); // Genera el HTML de la tarjeta para cada consola
        contenedor.innerHTML += cardHTML; // Agrega la tarjeta al contenedor
        
        // Almacenar la consola en localStorage
        localStorage.setItem(consola.name, JSON.stringify(consola));
    });
};

// Mostrar todas las consolas al cargar la página
obtenerYRenderizarConsolas();

// Listener de evento para el campo de búsqueda
const searchInput = document.getElementById("nombre");
searchInput.addEventListener("input", async () => {
    const searchTerm = searchInput.value.trim().toLowerCase();
    try {
        const response = await fetch('https://run.mocky.io/v3/5b911f00-e002-4557-bab2-cc31fa50c177');
        if (!response.ok) {
            throw new Error('La solicitud falló');
        }
        const consolas = await response.json();
        const filteredConsolas = consolas.filter((consola) =>
            consola.name.toLowerCase().includes(searchTerm)
        );
        renderConsolas(filteredConsolas); // Renderiza las tarjetas filtradas
    } catch (error) {
        console.error('Error:', error);
    }
});

// Listener de evento para el botón "compra"
const contenedorConsola = document.getElementById("contenedorConsola");
contenedorConsola.addEventListener("click", async (event) => {
    if (event.target.classList.contains("btn-primary")) {
        const button = event.target;
        const consolaCard = button.closest(".card");
        const consolaName = consolaCard.querySelector(".card-title").textContent;
        
        // Obtener los detalles de la consola desde localStorage
        const consola = JSON.parse(localStorage.getItem(consolaName));
        if (!consola) {
            console.error('La consola no está en el almacenamiento local');
            return;
        }

        // Almacenar la consola actual en localStorage
        localStorage.setItem('consolaActual', JSON.stringify(consola)); 

        // Redireccionar al detalle de la consola seleccionada
        window.location.href = `consola-unica.html?name=${encodeURIComponent(consolaName)}`;
    }
});
