import React from "react";
//import './contact.scss';
import { useState, useEffect } from "react";
import axios from "axios";
import requests from "../../configApi/Request";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import RateStar from "../RateStar";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from "react-router-dom";
import Carousel from "../Caroussel/carousel";
import './home.css';

// composant de la page Home là ou se trouve le carousel
function Home() {
    // constante avec un message par défault
    const [message, setMessage] = useState('Bienvenue sur l\'application de Tintin');

    // hook se déclenche au chargement de la page pour récupérer les informations de l'utilisateur connecté
    // si l'utilisateur est connecté
    useEffect(() => {
        const userStorage = localStorage.getItem("user");
        const userData = JSON.parse(userStorage);
        // si l'utilisateur est connecté on affiche dans le message ses noms et prénom
        if (userData) {
            const firstname = userData.firstname;
            const lastname = userData.lastname;
            setMessage(`Bienvenue sur l'application de Tintin ${firstname} ${lastname} !`);
        } 
        
    }, []);


    return (
        <div>
            <h1 className='title-home'>{message}</h1>
            <Carousel />
        </div>

    )


}

export default Home;