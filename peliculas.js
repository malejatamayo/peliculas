let USUARIOS = {
  admin: "admin123",
  usuario: "1234",
  demo: "demo"
};

let usuarioActual = null;
let peliculasGlobales = [];
let peliculasEnEdicion = null;
// REcargar pagina al inciiar
document.addEventListener("DOMContentLoaded", ()=>{
inicializarApp();

});
//Iniciar app
function inicializarApp(){
                   cargarUsuariosReg();

eventos(       );

    let usuarioLogueado = localStorage.getItem("usuarioLogueado");
    if(usuarioLogueado){

        usuarioActual = JSON.parse (usuarioLogueado);
        mostrarDashboard();
    }
if(!localStorage.getItem("peliculas")){
    cargarDatosEjemplo();


}


    
}
//Envia usuarios registrados a localStorage
function cargarUsuariosReg(){
let usuariosRegistrados = JSON.parse(localStorage.getItem("usuariosRegistrados"));
  if(usuariosRegistrados){

Object.assign(USUARIOS, usuariosRegistrados);
  }


}
// eventos del usuario
function eventos(){
    
    document.getElementById("formLogin").addEventListener("submit", login);
    document.getElementById("formRegistro").addEventListener("submit", register);
    document.getElementById("btnLogout").addEventListener("click", logout);
    document.getElementById("btnGuardarPelicula").addEventListener("click", guardarPelicula);
    document.getElementById("inputBuscar").addEventListener("keyup", buscarPeliculas);
    document.getElementById("selectGenero").addEventListener("change", filtrarPorGenero);
}

