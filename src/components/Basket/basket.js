import axios from 'axios';
import React from 'react'
import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
// import { useSelector, useDispatch } from 'react-redux';
import requests from '../../configApi/Request';
import store from '../../store';
import { toast } from 'react-toastify';
import './basket.css';
// composant pour le pannier de l'application
export default function Basket(props) {

  // constante pour résupérer les données du store à la ligne 28
  const [todos, setTodos] = useState([]);

  // içi connexion au store de redux
  useEffect(() => {
    store.subscribe(() => syncStore())
  }, []);

  // içi récupération des datas du state management de redux
  const displayCharacter = useSelector((state) => state)
  console.log(displayCharacter);
  const list = displayCharacter

  // récupération des datas du store
  const syncStore = () => {
    setTodos(store.getState());
    console.log(store.getState());
  };

  // fonction pour supprimer une carte du panier à l'aide de redux
  function deleteBasket(id) {
    try {
      console.log(id);
      store.dispatch({
        type: 'DELETE_TODO',
        payload: id
      })
      store.dispatch({
        type: 'SUCCESS',
        payload: 'Request successfull'
      })


    } catch (error) {
      store.dispatch({
        type: 'ERROR',
        payload: 'Bad request'
      })

    }

  }

  const displaySuccess = useSelector((state) => state.ErrorReducer)
  console.log(displaySuccess);

  // condition pour renvoyer la bonne notification à l'utilisateur lors de la suppression de la carte personnage
  if (displaySuccess[1] === 'Request successfully') {
    setTimeout(() => {
      toast.success(displaySuccess[1], { type: "warning", theme: "colored", autoClose: 5000 });

    }, 2000);

  }

  if (displaySuccess[1] === 'Bad request') {
    setTimeout(() => {
      toast.success(displaySuccess[1], { type: "danger", theme: "colored", autoClose: 5000 });

    }, 2000);

  }


  return (
    <>
      <h1 className="bg-dark text-warning">MON PANIER :</h1>
      <section className="card_movie_panier d-flex flex-row flex-wrap justify-content-center p-4 pt-4 ">
        
        {/* affichage des cartes ajoutés au pannier */}
        {displayCharacter.todosReducer.map((character, index) => (

          <div key={index} className="movie_container_panier">
                <img className="image_database_panier" alt="poster_perso" src={process.env.PUBLIC_URL + '/seriePerso/' + character.picture} />
            <div className="pres-perso_panier">
            <p className="movies__synopsis card-text pt-4">
              Nom: {character.nom}
            </p>
            <p className="movies__synopsis card-text pt-1">
              Prénom : {character.prenom}
            </p>
            <p className="movies__synopsis card-text ">
              Profession: {character.profession}
            </p>
            <p className="movies__synopsis card-text ">
              Personnage: {character.personnage.slice(0, 150)}
            </p>
            </div>

            <div className="movies__buttons_panier p-2 d-flex flex-row justify-content-around ">

              <button  onClick={() => deleteBasket(character.id)} className="banner_button btn-sm bg-danger">
                Supprimer
              </button>

            </div>
          </div>


        ))}

      </section>
    </>

  )
}
