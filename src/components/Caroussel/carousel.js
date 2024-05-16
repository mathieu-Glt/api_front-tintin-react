import React from "react";
import './carousel.css';
import { useState, useEffect } from "react";
import axios from "axios";
import '../FavorieListMovie/keyframes-favories.css';
import requests from "../../configApi/Request";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import RateStar from "../RateStar";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { cleanup } from "@testing-library/react";
import { Link } from "react-router-dom";
import DeleteMovie from "../../pages/DeleteMovie";
import { HashLink } from "react-router-hash-link";
import ReactPlayer from "react-player/lazy";
import FavoriteHeart from "../FavoriteHeart/FavoriteHeart";


// composant pour afficher le carousel de la page Home (logo Netflix en haut de la barre de navigation)
function Carousel() {

    // içi récupération de l'url courante
    const currentUrl = window.location.pathname;

    // tableau pour récupérer le résultat d'un film aléatoire de la fonction fetchDatabase du useEffect
    const [movieThen, setMovieThen] = useState([]);

    // booleen pour la gestion de l'affichage du film aléatoire du carousel
    const [toggleVisible, setToggleVisible] = useState(false);

    // booleen pour la gestion de l'affichage des bouttons du film affiché dans le carousel
    const [admin, setAdmin] = useState(false);

    // booleen qui contrôle l'affichage de la video
    const [playMovie, setPlayMovie] = useState(null);

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




    // hook de récupération d'un film de maniére aléatoire de l'api 
    useEffect(() => {

        async function fetchDatabase() {
            try {
                const request = await axios.get(requests.fetchRandomMovie, {
                    // headers: {
                    //     "x-access-token": JSON.parse(localStorage.getItem('user')).token,
                    // }
                });
                setToggleVisible(false);
                setTimeout(() => {
                    setMovieThen(request.data.results);
                    console.log(request.data.results);
                }, 1000);
                // le film devient visible  1 seconde aprés la requête efféctué vers l'api 
                setTimeout(() => {
                    setToggleVisible(true);
                }, 1000);

            } catch (error) {
                console.log(error.message);
            }
        }

        // récupération d'un film de maniére aléatoire de l'api toute les 15 secondes
        fetchDatabase();
        const interval = setInterval(() => {
            fetchDatabase();
        }, 15000)

        return function cleanup() {
            clearInterval(interval);
        }
    }, []);

    // hook qui récupére les données du storage du navigateur si il y a un utilisateur connécté ou pas
    useEffect(() => {
        const userStorage = localStorage.getItem("user");
        // console.log(userStorage);
        const userData = JSON.parse(userStorage);
        if (!userData) {
            return
        }
        // console.log(userData.role);
        if (userData.role === 'admin') {
            setAdmin(!admin)
        } else {
            setAdmin(false)
        }

    }, [])


    return (
        <>
            <div className="carousel-container">

                {/* affichage du résulat de la fonction  fetchDatabase pour renvoyer le film aléatoirement*/}
                {movieThen.map((movie, index) => (
                    <div className={(toggleVisible ? "movie_container" : "movie_container transparent") + ""} key={index}>
                        <div className="">
                            <div className="rate">
                                {/* <a className="link-favourite" href="#"><FavoriteIcon style={{ color: "red", width: "40px", height: "40px" }} /></a> */}
                                <FavoriteHeart
                                    movie={movie}
                                />

                                <div className="">
                                    <RateStar
                                        movie={movie.rating}
                                    />
                                </div>

                            </div>

                                <div className="movie" >
                                    <img className="image_database" alt="poster_film_tintin" src={process.env.PUBLIC_URL + '/tintin/' + movie.picture} />
                                    <p className="carousel_movies__synopsis">
                                {movie.synopsis}
                            </p>

                                </div>

                        </div>

                        <div className="">
                            <div className="movies__buttons">
                                <button type="button" onClick={(e) => handleClickMovie(e, movie.movie)} className="banner_button">
                                    <PlayCircleIcon /><HashLink className="text-dark" smooth to='#movie-tintin'>Lecture</HashLink>
                                </button>

                                {/* si je suis admin je peux accéder au boutton éditer le film */}
                                {/* {admin ? <Link to={`/editmovie/${movie.id}`}>
                                    <button type="button" className="banner_button btn-sm">
                                        Editer le film
                                    </button>
                                </Link> : null} */}

                                {/* si je suis admin je peux accéder au boutton supprimer le film */}
                                {/* {admin && <DeleteMovie
                                    currentUrl={currentUrl}
                                    movie={movie}
                                />} */}

                            </div>

                        </div>

                    </div>

                ))}
            </div>
            <section id="movie-tintin"></section>
            {/* expliquer à la ligne 318 de App.js*/}
            {playMovie ?
                <div className="video-container">
                    <button className="close-video" onClick={handleClickMovieClose}>x</button>
                    <h2>Bon visionnage</h2><div className="video-player">
                        <ReactPlayer url={playMovie} />
                    </div>
                </div>
                : null}

        </>
    );
};


export default Carousel;