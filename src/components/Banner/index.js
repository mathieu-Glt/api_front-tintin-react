import React from "react";
import "./Banner.scss";
import { useState, useEffect } from "react";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import requests from "../../configApi/Request";
import axios from "axios";

// composant pas terminer (pour afficher des films d'une api externe "themoviedb")
function Banner() {


    const [movieApi, setMovieApi] = useState();

    // useEffect(() => {
    //     async function fetchDataApi() {
    //         // const request = await axios.get(requests.fetchAllTintinApi);
            
    //         //console.log(request);
    //         //console.log(request.data.results)

    //         setMovieApi(
    //             request.data.results[
    //             Math.floor(Math.random() * request.data.results.length - 1)
    //             ]

    //         );
    //     }
    //     fetchDataApi();
    // }, []);

    //console.log(movieApi);




    return (
        <div className="banner">
            <h1 className="banner__title">
                {movieApi && movieApi.title}
            </h1>

            <div className="banner__content d-flex flex-row  w-100 ms-1">
                <div className="image w-40 ms-1">
                    {movieApi && <img className="image_api" alt="image_poster_film" src={requests.base_url_img + movieApi.poster_path} />}
                </div>
                <div>
                <p className="banner__paragraphe w-60">
                    {movieApi && movieApi.overview}
                    {movieApi && movieApi.release_date}
                </p>

                </div>

                <div className="banner__buttons ms-1">
                    <button className="banner_button">
                        <PlayCircleIcon />Lecture</button>
                    <button className="banner_button">
                        <HelpOutlineIcon />PLus d'infos</button>

                </div>
            </div>
        </div>
    )
}

export default Banner;