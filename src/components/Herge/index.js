import React from "react";
import './herge.scss';
import { useState, useEffect } from "react";
import requests from "../../configApi/Request";
import axios from "axios";
import ReactPlayer from "react-player/lazy";

// composant d'affichage de la page sur l'auteur Hergé
function Herge(props) {
    console.log(props);
    // tableau récupérant les datas de fetchDatabase sur Hergé de l'api
    const [hergeDatabase, setHergeDatabase] = useState([]);

    // au chargement de cette page le hook se déclanche 
    // avec une requête qui récupére les données de Herge 
    useEffect(() => {
        async function fetchDatabase() {
            const request = await axios.get(requests.fetchAllHergeDatabase);
            // console.log(request.data.results);

            setHergeDatabase(request.data.results)
        }
        fetchDatabase();
    }, []);

    // console.log(hergeDatabase);
    const hergePicture = [
        "1.jpg"
    ];

    return (
        <div className="herge_container p-4">
            <h1 className="bg-dark text-info mb-5">
                L' HISTOIRE DE HERGE
            </h1>
            <section className="card_movie_herge d-flex flex-column justify-content-center align-item-center text-bg-dark">
                {/* affichage du résulat de la fonction  fetchDatabase pour renvoyer tous les données de Herge*/}
                {hergeDatabase.map((hergeDatabase, index) => (
                    <div className="card_movie_container_herge" key={index}>
                        <div className="imageHerge">
                            <img className="image_herge1" alt="photo_herge" src={process.env.PUBLIC_URL + '/herge/' + hergeDatabase.picture} />
                        </div>
                        <p className="movies__synopsis_herge card-text pt-4">
                            Prénom: {hergeDatabase.firstName}
                        </p>
                        <p className="movies__synopsis_herge ">
                            Nom: {hergeDatabase.lastName}
                        </p>
                        <p className="movies__synopsis_herge">
                            Nom d'artiste: {hergeDatabase.nomArtiste}
                        </p>
                        <p className="movies__synopsis_herge">
                            Date de naissance de Hergé: {hergeDatabase.date_de_naissance}
                        </p>
                        <p className="movies__synopsis_herge">
                            Date de décès de Hergé: {hergeDatabase.date_de_décès}
                        </p>
                        <p className="movies__synopsis_herge">
                            Nationalité de Hergé: {hergeDatabase.nationalité}
                        </p>
                        <div className="imageHerge" >
                            <img className="image_herge2" alt="image_tintin" src={process.env.PUBLIC_URL + '/serie/tintin-motobike.jpg'} />
                        </div>

                        <h3 className="pt-5">Présentation de l'auteur:</h3>
                        <p className="movies__synopsis_herge">
                            {hergeDatabase.presentation}
                        </p>
                        <div className="imageHerge" >
                            <img className="image_herge3" alt="image_tintin" src={process.env.PUBLIC_URL + '/serie/tintin-tchang.jpg'} />
                        </div>

                        <h3 className="pt-5">La création des aventures de Tintin:</h3>
                        <p className="movies__synopsis_herge">
                            {hergeDatabase.aventures_de_tintin}
                        </p>
                        <div className="imageHerge" >
                            <img className="image_herge4" alt="image_tintin" src={process.env.PUBLIC_URL + '/serie/tintin-smile.jpg'} />
                        </div>

                    </div>
                ))}
                <h1>Hergé invité de l'émission "Apostrophes" </h1>
                <p>Interviewé par le journaliste Bernard Pivot le 5 janvier 1979, Hergé nous raconte l'histoire de l'oeuvre Tintin... cette source provient des archives de l'INA.</p>

                <div className="video-player-container">
                    {/* composant qui lit les medias url*/}
                    <ReactPlayer url="https://www.youtube.com/watch?v=Z3PzxHIeuyI" />
                </div>

                <h1>Un jeune lecteur invité dans les studio de Hergé</h1>
                <p>En 1979, 4 ans avant le décès de Hergé, ce dernier avait eu la gentillesse de recevoir dans ses studios un jeune garçon pour lui expliquer son travail.</p>

                <div className="video-player-container">
                    {/* composant qui lit les medias url*/}
                    <ReactPlayer className="video-player" url="https://www.youtube.com/watch?v=WFeDlX8TajE" />
                </div>


            </section>

        </div>
    );
};

export default Herge;