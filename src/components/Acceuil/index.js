import React from "react";
import './acceuil.scss';
import '../FavorieListMovie/keyframes-favories.scss';
import { useState, useEffect } from "react";
import axios from "axios";
import requests, { api_url } from "../../configApi/Request";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import RateStar from "../RateStar";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from "react-router-dom";
import ReactPlayer from "react-player/lazy";
import { HashLink } from 'react-router-hash-link';
import FavoriteHeart from "../FavoriteHeart/FavoriteHeart";
import { toast } from "react-toastify";
import DeleteMovie from "../../pages/DeleteMovie";
// import store from '../../store';

// composant de la page "acceuil" pour afficher tous les films
function Acceuil(props) {

    // içi récupération de l'url courante
    const currentUrl = window.location.pathname;

    // tableau qui recoit la reponse du hook useEffect de la fonction fetchAllCharacters pour récupérer tous les personnages de l'api
    const [movieDatabase, setMovieDatabase] = useState([]);

    // booleen qui contrôle l'affichage de la video
    const [playMovie, setPlayMovie] = useState(null);

    // booleen renvoyé si je suis admin ou non
    const [admin, setAdmin] = useState(false);

    // booleen renvoyé pour la gestion de l'affichage de la fenêtre du film
    const [closeMovie, setCloseMovie] = useState(true);


    // fonction pour lancer l'affichage de la fenêtre du film
    function handleClickMovie(e, url) {
        e.preventDefault();
        setPlayMovie(url);
    }

    // fonction pour fermer l'affichage de la fenêtre du film
    function handleClickMovieClose(e) {
        e.preventDefault();
        setCloseMovie(false);
        setPlayMovie(null);
    }

    // hook qui récupére les données du storage du navigateur si il y a un utilisateur connécté ou pas
    useEffect(() => {
        const userStorage = localStorage.getItem("user");
        // console.log(userStorage);
        const userData = JSON.parse(userStorage);
        if (!userData) {
            return fetchDatabaseNotUser();
        } else if (userData.role === 'admin') {
            // si utilisateur admin renvoie true et lance la fonction fetchDatabase
            setAdmin(!admin)
            fetchDatabase();
        } else {
            // sinon admin false lance la fonction fetchDatabase également
            setAdmin(false)
            fetchDatabase();
        }

    }, [])

    // içi fonction qui renvoie les film de tintin avec l'indication de ses films en favoris en envoyant dans la fonction son token 
    async function fetchDatabase() {
        console.log('utilisateur présent!');

        const request = await axios.get(requests.fetchAllTintinDatabase, {
            headers: {
                "x-access-token": JSON.parse(localStorage.getItem('user')).token,
            }
        });
        console.log(request.data.results);

        setMovieDatabase(request.data.results)
    }

    // içi fonction qui renvoie les film de tintin pour les utilisateurs non inscrits ou pas connécté
    async function fetchDatabaseNotUser() {
        console.log('pas de utilisateur !');
        const request = await axios.get(requests.fetchAllTintinDatabaseNotUser)

        console.log(request.data.results);

        setMovieDatabase(request.data.results)
    }

    console.log(movieDatabase);
    return (
        <div>

            {/* utilisation de la librairie react-router-hash-link pour ajouter une ancre et faciliter le scroll */}
            <HashLink className="border-2 border border-danger bg-white text-dark p-2" smooth to='#tintin-bas'>Bas de page</HashLink>
            <h1 className="title_acceuil bg-dark text-primary mt-4">TOUS LES FILMS TINTIN</h1>
            <section className="card_movie d-flex flex-row flex-wrap justify-content-center p-4 pt-4">

                {/* ancre du scroll hauts de page*/}
                <section id="tintin-haut"></section>

                {/* affichage du résulat de la fonction  fetchDatabase pour renvoyer tous les films de tintin*/}
                {movieDatabase.map((movie, index) => (
                    <div className="card_movie_container" key={index}>

                        {/* composant favoris qui indique les films ajouter en favoris à l'utilisateur connécté qui posséde une liste de favoris*/}
                        <FavoriteHeart
                            movie={movie}
                        />
                        <div className="rate-movie d-flex flex-row pb-2 justify-content-center mb-2">

                            {/* composant pour attribuer une note au films*/}
                            <div className="star">
                                <RateStar
                                    movie={movie.rating}
                                />
                            </div>
                        </div>
                        <div className="image ">
                            <div className="movie" key={index}>
                                <img className="image_database_acceuil" alt="poster_film_tintin" src={api_url + '/images/' + movie.picture} />
                            </div>
                        </div>
                        <p className="movies__synopsis_acceuil">
                            {movie.synopsis}
                        </p>
                        <div type="button" className="movies_buttons_acceuil">
                            <button className="card_button_acceuil_lecture" type="button" onClick={(e) => handleClickMovie(e, movie.movie)}>
                                {/* au lancement du film le scroll se place là ou s'affichera la video grace à une ancre*/}
                                <PlayCircleIcon /><HashLink className="text-dark" smooth to='#movie-tintin'>Lecture</HashLink>
                            </button>

                            {/* lien qui dirige vers l'affichage des détails du film  cliqué */}
                            <Link to={`/movies/${movie.slug}`}>
                                <button className="card_button_acceuil_details bg-warning">
                                    Voir les détails
                                </button>
                            </Link>


                            {/* si je suis admin je peux accéder au boutton éditer le film */}
                            {admin ? <Link to={`/editmovie/${movie.id}`}>
                                <button type="button" className="card_button_acceuil_edit">
                                    Editer le film
                                </button>
                            </Link> : null}

                            {/* si je suis admin je peux accéder au boutton supprimer le film */}
                            {admin && <DeleteMovie
                                currentUrl={currentUrl}
                                movie={movie}
                                onSuccess={fetchDatabase}
                            />}
                        </div>
                    </div>

                ))}

                {/* ancre du scroll bas de page*/}
                <section id="tintin-bas"></section>
            </section>
            <HashLink className="border-2 border border-info bg-white text-dark p-2" smooth to='#tintin-haut'>Hauts de page</HashLink>


            {/* si je suis admin je peux accéder au boutton ajouter un film */}
            {admin ? <Link to={`/addmovie`}>
                <button type="button" className="button-add-movie">
                    Ajouter un film
                </button>
            </Link> : null}
            {/* l'ancre qu idirige vers l'emplacement de la video*/}
            <section id="movie-tintin"></section>

            {/* expliquer à la ligne 318 de App.js*/}
            {playMovie ?
                <div className="video-container">
                    <button className="close-video" onClick={handleClickMovieClose}>x</button>
                    <h2>Bon visionnage</h2>
                    <div className="video-player">
                        {/* composant qui lit les medias url*/}
                        <ReactPlayer url={playMovie} />
                        {/* <iframe className="w-100 m-auto" width="600" height="720" src="https://www.youtube.com/embed/6khzvlZuR10" title="Comment insérer une vidéo youtube et récupérer le code iframe ?" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
                    </div>
                </div>
                : null}
        </div>


    );
};

export default Acceuil;