import React from "react";
import './toprated.scss';
import { useState, useEffect } from "react";
import axios from "axios";
import requests from "../../configApi/Request";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import RateStar from "../RateStar";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from "react-router-dom";
import FavoriteHeart from "../FavoriteHeart/FavoriteHeart";


// composant d'affichage de la page "TOP RATED" sur les films les mieux notés
function TopRated() {

    // tableau récupérant les datas de fetchDatabase sur les films les mieux notés de l'api
    const [movieRatedDatabase, setMovieRatedDatabase] = useState([]);

    // constante qui stocke les differents message à envoyer
    const [displayGuestMessage, setDisplayGuestMessage] = useState(0);

    // booleen renvoyé si je suis admin ou non
    const [admin, setAdmin] = useState(false);

    // hook qui récupére les données du storage du navigateur si il y a un utilisateur connécté ou pas
    useEffect(() => {
        const userStorage = localStorage.getItem("user");
        const userData = JSON.parse(userStorage);

        if (userData) {
            // si user connecté
            fetchDatabase();
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

    // içi fonction qui renvoie les film de tintin les mieux notés
    async function fetchDatabase() {
        try {
            const request = await axios.get(requests.fetchAllMoviesRating, {
                headers: {
                    "x-access-token": JSON.parse(localStorage.getItem('user')).token
                }
            });

            console.log(request.data);
            if (request.data.results) {
                setMovieRatedDatabase(request.data.results);

            } else {
                console.log(request.data.msg);
            }

        } catch (err) {
            console.log(err.message);
        }
    }

    // hook qui récupére les données du storage du navigateur si il y a un utilisateur connécté ou pas
    useEffect(() => {
        const userStorage = localStorage.getItem("user");
        const userData = JSON.parse(userStorage);
        if (!userData) {
            return
        }
        console.log(userData.role);
        if (userData.role === 'admin') {
            // si utilisateur admin  renvoie true
            setAdmin(!admin)
        } else {
            // sinon false
            setAdmin(false)
        }

    }, [])

    return (
        <div>
            <h1 className="bg-dark text-success">LES MEILLEURS FILMS </h1>
            <div>
                <div className={`${displayGuestMessage === 1 ? 'displayMessage' : 'transDisplayMessage'}`}><img alt="image_tournesol" src={process.env.PUBLIC_URL + '/assets/Tournesol.jpg'} /><p> Je ne comprends pas mon pendule m'indique que mes films sont içi ? </p></div>
                <div className={`${displayGuestMessage === 2 ? 'displayMessage' : 'transDisplayMessage'}`}><img alt="haddock" src={process.env.PUBLIC_URL + '/assets/haddock.png'} /><p> Mille millions de mille sabords vous étes sourds !  Combien de fois faut il vous le répeter ! Vous devez être connécté !!!</p></div>
            </div>

            <section className="card_movie d-flex flex-row flex-wrap justify-content-center p-4 pt-4">

                {/* affichage du résulat de la fonction  fetchDatabase pour renvoyer tous les films de tintin les mieux notés */}
                {movieRatedDatabase.map((movie, index) => (
                    <div key={index} className="card_movie_container_top">
                        {/* <a className="link-favourite" href="#"><FavoriteIcon style={{ color: "red", width: "40px", height: "40px" }} /></a> */}
                        <FavoriteHeart movie={movie} />

                        <div className="star">
                            <RateStar movie={movie} />
                        </div>
                        <div className="image">
                            <div className="movie">
                                <img className="image_database_top_rated" alt="poster_film_tintin" src={process.env.PUBLIC_URL + '/tintin/' + movie.picture} />
                            </div>
                        </div>
                        <p className="movies__synopsis">
                            {movie.synopsis}
                        </p>
                        <div className="movies__buttons p-2 ">
                            <button className="banner_button btn-sm">
                                <PlayCircleIcon />Lecture</button>
                        </div>
                        <div className="movies__buttons p-2 d-flex flex-row justify-content-around ">
                            {/* lien dirigeant vers les détails du film */}
                            <Link to={`/movies/${movie.title}`}>
                                <button className="banner_button btn-sm bg-warning">
                                    Voir les détails
                                </button>
                            </Link>
                            {/* si je suis admin je peux accéder au boutton supprimer le film */}
                            {admin ? <button className="banner_button btn-sm bg-danger">
                                Supprimer
                            </button> : null}

                        </div>

                    </div>

                ))}
            </section>

        </div>
    );
};

export default TopRated;