//Login logica
function login(e){
    e.preventDefault();
    let user = document.getElementById("inputUser").value;
    let password = document.getElementById("inputPassword").value;
    if(USUARIOS[user]&& USUARIOS[user] === password){
        usuarioActual = user
        localStorage.setItem("usuarioLogueado", JSON.stringify(user));
        mostrarDashboard();
        document.getElementById("formLogin").reset();
    } else{
        alert("El usuario y contraseña no son validos");
    }
};
// Configuracion de que se muestra  Dashboard
function mostrarDashboard(){

    document.getElementById("loginSection").style.display = "none";
    document.getElementById("btnLogin").style.display = "none";
    document.getElementById("mainContent").style.display = "block";
    document.getElementById("btnLogout").style.display = "block";
    document.getElementById("btnAgregar").style.display = "block";
    cargarPeliculas();
    

};
// Configuracion de que se muestra login
function mostrarLogin(){

    document.getElementById("loginSection").style.display = "flex";
    document.getElementById("btnLogin").style.display = "block";
    document.getElementById("mainContent").style.display = "none";
    document.getElementById("btnLogout").style.display = "none";
    document.getElementById("btnAgregar").style.display = "none";

} 
// logout
function logout(){

    let confirmar =confirm("¿Desea salir de la sesión?")

    if(confirmar){
        usuarioActual=null;
        localStorage.removeItem("usuarioLogueado")
        mostrarLogin();
        document.querySelector("#formLogin").reset();
    }
}
// REgistrar usuario
function register(e){
    e.preventDefault();
    let nombre = document.getElementById("inputNombre").value.trim();
    let email = document.getElementById("inputEmail").value.trim();
    let usuario = document.getElementById("inputUserReg").value.trim();
    let password = document.getElementById("inputPasswordReg").value.trim();
    let confirmPassword = document.getElementById("inputConfirmPassword").value.trim();

    // Validaciones
    if(!nombre || !email || !usuario || !password || !confirmPassword){
        alert("Debes completar todos los campos");
        return;
    }
    
    if(usuario.length < 4){
        alert("El usuario debe tener mínimo 4 caracteres");
        return;
    }
    
    if(password.length < 6){
        alert("La contraseña debe tener mínimo 6 caracteres");
        return;
    }
    
    if(password !== confirmPassword){
        alert("Las contraseñas no coinciden");
        return;
    }
    
    if(USUARIOS[usuario]){
        alert("El usuario ya existe");
        return;
    }

    // Si todas las validaciones pasan, registrar el usuario
    USUARIOS[usuario] = password;
    let usuariosRegistrados = JSON.parse(localStorage.getItem("usuariosRegistrados")) || {};
    usuariosRegistrados[usuario] = password;
    localStorage.setItem("usuariosRegistrados", JSON.stringify(usuariosRegistrados));

    alert("Usuario "+ usuario + " registrado correctamente");
    document.querySelector("#formRegistro").reset();
    document.querySelector("#login-tab").click();
}
// Se cargan datos de ejemplo al LS
function cargarDatosEjemplo(){
let peliculasEjemplo = [
    
    
    {

    id: 1,
    nombre: "Rodrigo De no futuro",
    genero: "ALternativo",
    director: "Victor Gaviria",
    ano: "1990",
    calificacion: "7.7",
    descripcion: " Narra la historia de un joven punkero y marginado en Medellín, quien busca sentido en una ciudad oprimida por la violencia, la crisis urbana y la falta de oportunidades en los años 80.",
    imagen:"https://www.proimagenescolombia.com/photos/57150_123__imagen__.jpg",
    fecha: new Date()
    
    },

     {

    id: 2,
    nombre: "MR Nobody",
    genero: "Ciencia Ficción",
    director: "Jaco van Dormael",
    ano: "2009",
    calificacion: "8.7",
    descripcion: "Un chico espera en el andén, el tren está a punto de partir. ¿Debería irse con su madre, o quedarse con su padre? Mientras no escoja, todo es aún posible.",
    imagen:"https://agoradeeducacion.com/nassau/wp-content/uploads/2018/10/Mr-Nobody-696x984.jpg",
    fecha: new Date()
    
    },

    {

    id: 3,
    nombre: "Los siete magníficos",
    genero: "Viejo Oeste",
    director: "Antonie Fuqua",
    ano: "2016",
    calificacion: "8.8",
    descripcion: "Siete pistoleros del antiguo oeste forman equipo para ayudar a un pobre pueblo contra unos ladrones salvajes.",
    imagen:"https://i.ytimg.com/vi/ICf5gqAX-yk/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDYFNYZeLMDF2aJJxhGJf0Qu5T0gw",
    fecha: new Date()
    },
  { 
    id: 4,
    nombre: "Interestelar",
    genero: "Ciencia Ficción",
    director: "Christopher Nolan",
    ano: "2014",
    calificacion: "9.2",
    descripcion: "Un grupo de exploradores viaja a través de un agujero de gusano en el espacio en busca de un nuevo hogar para la humanidad.",
    imagen: "https://i.ytimg.com/vi/zSWdZVtXT7E/hq720.jpg",
    fecha: new Date()
    },
 
    {
    id: 6,
    nombre: "La vida es bella",
    genero: "Drama",
    director: "Roberto Benigni",
    ano: "1997",
    calificacion: "9.1",
    descripcion: "Un padre usa su imaginación para proteger a su hijo de los horrores de un campo de concentración nazi.",
    imagen: "https://i.ytimg.com/vi/pAYEQP8gx3w/hq720.jpg",
    fecha: new Date()
    },
    {
    id: 7,
    nombre: "Volver al futuro",
    genero: "Aventura",
    director: "Robert Zemeckis",
    ano: "1985",
    calificacion: "8.9",
    descripcion: "Un adolescente viaja accidentalmente al pasado en un auto modificado como máquina del tiempo.",
    imagen: "https://i.ytimg.com/vi/qvsgGtivCgs/hq720.jpg",
    fecha: new Date()
    },
    {
    id: 8,
    nombre: "El origen",
    genero: "Ciencia Ficción",
    director: "Christopher Nolan",
    ano: "2010",
    calificacion: "9.0",
    descripcion: "Un ladrón especializado en robar secretos del subconsciente recibe la misión de implantar una idea.",
    imagen: "https://i.ytimg.com/vi/YoHD9XEInc0/hq720.jpg",
    fecha: new Date()
    },
    {
    id: 9,
    nombre: "Forrest Gump",
    genero: "Drama",
    director: "Robert Zemeckis",
    ano: "1994",
    calificacion: "9.3",
    descripcion: "La historia de un hombre con un coeficiente intelectual bajo que influye en grandes eventos históricos.",
    imagen: "https://i.ytimg.com/vi/bLvqoHBptjg/hq720.jpg",
    fecha: new Date()
    },
    {
    id: 10,
    nombre: "Matrix",
    genero: "Acción",
    director: "Lana y Lilly Wachowski",
    ano: "1999",
    calificacion: "9.0",
    descripcion: "Un programador descubre que el mundo en el que vive es una simulación creada por máquinas.",
    imagen: "https://i.ytimg.com/vi/vKQi3bBA1y8/hq720.jpg",
    fecha: new Date()
    },
    {
    id: 11,
    nombre: "El gran Lebowski",
    genero: "Comedia",
    director: "Hermanos Coen",
    ano: "1998",
    calificacion: "8.4",
    descripcion: "Un hombre común se ve envuelto en una confusión criminal por culpa de su nombre.",
    imagen: "https://i.ytimg.com/vi/cd-go0oBF4Y/hq720.jpg",
    fecha: new Date()
    },
    {
    id: 12,
    nombre: "Titanic",
    genero: "Drama",
    director: "James Cameron",
    ano: "1997",
    calificacion: "8.7",
    descripcion: "Una historia de amor que surge durante el trágico hundimiento del famoso transatlántico.",
    imagen: "https://i.ytimg.com/vi/2e-eXJ6HgkQ/hq720.jpg",
    fecha: new Date()
    },
    {
    id: 13,
    nombre: "Mad Max: Furia en la carretera",
    genero: "Acción",
    director: "George Miller",
    ano: "2015",
    calificacion: "8.7",
    descripcion: "En un mundo postapocalíptico, un solitario guerrero ayuda a un grupo a escapar de un tirano.",
    imagen: "https://i.ytimg.com/vi/hEJnMQG9ev8/hq720.jpg",
    fecha: new Date()
    },
    {
    id: 14,
    nombre: "El conjuro",
    genero: "Terror",
    director: "James Wan",
    ano: "2013",
    calificacion: "8.2",
    descripcion: "Una pareja de investigadores paranormales ayuda a una familia aterrorizada por una presencia oscura.",
    imagen: "https://i.ytimg.com/vi/k10ETZ41q5o/hq720.jpg",
    fecha: new Date()
    },
    {
    id: 15,
    nombre: "Django sin cadenas",
    genero: "Viejo Oeste",
    director: "Quentin Tarantino",
    ano: "2012",
    calificacion: "8.9",
    descripcion: "Un esclavo liberado busca rescatar a su esposa con la ayuda de un cazarrecompensas.",
    imagen: "https://i.ytimg.com/vi/0fUCuvNlOCg/hq720.jpg",
    fecha: new Date()
    },

    {
    id: 17,
    nombre: "Piratas del Caribe: La maldición del Perla Negra",
    genero: "Aventura",
    director: "Gore Verbinski",
    ano: "2003",
    calificacion: "8.6",
    descripcion: "Un excéntrico pirata une fuerzas con un herrero para rescatar a una dama secuestrada.",
    imagen: "https://i.ytimg.com/vi/naQr0uTrH_s/hq720.jpg",
    fecha: new Date()
    },
    
    {
    id: 18,
    nombre: "Jojo Rabbit",
    genero: "Comedia",
    director: "Taika Waititi",
    ano: "2019",
    calificacion: "8.3",
    descripcion: "Un niño alemán descubre que su madre esconde a una joven judía durante la Segunda Guerra Mundial.",
    imagen: "https://i.ytimg.com/vi/tL4McUzXfFI/hq720.jpg",
    fecha: new Date()
    }

    ];
localStorage.setItem("peliculas", JSON.stringify(peliculasEjemplo));
};
// cargar peliculas al LS evitando errores, carga carrusel
function cargarPeliculas(){
    let peliculas = localStorage.getItem("peliculas");
    try {
        peliculasGlobales = peliculas ? JSON.parse(peliculas) : [];
    } catch(error) {
        console.error("Error al parsear películas:", error);
        peliculasGlobales = [];
        localStorage.removeItem("peliculas");
    }
    
    cargarCarrusel();
    renderizarGrid(peliculasGlobales);
};
//Renderiza Grid en html
function renderizarGrid(pelis){
let grid = document.getElementById("gridPeliculas");
let sinREsultados = document.getElementById("sinResultados");

if(pelis.length === 0 ){
    grid.innerHTML = "";
    sinREsultados.style.display = "block";
    return;
}

sinREsultados.style.display = "none";
grid.innerHTML = pelis.map(p =>
`
<div class="col-md-6 col-lg-4 col-xl-3">
   <div class="movie-card">
      <img src="${p.imagen}" class="movie-image" onerror="this.src='https://media.istockphoto.com/id/2170017549/vector/curved-film-strip-icon-empty-frame-design-black-border-vector-cinematic-template-element.jpg?s=612x612&w=0&k=20&c=wywajhKcxUCwjjFElamrHf2wxSq-ThsnwVlI4-yhX1Y='">
      <div class="movie-content">
          <h5 class="movie-title">${p.nombre}</h5>
          <span class="movie-genero">${p.genero}</span>
          <div><b>${p.ano}</b> - ${p.director}</div>
          <div class="movie-rating">⭐ ${p.calificacion}/10</div>
          <div class="movie-description">${p.descripcion}</div>
          <div class="movie-action">
            <button class="btn btn-info" onclick="verDetalles(${p.id})">Ver Detalles</button>
            <button class="btn btn-warning" onclick="editarPeliculas(${p.id})">Editar</button>
            <button class="btn btn-danger" onclick="eliminarPeliculas(${p.id})">Eliminar</button>
          </div>
      </div>
   </div>
</div>
`
).join("");
}
// Guarda pelicula  incluye el modo de edicion y creacion.
function guardarPelicula(){
let nombre = document.getElementById("inputTitulo").value;
let genero = document.getElementById("inputGenero").value;
let director = document.getElementById("inputDirector").value;
let ano = document.getElementById("inputAno").value;
let calificacion = document.getElementById("inputCalificacion").value;
let descripcion = document.getElementById("inputDescripcion").value;
let imagen = document.getElementById("inputImagen").value;

if(peliculasEnEdicion){
    // Modo edición: buscar y actualizar la película
    let indice = peliculasGlobales.findIndex(p => p.id === peliculasEnEdicion);
    if(indice !== -1){
        peliculasGlobales[indice] = {
            id: peliculasEnEdicion,
            nombre: nombre,
            genero: genero,
            director: director,
            ano: ano,
            calificacion: calificacion,
            descripcion: descripcion,
            imagen: imagen
        }
        alert("Película actualizada");
    }
    peliculasEnEdicion = null;
}else{
  // Modo creaciin: agregar nueva película
  let nuevapelicula ={
    id: new Date().getTime(),
    nombre: nombre,
    genero: genero,
    director: director,
    ano: ano,
    calificacion: calificacion,
    descripcion: descripcion,
    imagen: imagen
  }

  peliculasGlobales.unshift(nuevapelicula);
  alert("Pelicula agregada");
}

localStorage.setItem("peliculas", JSON.stringify(peliculasGlobales));
cargarPeliculas();
document.getElementById("formPelicula").reset();
document.getElementById("modalTitulo").textContent = "Agregar Película";
document.getElementById("btnGuardarPelicula").textContent = "Guardar";
bootstrap.Modal.getInstance(document.getElementById("modalPelicula")).hide();
}
//Elimina pelicula
function eliminarPeliculas(id){
    let confirmarEliminar = confirm("¿Quiere eliminar la película?");
    
    if(confirmarEliminar){
        peliculasGlobales = peliculasGlobales.filter(p => p.id !== id);
        localStorage.setItem("peliculas", JSON.stringify(peliculasGlobales));
        cargarPeliculas();
    }
}

