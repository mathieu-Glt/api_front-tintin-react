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
    // fetchAllTintinDatabase: `${api_url}/api/movies`, // server api-bact-tintin
    fetchAllTintinDatabase: `${api_url}/api/tintins/`,
    // fetchAllTintinDatabaseNotUser: `${api_url}/api/unknowuser/movies`, // server api-bact-tintin
    fetchAllTintinDatabaseNotUser: `${api_url}/api/tintins/unknowuser/movies`,
    // fetchAllHergeDatabase: `${api_url}/api/herges`, // server api-bact-tintin
    fetchAllHergeDatabase: `${api_url}/api/herge/`,
    // fetchAllPersoDatabase: `${api_url}/api/tintins`, // server api-bact-tintin
    fetchAllPersoDatabase: `${api_url}/api/persoTintin/`, 
    // fetchAllCharactersDatabase: `${api_url}/api/characters`, // server api-bact-tintin
    fetchAllCharactersDatabase: `${api_url}/api/characters/`,
    // fetchFavoriesMovie: `${api_url}/api/favories`,
    // fetchFavoriesMovie: `${api_url}/api/favories`, // server api-bact-tintin
    fetchFavoriesMovie: `${api_url}/api/favories/`, // server api-bact-tintin
    // fetchMovieThen: `${api_url}/api/v1/movies/then`,
    // fetchAllMoviesRating: `${api_url}/api/v1/movie/rating`, // server api-bact-tintin
    fetchAllMoviesRating: `${api_url}/api/tintins/tintin/best/rate`,
    // fetchMovieBySearch: `${api_url}/api/movies/search/`, // server api-bact-tintin
    fetchMovieBySearch: `${api_url}/api/tintins/v2/`,
    // fetchMovieBySlug: `${api_url}/api/v1/movies/`, // server api-bact-tintin
    fetchMovieBySlug: `${api_url}/api/tintins/v1/`,
    // fetchMovieById: `${api_url}/api/v1/movies/`, // server api-bact-tintin
    fetchMovieById: `${api_url}/api/tintins/`,
    // fetchCharacterById: `${api_url}/api/v1/characters/`, // server api-bact-tintin
    fetchCharacterById: `${api_url}/api/characters/`,
    // fetchCharacterBySlug: `${api_url}/api/v2/character/`, // server api-bact-tintin
    fetchCharacterBySlug: `${api_url}/api/characters/v2/`,
    // fetchAddMovieFavories: `${api_url}/api/v1/favories`, // server api-bact-tintin
    fetchAddMovieFavories: `${api_url}/api/favories/tintin/`,
    // fetchMovieRate: `${api_url}/api/v1/movie/rate`, // server api-bact-tintin
    fetchMovieRate: `${api_url}/api/tintins/movie/rate`,
    // pas terminer fetchNoteMovie, // server api-bact-tintin
    fetchNoteMovie: `${api_url}/api/tintins/movie/rate`,
    // fetchAddMovie: `${api_url}/api/v1/movie/save`, // server api-bact-tintin
    fetchAddMovie: `${api_url}/api/tintins/tintin/save`,
    // fetchEditMovie: `${api_url}/api/v1/movie/update/`, // server api-bact-tintin
    fetchEditMovie: `${api_url}/api/tintins/tintin/update/`,
    // fetchDeleteFavoriesUser: `${api_url}/api/user/favories_delete/`, // server api-bact-tintin
    fetchDeleteFavoriesUser: `${api_url}/api/favories/`,
    // fecthAddCharacter: `${api_url}/api/v1/character/save`, // server api-bact-tintin
    fecthAddCharacter: `${api_url}/api/characters/character/save`,
    // fetchDeleteMovie: `${api_url}/api/v1/movie/delete/`, // server api-bact-tintin
    fetchDeleteMovie: `${api_url}/api/tintins/tintin/delete/`,
    // fetchDeleteMovieFavoriesAdmin: `${api_url}/api/v1/favories_delete/`, // server api-bact-tintin
    // fetchDeleteCharacter: `${api_url}/api/v1/character/delete/`, // server api-bact-tintin
    fetchDeleteCharacter: `${api_url}/api/characters/character/delete/`,
    // fetchUploadPicture: `${api_url}/api/v1/upload/pict`, // server api-bact-tintin
    fetchUploadPicture: `${api_url}/api/tintins/tintin/upload/pict`,
    // fetchRandomMovie: `${api_url}/api/v1/random_movie`, // server api-bact-tintin
    fetchRandomMovie: `${api_url}/api/tintins/v3/random_movie`,
    // fetchRteMovieId: `${api_url}/api/movie/rate` 
    // fetchCharacterId: `${api_url}/api/v2/characters/`,

}

export default requests;