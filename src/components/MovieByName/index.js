import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import requests from '../../configApi/Request';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RateStar from "../RateStar";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

// composant pour récupérer un film par son nom mais ce composant n'est plus utilisé
export default function MovieByName() {

    const params = useParams();
    console.log(params.name);
    const name = params.name;
    const res = name.replace(/%20/g, " ")
    console.log(res);



    const [movieDatabase, setMovieDatabase] = useState([]);

    useEffect(() => {
        async function fetchDatabase() {
            const request = await axios.get(requests.fetchMovieByName + res);
            console.log(request.data.results);

            setMovieDatabase(request.data.results)
        }
        fetchDatabase();
    }, []);

    return (
        <div>
            <h1 className="bg-dark text-success mt-4">SELECTION FILM PAR NOM</h1>
            <Link to="/toprated">
                <button>Retour To rated</button>
            </Link>

            <section className="card_movie d-flex flex-row flex-wrap justify-content-center p-4 pt-4">


                {movieDatabase.map((movieDatabase, index) => (
                    <div className="movie_container p-4 card text-bg-dark mb-3 d-flex flex-column m-4 w-25 justify-content-center" key={index}>
                        <a className="link-favourite" href="#"><FavoriteIcon style={{ color: "red", width: "40px", height: "40px" }} /></a>

                        <div className="d-flex flex-row pb-2 justify-content-center mb-2">
                            <RateStar />
                        </div>
                        <div className="image ">
                            <div className="movie" >
                                <img className="image_database" alt="poster_film_tintin" src={process.env.PUBLIC_URL + '/tintin/' + movieDatabase.picture} />
                            </div>
                        </div>
                        <p className="movies__synopsis card-text pt-4">
                            {movieDatabase.synopsis}
                        </p>
                        <div className="movies__buttons ">
                            <button type="button" className="banner_button btn-sm">
                                <PlayCircleIcon />Lecture
                            </button>
                        </div>
                        <div type="button" className="movies__buttons p-2 d-flex flex-row justify-content-around ">
                            <Link to={`/movie/${index}`}>
                                <button className="banner_button btn-sm bg-warning">
                                    Editer
                                </button>
                            </Link>

                            <button type="button" className="banner_button btn-sm bg-danger">
                                Supprimer
                            </button>

                        </div>

                    </div>

                ))}
            </section>


        </div>
    )
}
