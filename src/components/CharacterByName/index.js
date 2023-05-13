import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import requests from '../../configApi/Request';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import RateStar from "../RateStar";
// import PlayCircleIcon from '@mui/icons-material/PlayCircle';


// composant pour récupérer un personnage par son nom mais ce composant n'est plus utilisé
export default function CharacterByName() {

    const params = useParams();
    console.log(params.name);
    const name = params.name

    const [characterDatabase, setCharacterDatabase] = useState([]);


    useEffect(() => {
        async function fetchDatabase() {
            const request = await axios.get(requests.fetchCharacterByName + name);
            // console.log(request.data.results);

            setCharacterDatabase(request.data.results)
        }
        fetchDatabase();
    }, []);


    return (
        <div>
            <h1 className="bg-dark text-success mt-4">SELECTION FILM PAR NOM</h1>

        </div>
    )
}
