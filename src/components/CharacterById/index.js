import axios from 'axios';
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import requests, { api_url } from '../../configApi/Request';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RateStar from "../RateStar";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import React from 'react'

// composant qui affiche un personnage par son id ou son nom
export default function CharacterById() {


    // variable recevant les datas du hook fetchdatabase  (toutes les info du personnage)

    // récupération du paramétre de l'url id
    const params = useParams();
    console.log(params.id);
    let id = params.id;

    // const id = params.id

    // tableau recevant les datas du hook fetchdatabase  (toutes les info du personnage)
    const [characterDatabase, setCharacterDatabase] = useState([]);

    // booleen pour la gestion de l'affichage des bouttons du film affiché dans le carousel
    const [admin, setAdmin] = useState(false);


    // requête pour récupérer de l'api toutes les informations du personnage soit par son id ou par son nom
    useEffect(() => {
        async function fetchDatabase() {
            let fetchPath;
            // si le paramètre est un nombre requête fetchCharacterById
            if (!isNaN(Number(id))) {
                fetchPath = requests.fetchCharacterById + id;
                // sinon si le paramètre n'est pas un nombre requête fetchCharacterBySlug
            } else {
                fetchPath = requests.fetchCharacterBySlug + id;
            }

            // récupération d'un personnage par son id / slug
            const request = await axios.get(requests.fetchCharacterById + id);
            console.log(request.data.results);

            setCharacterDatabase(request.data.results)
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

    console.log(characterDatabase);

    return (
        <div>
            <h1 className="bg-dark text-primary mt-4">DETAILS PERSONNAGE</h1>
            <Link to="/characters">
                <button>Retour Liste des personnages</button>
            </Link>

            <section className="card_movie d-flex flex-row flex-wrap justify-content-center p-4 pt-4">

                {/* affichage du résulat de la fonction  fetchDatabase pour renvoyer le résultat du personnage id/nom*/}
                {characterDatabase.map((character, index) => (
                    <div className="movie_container p-4 card text-bg-dark mb-3 d-flex flex-column m-4 w-25 justify-content-center" key={index}>
                        <div className="image ">
                            <div className="movie" >
                                <img className="image_database" alt="poster_perso" src={process.env.PUBLIC_URL + '/seriePerso/' + character.picture} />
                            </div>
                            <p className="movies__synopsis card-text pt-4">
                                Nom: {character.nom}
                            </p>
                            <p className="movies__synopsis card-text pt-1">

                                Prenom: {character.prenom}
                            </p>
                            <p className="movies__synopsis card-text ">
                                Profession: {character.profession}
                            </p>

                        </div>
                        <p className="movies__synopsis card-text pt-4">
                            {character.personnage}
                            {character.personnage_suite}
                        </p>
                        <div className="movies__buttons ">
                        </div>
                        <div type="button" className="movies__buttons p-2 d-flex flex-row justify-content-around ">

                            {/* si je suis admin je peux accéder au boutton éditer le personnage */}
                            {admin ? <button className="banner_button btn-sm bg-warning">
                                Editer
                            </button> : null}

                            {/* si je suis admin je peux accéder au boutton supprimer le personnage */}
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
