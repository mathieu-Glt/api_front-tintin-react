import React from "react";
import './character.css';
import { useState, useEffect } from "react";
import requests from "../../configApi/Request";
import axios from "axios";
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import store from '../../store';
import { useSelector, useDispatch } from 'react-redux';


// composant de la page "SERIES" pour afficher tous les personnages
function Series(props) {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state);
    // console.log('resultats de store', cart);
    console.log(props.handleAddBasket);
    console.log('resultats: ', props.data);
    const characters = props.data;
    console.log(props);

    // tableau qui récupère tous les personnages de la requête fetchDatabase
    const [characterDatabase, setCharacterDatabase] = useState([]);

    // fonctionnalité en réflexion
    const [firstname, setFirstname] = useState(true);

    // booleen renvoyé si je suis admin ou non
    const [admin, setAdmin] = useState(false);

    // tableau qui récupére les données du store redux (les personnages du panier)
    const [todos, setTodos] = useState([]);

    // içi connexion au store de redux
    useEffect(() => {
        store.subscribe(() => syncStore())
    }, []);

    // récupération des datas du store
    const syncStore = () => {
        setTodos(store.getState());
        console.log(store.getState());
    };

    // hook qui récupére les données  de la requête pour avoir tous les personnages de l'api
    useEffect(() => {
        async function fetchDatabase() {
            const request = await axios.get(requests.fetchAllCharactersDatabase);
            console.log(request.data.results);
            const results = request.data.results;
            console.log(results);
            results.map((ob, index) => {
                // console.log(ob.prenom+index);
                // console.log('index : ' + index, 'firstname : ' + ob.prenom);
                console.log(ob.prenom);
                if (ob.prenom === 'n.c') {
                    setFirstname(false);
                    console.log(ob.prenom);
                } else {
                    setFirstname(true)

                }
                console.log(firstname);
            })

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


    //console.log(characterDatabase);
    const characterPicture = [
        "1.jpg", "2.jpg", "3.jpg", "4.jpg",
        "5.jpg", "6.jpg", "7.jpg", "8.jpg",
        "9.jpg", "10.jpg", "11.jpg", "12.jpg",
        "13.jpg", "14.jpg", "15.jpg", "16.jpg",
        "17.jpg", "18.jpg", "19.jpg", "20.jpg",
        "21.jpg", "22.jpg", "23.jpg", "24.jpg",
        "25.jpg", "26.jpg", "27.jpg", "28.jpg",
        "29.jpg", "30.jpg", "31.jpg", "32.jpg",
        "33.jpg", "34.jpg", "35.jpg", "36.jpg",
        "37.jpg", "38.jpg", "39.jpg", "40.jpg",
        "41.jpg", "42.jpg", "43.jpg", "44.jpg",
        "45.jpg", "46.jpg", "47.jpg", "48.jpg",
        "49.jpg", "50.jpg", "51.jpg", "52.jpg",
        "53.jpg", "54.jpg", "55.jpg", "56.jpg",
        "57.jpg", "58.jpg", "59.jpg", "60.jpg",
        "61.jpg", "62.jpg", "63.jpg", "64.jpg",
        "65.jpg", "66.jpg", "67.jpg", "68.jpg",
        "69.jpg", "70.jpg", "71.jpg", "72.jpg",
        "73.jpg", "74.jpg", "75.jpg", "76.jpg",
        "77.jpg", "78.jpg", "79.jpg", "80.jpg",
        "81.jpg", "82.jpg", "83.jpg", "84.jpg",
        "85.jpg", "86.jpg", "87.jpg", "88.jpg",
        "89.jpg", "90.jpg", "91.jpg", "92.jpg",
        "93.jpg", "94.jpg", "95.jpg", "96.jpg",
        "97.jpg", "98.jpg"

    ];

    console.log(firstname);


    return (

        <div>
            <section id="perso-haut"></section>
            <HashLink className="border-2 border border-primary bg-white text-dark p-2" smooth to='#perso-bas'>Bas de page</HashLink>


            <h1 className="title-character">TOUS LES PERSONNAGES DE LA SERIE</h1>
            <section className="card_movie d-flex flex-row flex-wrap ">
                {/* affichage du résulat de la fonction  fetchDatabase pour renvoyer tous les personnages de tintin*/}
                {characterDatabase.map((character, index) => (

                    <div key={index} className="card_movie_container_character">
                        <div className="image ">
                            <div className="movie">
                                <img className="image_database_series" alt="image_perso" src={process.env.PUBLIC_URL + '/seriePerso/' + character.picture} />
                            </div>
                        </div>
                        <p className="character__synopsis">
                            {character.nom+ ' '}
                            {character.prenom+ ' '}
                            {character.profession+ ' '}
                            {character.personnage.slice(0, 150)}
                        </p>

                        <div className="movies__buttons_favoris">
                            {/* Au clique sur le boutton je peux ajouter le personnage au panier */}
                            <button className="banner_button_series " onClick={() => props.handleAddBasket(character)}>
                                Ajouter au panier
                            </button>
                            {/* lien qui dirige vers l'affichage des détails du personnage*/}
                            <Link to={`/characters/${character.slug}`}>
                                <button href="#" className="banner_button_series bg-warning">
                                    Voir les détails
                                </button>
                            </Link>
                            {/* si je suis admin je peux accéder au boutton supprimer le personnage */}
                            {admin ? <button className="banner_button_series bg-danger">
                                Supprimer
                            </button> : null}
                            {admin ? <button className="card_button_acceuil_edit ">
                                Editer
                            </button> : null}


                        </div>
                    </div>


                ))}

            </section>
            <section id="perso-bas"></section>
            <HashLink className=" border-2 border border-warning bg-white text-dark p-2" alt="75x75" smooth to='#perso-haut'>Hauts de page</HashLink>
            {/* si je suis admin je peux accéder au boutton ajouter un personnage */}
            {admin ? <Link to={`/addcharacter`}>
                <button type="button" className="button-add-character">
                    Ajouter un personnage
                </button>
            </Link> : null}



        </div>

    );
};

export default Series;