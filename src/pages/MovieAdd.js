import React from 'react';
import { useState } from "react"
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import requests from '../configApi/Request';
import axios from 'axios';

// composant pour ajouter un film
export default function MovieAdd() {
    const navigate = useNavigate();

    // constante qui stock champs titre formulaire
    const [title, setTitle] = useState('');

    // constante qui stock champs picture formulaire
    const [picture, setPicture] = useState(null);

    // constante qui stock champs synopsis formulaire
    const [synopsis, setSynopsis] = useState('');

    // constante qui stock champs movie formulaire
    const [movie, setMovie] = useState('');

    // constante qui stock champs note du film formulaire
    const [rating, setRating] = useState('');

    // constante qui stock champs slug du film formulaire
    const [slug, setSlug] = useState('');


    // fonction qui se déclanche au changement d'état de input title
    function handleChangeTitle(e) {
        console.log(e.target.value);
        setTitle(e.target.value)
    }

    // fonction qui se déclanche au changement d'état de input picture
    function handleChangePicture(e) {
        console.log(e.currentTarget.files[0]);
        setPicture(e.currentTarget.files[0]);
    }

    // fonction qui se déclanche au changement d'état de input movie
    function handleChangeMovie(e) {
        console.log(e.target.value);
        setMovie(e.target.value)
    }

    // fonction qui se déclanche au changement d'état de input synopsis
    function handleChangeSynopsis(e) {
        console.log(e.target.value);
        setSynopsis(e.target.value)
    }

    // fonction qui se déclanche au changement d'état de input rating
    function handleChangeRating(e) {
        console.log(e.target.value);
        setRating(e.target.value)
    }

    // fonction qui se déclanche au changement d'état de input slug
    function handleChangeSlug(e) {
        console.log(e.target.value);
        setSlug(e.target.value)
    }

    // fonction qui se déclenche à la soumission du formulaire
    function handleSubmitForm(e) {
        e.preventDefault();
        console.log({ picture });
        // object classe pour ajouter image
        let formData = new FormData();
        formData.append('image', picture);
        console.log(formData);

        // enregistrement de la photo en requête POST
        axios({
            method: "post",
            url: requests.fetchUploadPicture,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                "x-access-token": JSON.parse(localStorage.getItem('user')).token
            }
        })
            .then((response) => {
                console.log(response)
                if (response.data.status === 200) {

                    postAddMovie(response.data.url)
                }
            })
            .catch(err => console.log(err))



        // fonction pour ajouter un nouveau film en requête POST
        async function postAddMovie(pictureUrl) {
            let body = {
                title,
                picture: pictureUrl,
                synopsis,
                movie,
                rating,
                slug
            }
            console.log(body);
            try {
                const request = await axios.post(requests.fetchAddMovie, body, {
                    headers: {
                        "x-access-token": JSON.parse(localStorage.getItem('user')).token,
                    }

                })
                    .then((response) => {
                        // console.log(response);
                        if (response.status === 200) {
                            setTimeout(() => {
                                toast.success(response.data.msg, { type: "success", theme: "colored", autoClose: 5000 });
                            }, 3000);
                            setTimeout(() => {
                                navigate('/acceuil');
                            }, 5000)

                        }
                    })
                    .catch(error => { console.log(error) });


            } catch (err) {
                // console.log(err.message);
            }


        }

    }



    return (
        <div>
            <Link to="/acceuil">
                <button>Retour Acceuil</button>
            </Link>


            <h1 className="bg-info text-dark">
                Formulaire pour ajouter un film
            </h1>



            <form className="form">
                <label htmlFor="titleMovie" style={{ color: "black" }}><strong>Titre film :</strong></label>
                <input type='text' value={title} id="titleMovie" name="titleMovie" onChange={handleChangeTitle} required />

                <label htmlFor="nomMovie" style={{ color: "black" }}><strong>Nomination image :</strong></label>
                <input type='file' onChange={handleChangePicture} id="nomMovie" name="nomMovie" required />

                <label htmlFor="rateMovie" style={{ color: "black" }}><strong>Note film :</strong></label>
                <input type='number' value={rating} id="rateMovie" name="rateMovie" onChange={handleChangeRating} required />

                <label htmlFor="slugMovie" style={{ color: "black" }}><strong>Film slug :</strong></label>
                <input type='text' value={slug} id="slugMovie" name="slugMovie" onChange={handleChangeSlug} required />

                <label htmlFor="urlMovie" style={{ color: "black" }}><strong>Url Film :</strong></label>
                <input type='url' value={movie} id="urlMovie" name="urlMovie" onChange={handleChangeMovie} required />

                <label htmlFor="synopsisMovie" style={{ color: "black" }}><strong>Synopsis Film :</strong></label>
                <textarea id="synopsisMovie" name="synopsisMovie" value={synopsis} onChange={handleChangeSynopsis}
                    rows="5" cols="33">
                    Your synopsis...
                </textarea>
                <button className="submit-form" onClick={handleSubmitForm}>Submit</button>
            </form>


        </div>
    )
}