// Ver Detalles de una película
function verDetalles(id){
    let pelicula = peliculasGlobales.find(p => p.id === id);
    
    if(pelicula){
        document.getElementById("detallesTitulo").textContent = pelicula.nombre;
        document.getElementById("detallesImagen").src = pelicula.imagen;
        document.getElementById("detallesGenero").textContent = pelicula.genero;
        document.getElementById("detallesDirector").textContent = pelicula.director;
        document.getElementById("detallesAno").textContent = pelicula.ano;
        document.getElementById("detallesCalificacion").textContent = pelicula.calificacion;
        document.getElementById("detallesDescripcion").textContent = pelicula.descripcion;
        
        let modal = new bootstrap.Modal(document.getElementById("modalDetalles"));
        modal.show();
    }
}
// Editar peliculas
function editarPeliculas(id){
    let pelicula = peliculasGlobales.find(p => p.id === id);
    
    if(pelicula){
        // Cargar los datos de la película en el formulario
        document.getElementById("inputTitulo").value = pelicula.nombre;
        document.getElementById("inputGenero").value = pelicula.genero;
        document.getElementById("inputDirector").value = pelicula.director;
        document.getElementById("inputAno").value = pelicula.ano;
        document.getElementById("inputCalificacion").value = pelicula.calificacion;
        document.getElementById("inputDescripcion").value = pelicula.descripcion;
        document.getElementById("inputImagen").value = pelicula.imagen;
        
        // Guardar que estamos en modo edición
        peliculasEnEdicion = id;
        
        // Cambiar el título del modal
        document.getElementById("modalTitulo").textContent = "Editar Película";
        document.getElementById("btnGuardarPelicula").textContent = "Actualizar";
        
        // Mostrar el modal
        let modal = new bootstrap.Modal(document.getElementById("modalPelicula"));
        modal.show();
    }
}

