import React from "react";
import './personnage.css';
import { useState, useEffect } from "react";
import requests from "../../configApi/Request";
import axios from "axios";

// composant d'affichage de la page "TINTIN" sur le personnage de Tintin
function Tintin(props) {

    // tableau récupérant les datas de fetchDatabase sur Tintin de l'api
    const [persoDatabase, setPersoDatabase] = useState([]);

    // au chargement de cette page le hook se déclanche 
    // avec une requête qui récupére les données de Tintin 
    useEffect(() => {
        async function fetchDatabase() {
            const request = await axios.get(requests.fetchAllPersoDatabase);
            // console.log(request.data.results);

            setPersoDatabase(request.data.results)
        }
        fetchDatabase();
    }, []);

    // console.log(persoDatabase);
    const persoPicture = [
        "1.jpg",
        "2.jpg",
        "3.jpg"

    ];

    return (
        <div className="herge_container">
            <h1 className="bg-dark text-danger">
                LE PERSONNAGE TINTIN
            </h1>

            <section className="card_movie d-flex flex-row flex-wrap justify-content-center p-4 pt-4">
                {/* affichage du résulat de la fonction  fetchDatabase pour renvoyer tous les données du personnage Tintin*/}
                {persoDatabase.map((persoDatabase, index) => (
                    <div key={index} className="card_movie_container_tintin">
                        <div className="imageTintin">
                            <img className="image_tintin" alt="image_tintin" src={process.env.PUBLIC_URL + '/personnage/' + persoDatabase.picture} />
                        </div>
                        <p className="personnages__synopsis card-text pt-4">
                            {persoDatabase.presentation}
                        </p>
                            <img className="image_tintin2" alt="image_tintin" src={process.env.PUBLIC_URL + '/personnage/2.jpg'} />
                        <p className="personnages__synopsis card-text pt-4">
                            {persoDatabase.suite}
                        </p>
                            <img className="image_tintin3" alt="image_tintin" src={process.env.PUBLIC_URL + '/serie/tintin-general.jpg'} />
                        <p className="personnages__synopsis card-text pt-4">
                            {persoDatabase.age}
                        </p>
                            <img className="image_tintin4" alt="image_tintin" src={process.env.PUBLIC_URL + '/personnage/3.jpg'} />
                        <p className="personnages__synopsis card-text pt-4">
                            {persoDatabase.personnalité}
                        </p>
                            <img className="image_tintin5" alt="image_tintin" src={process.env.PUBLIC_URL + '/serie/tintin-haddock.jpg'} />

                        <p className="personnages__synopsis card-text pt-4">
                            {persoDatabase.personnalité_suite}
                        </p>
                            <img className="image_tintin6" alt="image_tintin" src={process.env.PUBLIC_URL + '/serie/tintin-milou.jpg'} />


                    </div>
                ))}
            </section>
        </div>

    );
};

export default Tintin;