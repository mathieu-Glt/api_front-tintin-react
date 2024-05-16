import React from 'react';
import './Link.css';
import avatarConnected from '../../assets/images/avatarConnecte.png';
import axios from "axios";
import { useState } from "react"
import { toast } from "react-toastify";
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import { api_url } from '../../configApi/Request';


// composant lien AVATAR de la barre de navigation
function LinkAvatarIcon() {

    const location = useLocation()
    const navigate = useNavigate()

    // constante qui stocke le token
    const [token, setToken] = useState("");
    
    // constante qui stocke le prénom de l'utilisateur
    const [firstname, setFirstname] = useState("");

    // constante qui stocke le nom de l'utilisateur
    const [lastname, setLastname] = useState("");

    // hook se déclenchant à l'écoute du chemin de l'url et récupére les infos de l'utilisateur qui se connecte
    useEffect(() => {
        const dataStorage = sessionStorage.getItem("user")
        const user = JSON.parse(dataStorage);
        // si user connecté fournis les constantes ci-dessous avec les infos de l'user
        if (user) {
            setToken(user.token)
            setFirstname(user.firstname);
            setLastname(user.lastname);
        } else {
            // sinon les constantes sont vides
            setToken('');
            setFirstname('');
            setLastname('');
        }
        //  console.log("token verify", location.pathname); 
    }, [location.pathname])

    // fonction qui lance la requête de déconnexion de l'utilisateur
    function handleClick(e) {
        e.preventDefault()
        axios.post(`${api_url}/api/users/logout`, {
            // headers: {
            //     "x-access-token": JSON.parse(localStorage.getItem('user')).token,
            // }

        })
            .then((response) => {
                // console.log(response);
                if (response.status === 200) {
                    toast.success(`You're well logout ${firstname} ${lastname}`, { type: "success", theme: "colored", autoClose: 5000 });
                    // on redirige vers l'acceuil
                    navigate("/")
                    sessionStorage.clear();
                    localStorage.clear()


                } else {
                    toast.error(response.data.msg, { type: "error", theme: "colored", autoClose: 5000 });

                }
            })

    }


    return (
        <>
            {/* si le token est présent tu affiches les informations de l'utilisateur */}
            {token &&

                <a onClick={handleClick} className='nav_action_notif'>
                    {firstname} {lastname}
                    <img src={avatarConnected} className='favicon' width="50px" alt='avatar' />
                </a>

            }


        </>

    )

}

export default LinkAvatarIcon;