// Cargar películas recientes en el carrusel
function cargarCarrusel(){
    if(peliculasGlobales.length === 0) return;
    
    let carrusel = document.getElementById("carouselContent");
    let peliculasRecientes = peliculasGlobales.slice(0, 15); // todas
    
    carrusel.innerHTML = peliculasRecientes.map((p, index) => `
        <div class="carousel-item ${index === 0 ? 'active' : ''}">
            <img src="${p.imagen}" class="d-block w-100" style="height: 400px; object-fit: cover;" alt="${p.nombre}" onerror="this.src='https://media.istockphoto.com/id/2170017549/vector/curved-film-strip-icon-empty-frame-design-black-border-vector-cinematic-template-element.jpg?s=612x612&w=0&k=20&c=wywajhKcxUCwjjFElamrHf2wxSq-ThsnwVlI4-yhX1Y='">
            <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-75 p-3">
                <h5>${p.nombre}</h5>
                <p>${p.descripcion.substring(0, 100)}...</p>
                <button class="btn btn-sm btn-info" onclick="verDetalles(${p.id})">Ver Detalles</button>
            </div>
        </div>
    `).join("");
}

// Función de búsqueda por título
function buscarPeliculas(){
    let termino = document.getElementById("inputBuscar").value.toLowerCase();
    
    let peliculasFiltradas = peliculasGlobales.filter(p => 
        p.nombre.toLowerCase().includes(termino) ||
        p.director.toLowerCase().includes(termino) ||
        p.descripcion.toLowerCase().includes(termino)
    );
    
    renderizarGrid(peliculasFiltradas);
}

