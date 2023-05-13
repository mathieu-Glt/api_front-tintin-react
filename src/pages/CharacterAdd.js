import React from 'react';
import { useState } from "react"
import { toast } from "react-toastify";
import { Navigate } from 'react-router-dom'
import { Link } from "react-router-dom";
import axios from 'axios';
import requests from '../configApi/Request';

//setTodos composant pour ajouter un personnage
export default function CharacterAdd() {

    // state qui stock champs nom formulaire
    const [nom, setName] = useState('');

    // state qui stock champs prénom formulaire
    const [prenom, setFirstname] = useState('');

    // state qui stock champs image formulaire
    const [picture, setPicture] = useState('');

    // state qui stock champs profession formulaire
    const [profession, setProfession] = useState('');

    // state qui stock champs personnage formulaire
    const [personnage, setPersonnage] = useState('');

    // state qui stock champs personnage_suite formulaire
    const [personnageSuite, setPersonnageSuite] = useState('');
    
    // state qui stock champs slug formulaire
    const [slug, setSlug] = useState('');

    // fonction qui se déclanche au changement d'état de input name
    function handleChangeName(e) {
        console.log(e.target.value);
        setName(e.target.value)
    }
    
    // fonction qui se déclanche au changement d'état de input firstname
    function handleChangeFirstname(e) {
        console.log(e.target.value);
        setFirstname(e.target.value)
    }

    // fonction qui se déclenche au changement d'état de input picture
    function handleChangePicture(e) {
        console.log(e.target.value);
        setPicture(e.target.value)
    }
    
    // fonction qui se déclenche au changement d'état de input profession
    function handleChangeProfession(e) {
        console.log(e.target.value);
        setProfession(e.target.value)
    }

    // fonction qui se déclenche au changement d'état de input personnage
    function handleChangePersonnage(e) {
        console.log(e.target.value);
        setPersonnage(e.target.value)
    }
    
    // fonction qui se déclenche au changement d'état de input personnage_suite
    function handleChangePersonnageSuite(e) {
        console.log(e.target.value);
        setPersonnageSuite(e.target.value)
    }
    
    // fonction qui se déclenche au changement d'état de input slug
    function handleChangeSlug(e) {
        console.log(e.target.value);
        setSlug(e.target.value)
    }
    // fonction qui se déclenche à la soumission du formulaire
    function handleSubmitForm(e) {
        e.preventDefault();

        const userStorage = localStorage.getItem("user");
        const userData = JSON.parse(userStorage);
        // si user présent lance la fonction postAddCharacter
        if (userData.role) {
            // console.log('id user : ', userData);
            postAddCharacter()

        } else {
            // si user pas connecté
            toast.success("Vous devez créer un compte pour enregistrer le film en favori", { type: "info", theme: "colored", autoClose: 5000 });

        }
        // fonction pour ajouter un nouveau personnage requête POST
        async function postAddCharacter() {
            // objet à envoyer du formulaire dans la requête
            let body = {
                nom,
                prenom,
                picture,
                profession,
                personnage,
                personnageSuite,
                slug
            }
            console.log(body);

            // requête POST pour envoyer les datas du film à la base de donées
            try {
                const request = await axios.post(requests.fecthAddCharacter, body, {
                    headers: {
                        "x-access-token": JSON.parse(localStorage.getItem('user')).token,
                    }

                })
                    .then((response) => {
                        console.log(response);
                    })
                    .catch(error => { console.log(error) });

            } catch (err) {
                // console.log(err.message);
            }
        }

    }

    return (
        <div>
            <Link to="/characters">
                <button>Retour Personnages</button>
            </Link>


            <h1 className="bg-warning text-dark">
                Formulaire pour ajouter un personnage
            </h1>
            <form className="form">
                <label htmlFor="namePerso" style={{ color: "black" }}><strong>Nom personnage :</strong></label>
                <input type='text' value={nom} id="namePerso" name="namePerso" onChange={handleChangeName} required />

                <label htmlFor="firstnamePerso" style={{ color: "black" }}><strong>Prenom personnage :</strong></label>
                <input type='text' value={prenom} id="firstnamePerso" name="firstnamePerso" onChange={handleChangeFirstname} required />

                <label htmlFor="picturePerso" style={{ color: "black" }}><strong>Picture personnage :</strong></label>
                <input type='text' value={picture} id="picturePerso" name="picturePerso" onChange={handleChangePicture} required />

                <label htmlFor="profPerso" style={{ color: "black" }}><strong>Profession personnage :</strong></label>
                <input type='text' value={profession} id="profPerso" name="profPerso" onChange={handleChangeProfession} required />

                <label htmlFor="desPerso" style={{ color: "black" }}><strong>Description personnage :</strong></label>
                <input type='text' value={personnage} id="desPerso" name="desPerso" onChange={handleChangePersonnage} required />

                <label htmlFor="suiteDesPerso" style={{ color: "black" }}><strong>Description personnage suite :</strong></label>
                <input type='text' value={personnageSuite} id="suiteDesPerso" name="suiteDesPerso" onChange={handleChangePersonnageSuite} required />

                <label htmlFor="slugPerso" style={{ color: "black" }}><strong>Slug personnage :</strong></label>
                <input type='text' value={slug} id="slugPerso" name="slugPerso" onChange={handleChangeSlug} required />

                <button className="submit-form" onClick={handleSubmitForm}>Submit</button>
            </form>

        </div>
    )
}
