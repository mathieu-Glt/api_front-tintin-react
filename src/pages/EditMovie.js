import React from 'react';
import { useState } from "react"
import { toast } from "react-toastify";
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import requests from '../configApi/Request';
import axios from 'axios';


// composant pour editer un film
export default function EditMovie(props) {
    const navigate = useNavigate();
    const params = useParams();

    console.log(props);
    const arrayMovies = props.props.datas;
    // console.log(arrayMovies);
    arrayMovies.map((movie, index) => {
        console.log(params.id);
        console.log(movie.id);
        if (movie.id === params.id) {
            return console.log(movie.id);
        }
    })


    const id = params.id;
    // console.log(arrayMovies[id]);



    const [movieId, setMovieId] = useState(id);
    const [title, setTitle] = useState('');
    const [picture, setPicture] = useState('');
    const [synopsis, setSynopsis] = useState('');
    const [movie, setMovie] = useState('');
    const [rating, setRating] = useState('');
    const [slug, setSlug] = useState('');
    const [redirect, setRedirect] = useState(false)



    function handleChangeTitle(e) {
        console.log(e.target.value);
        setTitle(e.target.value)
    }

    function handleChangePicture(e) {
        console.log(e.currentTarget.files[0]);
        setPicture(e.currentTarget.files[0]);
    }

    function handleChangeMovie(e) {
        console.log(e.target.value);
        setMovie(e.target.value)
    }

    function handleChangeSynopsis(e) {
        console.log(e.target.value);
        setSynopsis(e.target.value)
    }

    function handleChangeRating(e) {
        console.log(e.target.value);
        setRating(e.target.value)
    }

    function handleChangeSlug(e) {
        console.log(e.target.value);
        setSlug(e.target.value)
    }


    function handleSubmitForm(e) {
        console.log('submit Form');
        console.log(' id :', id);
        console.log(picture);
        if (picture === null) {
            console.log('pas image');
            let body = {
                title,
                picture: 'tintin.jpg',
                synopsis,
                movie,
                rating,
                slug
            }
            console.log(body);
            postEditMovie(body)
        } else {
            console.log('image');

            let formData = new FormData();
            formData.append('image', picture);
            console.log(formData.image);
            if (!formData) {
                console.log('pas de formData');
                return
            } else {
                console.log('formData PRESENT');
                // enregistrement de la photo
                try {
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
                            console.log('requete axios post image');
                            console.log(response)
                            console.log(response.ok);
                            if (response.ok) {
                                console.log('super coool !!');
                                let body = {
                                    title,
                                    picture: response.data.url,
                                    synopsis,
                                    movie,
                                    rating,
                                    slug
                                }
                                console.log(body);
                                postEditMovie(body)
                            }
                        })
                        .catch(err => console.log(err.message))
                } catch (error) {
                    console.log(error.message);
                }

            }



        }

        async function postEditMovie(body) {
            console.log(' prêt pour editer');
            console.log({ id });
            console.log(body);
            try {
                const request = await axios.put(requests.fetchEditMovie + movieId, body, {
                    headers: {
                        "x-access-token": JSON.parse(localStorage.getItem('user')).token,
                    }

                })
                    .then((response) => {
                        console.log(response);
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


            <h1 className="bg-success text-dark">
                Formulaire pour éditer un film
            </h1>


            <form className="form">
                <label htmlFor="titleMovie" style={{ color: "black" }}><strong>Titre film :</strong></label>
                <input type='text' value={title} id="titleMovie" name="titleMovie" onChange={handleChangeTitle} required />

                <label htmlFor="nomPicture" style={{ color: "black" }}><strong>Nomination image :</strong></label>
                <input type='file' id="nomPicture" name="nomPicture" onChange={handleChangePicture} required />

                <label htmlFor="rateMovie" style={{ color: "black" }}><strong>Note film :</strong></label>
                <input type='number' value={rating} id="rateMovie" name="rateMovie" onChange={handleChangeRating} required />

                <label htmlFor="slugMovie" style={{ color: "black" }}><strong>Film slug :</strong></label>
                <input type='text' value={slug} id="slugMovie" name="slugMovie" onChange={handleChangeSlug} required />

                <label htmlFor="urlMovie" style={{ color: "black" }}><strong>Url Film :</strong></label>
                <input type='text' value={movie} id="urlMovie" name="urlMovie" onChange={handleChangeMovie} required />

                <label htmlFor="synopsisMovie" style={{ color: "black" }}><strong>Synopsis Film :</strong></label>
                <textarea id="synopsisMovie" name="synopsisMovie" value={synopsis} onChange={handleChangeSynopsis}
                    rows="5" cols="33">
                    Your synopsis...
                </textarea>
                <button className="submit-form" onClick={(e) => handleSubmitForm(movieId)}>Submit</button>
            </form>




        </div>
    )
}