// Función para filtrar por género
function filtrarPorGenero(){
    let generoSeleccionado = document.getElementById("selectGenero").value;
    let termino = document.getElementById("inputBuscar").value.toLowerCase();
    
    let peliculasFiltradas = peliculasGlobales.filter(p => {
        let cumpleGenero = generoSeleccionado === "" || p.genero === generoSeleccionado;
        let cumpleBusqueda = p.nombre.toLowerCase().includes(termino) ||
                             p.director.toLowerCase().includes(termino) ||
                             p.descripcion.toLowerCase().includes(termino);
        return cumpleGenero && cumpleBusqueda;
    });
    
    renderizarGrid(peliculasFiltradas);
}

// Función para limpiar búsqueda
function limpiarBusqueda(){
    document.getElementById("inputBuscar").value = "";
    document.getElementById("selectGenero").value = "";
    renderizarGrid(peliculasGlobales);
}

// Actualizar badge de calificación
document.addEventListener("DOMContentLoaded", () => {
    if(document.getElementById("rangoCalificacion")){
        document.getElementById("rangoCalificacion").addEventListener("input", function(){
            document.getElementById("calificacionBadge").textContent = this.value;
        });
    }
});

// Función para aplicar todos los filtros
function aplicarFiltros(){
    let termino = document.getElementById("inputBuscar").value.toLowerCase();
    let generoSeleccionado = document.getElementById("selectGenero").value;
    let anoSeleccionado = document.getElementById("selectAno").value;
    let calificacionMinima = parseFloat(document.getElementById("rangoCalificacion").value);
    let orden = document.getElementById("selectOrden").value;
    
    let peliculasFiltradas = peliculasGlobales.filter(p => {
        // Filtro de búsqueda
        let cumpleBusqueda = termino === "" || 
                             p.nombre.toLowerCase().includes(termino) ||
                             p.director.toLowerCase().includes(termino) ||
                             p.descripcion.toLowerCase().includes(termino);
        
        // Filtro de género
        let cumpleGenero = generoSeleccionado === "" || p.genero === generoSeleccionado;
        
        // Filtro de año
        let cumpleAno = true;
        if(anoSeleccionado !== ""){
            if(anoSeleccionado === "Anterior"){
                cumpleAno = parseInt(p.ano) < 2015;
            } else {
                cumpleAno = p.ano === anoSeleccionado;
            }
        }
        
        // Filtro de calificación
        let cumpleCalificacion = parseFloat(p.calificacion) >= calificacionMinima;
        
        return cumpleBusqueda && cumpleGenero && cumpleAno && cumpleCalificacion;
    });
    
    // Aplicar orden
    peliculasFiltradas = ordenarPeliculas(peliculasFiltradas, orden);
    
    renderizarGrid(peliculasFiltradas);
}

