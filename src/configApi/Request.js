const API_Key = "fe7aee14ddcfaddd60f447c438c996bd";
const BASE_URL = "https://api.themoviedb.org/3";
const URL_img = "https://image.tmdb.org/t/p/w185";
// export const api_url = "http://localhost:8000"
// export const api_url = "http://mathieu-portfolio.com"
export const api_url = process.env.REACT_APP_API_URL
// console.log('env : ',process.env);
// REACT_APP_API_URL: "http://localhost:8000"
// toutes les routes de l'api back end sont dans l'objet requests
const requests = {
    base_url_img: `${URL_img}`,
    // fetchTrending: `${BASE_URL}/trending/movie/week?api_key=${API_Key}`,
    // fetchTopRated: `${BASE_URL}/movie/top_rated?api_key=${API_Key}`,
    // fetchAllTintinApi: `${BASE_URL}/senpmarch/movie?api_key=${API_Key}&language=fr&query=tintin`,
    fetchAllTintinDatabase: `${api_url}/api/movies`,
    fetchAllTintinDatabaseNotUser: `${api_url}/api/unknowuser/movies`,
    fetchAllHergeDatabase: `${api_url}/api/herges`,
    fetchAllPersoDatabase: `${api_url}/api/tintins`,
    fetchAllCharactersDatabase: `${api_url}/api/characters`,
    fetchFavoriesMovie: `${api_url}/api/favories`,
    // fetchMovieThen: `${api_url}/api/v1/movies/then`,
    fetchAllMoviesRating: `${api_url}/api/v1/movie/rating`,
    fetchMovieBySearch: `${api_url}/api/movies/search/`,
    fetchMovieBySlug: `${api_url}/api/v1/movies/`,
    fetchMovieById: `${api_url}/api/v1/movies/`,
    fetchCharacterById: `${api_url}/api/v1/characters/`,
    fetchCharacterBySlug: `${api_url}/api/v2/character/`,
    fetchAddMovieFavories: `${api_url}/api/v1/favories`,
    fetchMovieRate: `${api_url}/api/v1/movie/rate`,
    // pas terminer fetchNoteMovie
    fetchNoteMovie: `${api_url}/api/movie/note`,
    fetchAddMovie: `${api_url}/api/v1/movie/save`,
    fetchEditMovie: `${api_url}/api/v1/movie/update/`,
    fetchDeleteFavoriesUser: `${api_url}/api/user/favories_delete/`,
    fecthAddCharacter: `${api_url}/api/v1/character/save`,
    fetchDeleteMovie: `${api_url}/api/v1/movie/delete/`,
    fetchDeleteMovieFavoriesAdmin: `${api_url}/api/v1/favories_delete/`,
    fetchDeleteCharacter: `${api_url}/api/v1/character/delete/`,
    fetchUploadPicture: `${api_url}/api/v1/upload/pict`,
    fetchRandomMovie: `${api_url}/api/v1/random_movie`,
    // fetchRteMovieId: `${api_url}/api/movie/rate`
    // fetchCharacterId: `${api_url}/api/v2/characters/`,

}

export default requests;