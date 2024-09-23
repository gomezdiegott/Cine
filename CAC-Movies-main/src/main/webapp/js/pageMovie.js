
const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMDIxMTk5OGEwMWIxMGM1MDk5OGE1YTBkODI3NzI0MSIsInN1YiI6IjY2NTczNjFjODZjYzJiNzJkZjFjZjI5MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3SxeWj4H5Sfe_B2MkiY2fXzXNeFH02UDlH3XVo5N-qI';
const API_URL = 'https://api.themoviedb.org/3';
const idioma = {
    espanol : "es-MX",
    ingles : "en-US",
};

function llamarApi(id) {
    fetch(`${API_URL}/movie/${id}?language=${idioma.espanol}`, {
        headers: {
            Authorization: `Bearer ${API_KEY}`,
        },
    })
        .then(response => response.json())
        .then(data => dibujarBanner(data))
        .then(data => llamarApiVideos(id, idioma.espanol))
        /* .catch(error => console.error('Error:', error)); */
}

function dibujarBanner(json) {
    let bannerHTML = crearBanner(json);
    document.querySelector('.bannerMovie').innerHTML = bannerHTML;
    document.querySelector('.banner-background').style.background =
    `linear-gradient(0deg ,  #181419ff 1%,#18141900 90%),
    url(https://image.tmdb.org/t/p/original/${json.backdrop_path})`;
}

function crearBanner(movie) {
    return `
    <div class="banner-background">
        <div class="banner-content">
            <div class="peli-img">
                <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="" />
            </div>
            <div class="detalles">
                <h2 class="resaltador">${movie.title}</h2>
                <div>
                    <p class="resaltador">${movie.overview}</p>
                </div>
                <div class="masDetalles">
                    <ul class="resaltador">
                        <li>Género: </li>
                        <li>${movie.genres.map(genero => `<li>${genero.name.trim()}</li>`).join(',')}</li>
                    </ul>
                    <ul class="resaltador">
                        <li>Fecha de lanzamiento: ${movie.release_date}</li>
                    </ul>
                    <ul class="resaltador">
                        <li>Votos:</li>
                        <li>${movie.vote_average}</li>
                    </ul>
                    <ul class="resaltador">
                        <li>Duración:</li>
                        <li>${movie.runtime} minutos</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    `;
}
function crearTrailerMovie(key) {
    document.querySelector('.video-container').innerHTML = `
    <iframe src="https://www.youtube.com/embed/${key}" frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen></iframe>

    `
}

function llamarApiVideos(id, idiomaMovie) {

    fetch(`${API_URL}/movie/${id}/videos?language=${idiomaMovie}`,{
        headers: {
            Authorization: `Bearer ${API_KEY}`,
        },
    })
    .then(response => {return response.json()})
    .then(data => data.results.find(video => video.type == 'Trailer'))
    .then(video => {console.log(video==null); return video})
    //si encuentra el trailer en españo o no lo encuentra, busca en ingles
    .then(video => {
        if (video != null) {
            crearTrailerMovie(video.key)
        }else if(idiomaMovie != idioma.ingles) {
            llamarApiVideos(id,idioma.ingles)
        }
    })   

}
llamarApi(sessionStorage.getItem('idMovie'))