// Función para ordenar películas
function ordenarPeliculas(peliculas, tipo){
    let copia = [...peliculas];
    
    switch(tipo){
        case "reciente":
            return copia.reverse();
        case "antiguo":
            return copia;
        case "titulo":
            return copia.sort((a, b) => a.nombre.localeCompare(b.nombre));
        case "calificacion":
            return copia.sort((a, b) => parseFloat(b.calificacion) - parseFloat(a.calificacion));
        default:
            return copia;
    }
}

// Función para resetear filtros
function resetearFiltros(){
    document.getElementById("inputBuscar").value = "";
    document.getElementById("selectGenero").value = "";
    document.getElementById("selectAno").value = "";
    document.getElementById("rangoCalificacion").value = "0";
    document.getElementById("selectOrden").value = "reciente";
    document.getElementById("calificacionBadge").textContent = "0";
    renderizarGrid(peliculasGlobales);
}

// Actualizar búsqueda en tiempo real
document.addEventListener("DOMContentLoaded", () => {
    if(document.getElementById("inputBuscar")){
        document.getElementById("inputBuscar").addEventListener("keyup", aplicarFiltros);
        document.getElementById("selectGenero").addEventListener("change", aplicarFiltros);
        document.getElementById("selectAno").addEventListener("change", aplicarFiltros);
        document.getElementById("selectOrden").addEventListener("change", aplicarFiltros);
        document.getElementById("rangoCalificacion").addEventListener("input", () => {
            document.getElementById("calificacionBadge").textContent = document.getElementById("rangoCalificacion").value;
        });
    }
});

// Agrega esto a tu función eventos()
document.getElementById("btnAgregar").addEventListener("click", prepararNuevaPelicula);

// Crea esta nueva función
function prepararNuevaPelicula() {
    // 1. Limpiamos la variable de edición para que no crea que estamos editando
    peliculasEnEdicion = null;

    // 2. Reseteamos todos los campos del formulario
    document.getElementById("formPelicula").reset();

    // 3. Restauramos los textos originales del modal
    document.getElementById("modalTitulo").textContent = "Agregar Película";
    document.getElementById("btnGuardarPelicula").textContent = "Guardar";
    
    // 4. Aseguramos que el badge de calificación vuelva a 0
    if(document.getElementById("calificacionBadge")) {
        document.getElementById("calificacionBadge").textContent = "0";
    }
}