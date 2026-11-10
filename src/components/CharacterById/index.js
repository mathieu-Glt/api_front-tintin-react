import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import requests, { api_url } from "../../configApi/Request";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RateStar from "../RateStar";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import React from "react";
import "./characterById.css";
// composant qui affiche un personnage par son id ou son nom
export default function CharacterById() {
  // variable recevant les datas du hook fetchdatabase  (toutes les info du personnage)

  // récupération du paramétre de l'url id
  const params = useParams();
  let id = params.id;

  // const id = params.id

  // tableau recevant les datas du hook fetchdatabase  (toutes les info du personnage)
  const [characterDatabase, setCharacterDatabase] = useState([]);

  // booleen pour la gestion de l'affichage des bouttons du film affiché dans le carousel
  const [admin, setAdmin] = useState(false);

  // requête pour récupérer de l'api toutes les informations du personnage soit par son id ou par son nom
  useEffect(() => {
    async function fetchDatabase() {
      try {
        const isId = /^\d+$/.test(id);
        const fetchPath = isId
          ? requests.fetchCharacterById + id
          : requests.fetchCharacterBySlug + encodeURIComponent(id);

        const request = await axios.get(fetchPath);
        const results = request.data.results;
        // console.log(request.data.results);
        setCharacterDatabase(
          Array.isArray(results) ? results : results ? [results] : [],
        );
      } catch (error) {
        console.error("Erreur de chargement du personnage :", error);
        // ici : setError(...) pour afficher un message à l'utilisateur
      }
    }

    fetchDatabase();
  }, [id]);

  // hook qui récupére les données du storage du navigateur si il y a un utilisateur connécté ou pas
  useEffect(() => {
    const userStorage = localStorage.getItem("user");
    const userData = JSON.parse(userStorage);
    if (!userData) {
      return;
    }
    // console.log(userData.role);
    if (userData.role === "admin") {
      setAdmin(!admin);
    } else {
      setAdmin(false);
    }
  }, []);

  return (
    <div>
      <h1 className="bg-dark text-primary mt-4">DETAILS PERSONNAGE</h1>
      <Link to="/characters">
        <button className="button_details_character">
          Retour Liste des personnages
        </button>
      </Link>

      <section className="card_movie">
        {/* affichage du résulat de la fonction  fetchDatabase pour renvoyer le résultat du personnage id/nom*/}
        {characterDatabase?.map((character, index) => (
          <div className="movie_container" key={index}>
            <div className="image ">
              <div className="movie">
                <img
                  className="image_database"
                  alt="poster_perso"
                  src={
                    process.env.PUBLIC_URL + "/seriePerso/" + character.picture
                  }
                />
              </div>
            </div>
            <div className="info_character">
              <p className="movies__synopsis card-text pt-1 h3">
                Nom: {character.nom}
              </p>
              <p className="movies__synopsis card-text pt-1 h3">
                Prenom: {character.prenom}
              </p>
            </div>
            <p className="movies__synopsis card-text ">
              Profession: {character.profession}
            </p>

            <p className="movies__synopsis card-text pt-4">
              {character.personnage}
              {character.personnage_suite}
            </p>
            <div className="movies__buttons "></div>
            <div
              type="button"
              className="movies__buttons p-2 d-flex flex-row justify-content-around "
            >
              {/* si je suis admin je peux accéder au boutton éditer le personnage */}
              {admin ? (
                <button className="banner_button btn-sm bg-warning">
                  Editer
                </button>
              ) : null}

              {/* si je suis admin je peux accéder au boutton supprimer le personnage */}
              {admin ? (
                <button
                  type="button"
                  className="banner_button btn-sm bg-danger"
                >
                  Supprimer
                </button>
              ) : null}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
