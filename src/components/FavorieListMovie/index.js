import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import requests from "../../configApi/Request";
import './favories.css';
import './keyframes-favories.css';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RateStar from "../RateStar";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ReactPlayer from "react-player/lazy";
import { HashLink } from 'react-router-hash-link';
import FavoriteHeart from "../FavoriteHeart/FavoriteHeart";
import DeleteMovie from "../../pages/DeleteMovie";
import { Link } from "react-router-dom";
import { api_url } from "../../configApi/Request";

// composant de la page "favories" pour afficher tous les films que l'utilisateur ajoute en favoris
function FavoriesList(props) {

    // içi récupération de l'url courante de la page
    const currentUrl = window.location.pathname;
    console.log(currentUrl);

    // tableau récupérant tous les films listé en faovoris de l'utilisateur
    const [movieFavorite, setMovieFavorite] = useState([]);
    
    // booleen qui contrôle l'affichage de la video
    const [playMovie, setPlayMovie] = useState(null);

    // constante qui stocke les differents message à envoyer
    const [displayGuestMessage, setDisplayGuestMessage] = useState(0);
    
    // booleen renvoyé pour la gestion de l'affichage de la fenêtre du film
    const [closeMovie, setCloseMovie] = useState(true);
    
    // booleen renvoyé pour la gestion de l'affichage de la fenêtre du film
    const [isAdmin, setIsADmin] = useState(false);
    
    // hook qui récupére les données du storage du navigateur si il y a un utilisateur connécté ou pas
    useEffect(() => {
        const userStorage = localStorage.getItem("user");
        const userData = JSON.parse(userStorage);
        
        if (userData) {
            // si user connecté
            fetchDatabase();
            setIsADmin(true)
        } else {
            // si user pas connecté tu envoies message 1
            setDisplayGuestMessage(1);
            // puis le message 2
            setTimeout(() => {
                setDisplayGuestMessage(2);
            }, 5000);
            // enfin tous les messages disparaissent
            setTimeout(() => {
                setDisplayGuestMessage(0);
            }, 10000);
            
        }
    }, []);
    
    // hook qui récupère la liste des films favoris de l'utilisateur
    async function fetchDatabase() {
        try {
            const request = await axios.get(requests.fetchFavoriesMovie, {
                headers: {
                    "x-access-token": JSON.parse(localStorage.getItem('user')).token
                }
            });
            
            // console.log(request.data);
            if (request.data.results) {
                setMovieFavorite(request.data.results);
                
            } else {
                console.log(request.data.msg);
            }
            
        } catch (err) {
            console.log(err.message);
        }
    }
    
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
    
    console.log("🚀 ~ file: index.js:98 ~ FavoriesList ~ movieFavorite:", movieFavorite)
    return (
        <div>
            <h1 className="title_film_favories">TOUS MES FILMS FAVORIS</h1>
            <div>
                {/* si displayGuestMessage vaut 1 affiche moi le contenu de ce message sinon pas */}
                <div className={`${displayGuestMessage === 1 ? 'displayMessage' : 'transDisplayMessage'}`}><img className="image_dupont1" alt="image_dupont" src={process.env.PUBLIC_URL + '/assets/dupond.jpg'} /><p> C'était bien tenté ! Tu dois creer un compte pour enregistrer tes favoris !!</p></div>
                {/* si displayGuestMessage vaut 2 affiche moi le contenu de ce message sinon pas */}
                <div className={`${displayGuestMessage === 2 ? 'displayMessage' : 'transDisplayMessage'}`}><img className="image_dupont2" alt="image_duppont" src={process.env.PUBLIC_URL + '/assets/dupond.jpg'} /><p> Je dirais même plus  ! Tu dois creer un compte pour enregistrer tes favoris !!!</p></div>
            </div>

            <section className="card_movie_section_favories ">

                {/* affichage du résulat de la fonction  fetchDatabase pour renvoyer tous les films de tintin listé en favoris dde l'utilisateur*/}
                {movieFavorite.map((movie, index) => (
                    <div className="movie_container_favories" key={index}>
                        {/* composant favoris qui indique les films ajouter en favoris à l'utilisateur connécté qui posséde une liste de favoris*/}
                        <a className="link-favourite" href="#"><FavoriteIcon style={{ color: "red", width: "40px", height: "40px" }} /></a>
                        <div className="star">
                            {/* composant pour attribuer une note au films*/}
                            <RateStar
                                movie={movie.rating}
                                />
                        </div>
                        <div className="image_favories ">
                            <div className="movie_favories" >
                                {/* <img className="image_database" src={process.env.PUBLIC_URL + '/tintin/' + movie.picture} /> */}
                                <img className="image_database_favoris" alt="poster_film_tintin" src={api_url + '/images/' + movie.picture} />

                            </div>
                        </div>
                        <p className="movies__synopsis_favories">
                            {movie.synopsis}
                        </p>
                        <div className="movies__buttons_favoris_lecture ">
                            <button className="card_button_acceuil_lecture" type="button" onClick={(e) => handleClickMovie(e, movie.movie)}>
                                <PlayCircleIcon /><HashLink className="text-dark" smooth to='#movie-tintin'>Lecture</HashLink>
                            </button>
                        </div>
                        <div type="button" className="movies__buttons_favoris">

                            {/* lien dirigeant vers les détails du film */}
                            <Link to={`/movies/${movie.slug}`}>
                                <button className="card_button_acceuil_details">
                                    Plus
                                </button>
                            </Link>
                            {/* si je suis admin je peux accéder au boutton supprimer le film */}
                            <DeleteMovie
                                currentUrl={currentUrl}
                                movie={movie}
                                onSuccess={fetchDatabase}
                            />
                        </div>

                    </div>

                ))}
            </section>
            <section id="movie-tintin"></section>
            {/* expliquer à la ligne 318 de App.js*/}
            {playMovie ?
                <div className="video-container">
                    <button className="close-video" onClick={handleClickMovieClose}>x</button>
                    <h1>Bon visionnage</h1>
                    <div className="video-player">
                        {/* composant qui lit les medias url*/}
                        <ReactPlayer url={playMovie} />
                    </div>
                </div>
                : null}
        </div>


    );
};

export default FavoriesList;