import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from "react-toastify";
import requests from '../configApi/Request';
import { useNavigate } from 'react-router-dom';


// composant suppression boutton 
export default function DeleteMovie(props) {
    // constante qui stocke url
    const [url, setUrl] = useState('')
    // constante qui sotocke url courrante de la page
    const pathname = props.currentUrl;

    useEffect(() => {
        setUrl(pathname)
    }, [handleDeleteMovie])
    console.log(pathname);

    function handleDeleteMovie(e, url) {
        console.log(url);
        e.preventDefault();
        console.log(props.movie);
        const userStorage = localStorage.getItem("user");
        const userData = JSON.parse(userStorage);
        console.log(userData);
        console.log(userData.role);
        console.log(pathname);


        // si role admin et chemin url '/favories
        if (userData.role === 'admin' && pathname === '/favories') {
            console.log('je suis admin et sur favories');
            // je suis admin et sur la page favoris je supprime mes films en favoris
            deleteMovieFavoriesAdmin(props.movie.id);
            // je suis admin donc je peux supprimer les films sur toute l'application
        } else if (userData.role === 'admin' && pathname === '/acceuil') {
            console.log('je suis admin et sur acceuil');
            // route de suppression film sur la page acceuil
            deleteMovieAdmin(props.movie.id);
        } else {
            // sinon je suis pas admin mais user je supprime les films de ma liste de favoris
            console.log('je suis user');
            // route de suppression pour les favoris des users
            deleteMovieUser(props.movie.id);
        }
    }
    // fonction role admin suppression film de  ma liste de favoris
    async function deleteMovieFavoriesAdmin(id) {
        console.log('deleteMovieFavoriesAdmin :', id);
        try {
            await axios.delete(requests.fetchDeleteMovieFavoriesAdmin + id, {
                headers: {
                    "x-access-token": JSON.parse(localStorage.getItem('user')).token,
                }
            })
                .then((response) => {
                    console.log(response);
                    if (response.status === 200) {
                        setTimeout(() => {
                            toast.success(response.data.msg, { type: "success", theme: "colored", autoClose: 5000 });
                        }, 2000);
                        setTimeout(() => {
                            if (props.onSuccess) {
                                props.onSuccess()
                            }
                        }, 3000)
                    } else {
                        toast.error(response.data.msg, { type: "error", theme: "colored", autoClose: 5000 });

                    }

                })
                .catch(error => { toast.error(error.message, { type: "info", theme: "colored", autoClose: 5000 }); });


        } catch (err) {
            console.log(err.message);
        }
    }
    // fonction role admin suppression film sur toute l'application
    async function deleteMovieAdmin(id) {
        console.log('deleteMovieAdmin :', id);
        try {
            await axios.delete(requests.fetchDeleteMovie + id, {
                headers: {
                    "x-access-token": JSON.parse(localStorage.getItem('user')).token,
                }
            })
                .then((response) => {
                    console.log(response);
                    if (response.status === 200) {
                        setTimeout(() => {
                            toast.success(response.data.msg, { type: "success", theme: "colored", autoClose: 5000 });
                        }, 2000);
                        setTimeout(() => {
                            // navigate('/');
                            if (props.onSuccess) {
                                props.onSuccess()
                            }
                        }, 5000)
                    } else {
                        toast.error(response.data.msg, { type: "error", theme: "colored", autoClose: 5000 });

                    }

                })
                .catch(error => { toast.error(error.message, { type: "info", theme: "colored", autoClose: 5000 }); });


        } catch (err) {
            console.log(err.message);
        }


    }

    // fonction role user suppression film liste favoris de l'utilisateur uniquement
    async function deleteMovieUser(id) {
        console.log('deleteMovieUser :', id);
        try {
            await axios.delete(requests.fetchDeleteFavoriesUser + id, {
                headers: {
                    "x-access-token": JSON.parse(localStorage.getItem('user')).token,
                }
            })
                .then((response) => {
                    console.log(response);
                    if (response.status === 200) {
                        setTimeout(() => {
                            toast.success(response.data.msg, { type: "success", theme: "colored", autoClose: 5000 });
                        }, 2000);
                        setTimeout(() => {
                            // navigate('/');
                            if (props.onSuccess) {
                                props.onSuccess()
                            }
                        }, 5000)
                    } else {
                        toast.error(response.data.msg, { type: "error", theme: "colored", autoClose: 5000 });

                    }

                })
                .catch(error => { toast.error(error.message, { type: "info", theme: "colored", autoClose: 5000 }); });


        } catch (err) {
            console.log(err.message);
        }


    }

    return (
        <div>
            <button type="button" onClick={handleDeleteMovie} className="banner_button btn-sm bg-danger">
                Supprimer
            </button>
        </div>
    )
}
