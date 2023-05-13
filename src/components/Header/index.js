import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

// composant représentant l'entête de la page
export default function Index(props) {
  console.log(props);
const location = useLocation();
// constante qui stocke le message de bienvenue avec les informations de l'utilisateur
const [message, setMessage] = useState('');

// hook qui vérifie la présence d'un utilisateur connecté
// et qui définie un message de bienvenue avec le nom et le prénom de l'utilisateur qui vient de se connecter
useEffect(() => {
  const userStorage = localStorage.getItem("user");
  const userData = JSON.parse(userStorage);
  if (userData) {
    const firstname = userData.firstname;
    const lastname = userData.lastname;

    setMessage(`Bienvenue ${firstname} ${lastname} !`);
  } else {
    setMessage('');
  }

  // içi le hook se déclenche à l'écoute du chemin se connexion
}, [location.pathname]);



return (
  
    message ? <div className='header'>
        <h1 className='text-warning bg-danger rounded-pill border border-dark border-5 p-2 mb-2'>{message}</h1>
    </div> : null
  )
}
