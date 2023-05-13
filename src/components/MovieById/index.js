import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import requests, { api_url } from '../../configApi/Request';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RateStar from "../RateStar";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

// composant qui affiche un film par son id ou son nom
export default function MovieById() {

    // récupération du paramétre de l'url id
    const params = useParams();
    const id = params.id

    // tableau recevant les datas du hook fetchdatabase  (toutes les info du film)
    const [movieDatabase, setMovieDatabase] = useState([]);

    // booleen pour la gestion de l'affichage des bouttons du film affiché dans le carousel
    const [admin, setAdmin] = useState(false);

    // requête pour récupérer de l'api tous les détails du film soit par son id ou par son titre
    useEffect(() => {
        async function fetchDatabase() {
            let fetchPath;
            // si le paramètre est un nombre requête fetchMovieById
            if (!isNaN(Number(id))) {
                fetchPath = requests.fetchMovieById + id;
            } else {
                // sinon si le paramètre n'est pas un nombre requête fetchMovieBySlug
                fetchPath = requests.fetchMovieBySlug + id;
            }
            const request = await axios.get(fetchPath);
            console.log(request.data.results);

            setMovieDatabase(request.data.results)
        }
        fetchDatabase();
    }, []);

    // hook qui récupére les données du storage du navigateur si il y a un utilisateur connécté ou pas
    useEffect(() => {
        const userStorage = localStorage.getItem("user");
        const userData = JSON.parse(userStorage);
        if (!userData) {
            return
        }
        console.log(userData.role);
        if (userData.role === 'admin') {
            setAdmin(!admin)
        } else {
            setAdmin(false)
        }

    }, [])

console.log(movieDatabase);

    return (

        <div>
            <h1 className="bg-dark text-warning mt-4">DETAILS FILM</h1>
            <Link to="/acceuil">
                <button>Retour Acceuil</button>
            </Link>

            <section className="card_movie d-flex flex-row flex-wrap justify-content-center p-4 pt-4">

                {/* affichage du résulat de la fonction  fetchDatabase pour renvoyer tous les détails du film */}
                {movieDatabase.map((movie, index) => (
                    <div className="movie_container p-4 card text-bg-dark mb-3 d-flex flex-column m-4 w-25 justify-content-center" key={index}>
                        <a className="link-favourite" href="#"><FavoriteIcon style={{ color: "red", width: "40px", height: "40px" }} /></a>

                        <div className="d-flex flex-row pb-2 justify-content-center mb-2">
                            <RateStar 
                            movie={movie.rating}
                            />
                        </div>
                        <div className="image ">
                            <div className="movie" >
                                {/* <img className="image_database" src={process.env.PUBLIC_URL + '/tintin/' + movieDatabase.picture} /> */}
                                <img className="image_database" alt="poster_film_tintin" src={api_url + '/images/' + movie.picture} />
                            </div>
                        </div>
                        <p className="movies__synopsis card-text pt-4">
                            {movie.synopsis}
                        </p>
                        <div className="movies__buttons ">
                        </div>
                        <div type="button" className="movies__buttons p-2 d-flex flex-row justify-content-around ">
                            {/* si je suis admin je peux accéder au boutton éditer le film */}
                            {admin ? <button className="banner_button btn-sm bg-warning">
                                Editer
                            </button> : null}
                            {/* si je suis admin je peux accéder au boutton supprimer le film */}
                            {admin ? <button type="button" className="banner_button btn-sm bg-danger">
                                Supprimer
                            </button> : null}

                        </div>

                    </div>

                ))}
            </section>

        </div>

    )
}
