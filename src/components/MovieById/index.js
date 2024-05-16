import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import requests, { api_url } from '../../configApi/Request';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RateStar from "../RateStar";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import './movieById.css'
import ReactCalendar from '../calendar/calendar';

// composant qui affiche un film par son id ou son nom
export default function MovieById() {

    // récupération du paramétre de l'url id
    const params = useParams();
    const id = params.id

    // tableau recevant les datas du hook fetchdatabase  (toutes les info du film)
    const [movieDatabase, setMovieDatabase] = useState([]);

    // booleen pour la gestion de l'affichage des bouttons du film affiché dans le carousel
    const [admin, setAdmin] = useState(false);

    // booleen renvoyé pour la gestion de l'affichage du calendrier
    const [calendrier, setCalendrier] = useState(false);


    function displayCalendar(e, movie) {
        e.preventDefault();
        console.log('display calendar ');
        console.log("🚀 ~ displayCalendar ~ movie:", movie)
        setCalendrier(!calendrier)

    }


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

console.log("movieDatabase : ", movieDatabase);

    return (

        <div>
            <h1 className="title_details_film">DETAILS FILM</h1>
            <Link to="/acceuil">
                <button className='button_detials_movies'>Retour Acceuil</button>
            </Link>

            <section className="card_movie">

                {/* affichage du résulat de la fonction  fetchDatabase pour renvoyer tous les détails du film */}
                {/* {movieDatabase && movieDatabase.map((movie, index) => ( */}
                    <div className="movie_container " >
                        <div className="">
                            <div className="rate">
                                {/* <a className="link-favourite" href="#"><FavoriteIcon style={{ color: "red", width: "40px", height: "40px" }} /></a> */}
                                <FavoriteIcon
                                    movie={movieDatabase}
                                />

                                <div className="">
                                    <RateStar
                                        movie={movieDatabase}
                                    />
                                </div>

                            </div>

                                <div className="movie" >
                                    <img className="image_database" alt="poster_film_tintin" src={process.env.PUBLIC_URL + '/tintin/' + movieDatabase.picture} />
                                    <p className="carousel_movies__synopsis">
                                {movieDatabase.synopsis}
                            </p>

                                </div>

                        </div>
                        <div className="movies__buttons ">
                        <div type="button" className="movies__buttons">
                            {/* si je suis admin je peux accéder au boutton éditer le film */}
                            {admin ? <button className="banner_button">
                                Editer
                            </button> : null}
                            {/* si je suis admin je peux accéder au boutton supprimer le film */}
                            {admin ? <button type="button" className="banner_button">
                                Supprimer
                            </button> : null}

                            <button className="card_button_acceuil_lecture" onClick={(e) => displayCalendar(e, movieDatabase)}>
                                Calendar
                            </button>


                        </div>

                        </div>
                        { calendrier && <ReactCalendar movie={movieDatabase}/>}

                    </div>


                {/* ))} */}
            </section>

        </div>

    )
}
