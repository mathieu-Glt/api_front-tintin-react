import React from "react";
import './personnage.scss';
import { useState, useEffect } from "react";
import requests from "../../configApi/Request";
import axios from "axios";

// composant abandonné
function Perso() {
    const [persoDatabase, setPersoDatabase] = useState([]);

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

    return(
        <div className="personnage_container">
            
        </div>
 
    )




};

export default Perso;