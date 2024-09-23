const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMDIxMTk5OGEwMWIxMGM1MDk5OGE1YTBkODI3NzI0MSIsInN1YiI6IjY2NTczNjFjODZjYzJiNzJkZjFjZjI5MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3SxeWj4H5Sfe_B2MkiY2fXzXNeFH02UDlH3XVo5N-qI';
const API_URL = 'https://api.themoviedb.org/3';

let currentPage = 1;

function llamarApi(page) {
    fetch(`${API_URL}/movie/popular?page=${page}`, {
        headers: {
            Authorization: `Bearer ${API_KEY}`,
        },
    })
        .then(response => response.json())
        .then(data => {
            dibujarDatos(data)
            //ejecuto aca getIDCard() para que se ejecute luego de que se cargue
            //toda la informacion optenida
            getIDCard()
        });
}

function dibujarDatos(json) {
    const filas = json.results.map(obj => pelicula(obj));
    document.querySelector('.cartelera .peliculas').innerHTML = filas.join('');
}

function pelicula(obj) {
    return `<a href="pages/pageMovie.html" id="${obj.id}" class="peli" data-aos="fade-up">
        <img src="https://image.tmdb.org/t/p/w500/${obj.poster_path}" alt="${obj.title}">
            <div class="overlay">
                <div class="texto">${obj.title}</div>
            </div>
        </a>`;
}

// Siguiente pagina
function siguientePag() {
    currentPage++;
    llamarApi(currentPage);
}
// Anterior pagina
function anteriorPag() {
    if (currentPage > 1) {
        currentPage--;
        llamarApi(currentPage);
    }
}
// Event listener (btns sig-ant)
document.querySelector('.btn-ant').addEventListener('click', anteriorPag);
document.querySelector('.btn-sig').addEventListener('click', siguientePag);

llamarApi(currentPage);

// ------------------------------------

function aclamadasApi() {
    fetch(`${API_URL}/movie/top_rated?page=1`, {
        headers: {
            Authorization: `Bearer ${API_KEY}`,
        },
    })
        .then(response => response.json())
        .then(data => {
            datosAclamadas(data)
            getIDCard()
        });
}

function datosAclamadas(json) {
    const filasAclamadas = json.results.map(obj => peliculaAclamada(obj));
    document.querySelector('.aclamadas .pelis').innerHTML = filasAclamadas.join('');
}

function peliculaAclamada(obj) {
    return `<a href="pages/pageMovie.html" id="${obj.id}" class="peli">
        <img src="https://image.tmdb.org/t/p/w500//${obj.poster_path}" alt="${obj.title}">
            <div class="overlay">
                <div class="texto">${obj.title}</div>
            </div>
        </a>`;
}

aclamadasApi();

function getIDCard() {
    const pelis = document.querySelectorAll('.peli')
    pelis.forEach(peli => peli.addEventListener('click', () => {
        /* le paso el id de la pelicula para usarlo en el pageMovie.js */
        sessionStorage.setItem('idMovie',peli.id)
    }))
}
