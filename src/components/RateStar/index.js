import React, { useEffect, useState } from 'react';
import './ratestar.css';
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from 'axios';
import requests from '../../configApi/Request';
import { useNavigate } from 'react-router';
import StarRateIcon from '@mui/icons-material/StarRate';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';

// composant des notes de chaque film
function RateStar(props) {
    console.log("🚀 ~ RateStar ~ props:", props.movie)
    // const Component = props.movie.rating ? FavoriteIconFilled : FavoriteIconEmpty;

    // console.log(props.movie.rating);
    const stars = Array(5).fill(0);

    console.log(stars);
    // constante qui prends la valeur du clique sur l'etoile
    const [currentValue, setCurrentValue] = useState(0);
    
    // constante qui prends la valeur au survole sur l'etoile
    const [hoverValue, setHoverValue] = useState(undefined);



    // fonction qui au clique sur l'etoile récupère les infos de l'utilisateur
    // si il est connécté on lance la requête pour envoyer sa note du film dans sa liste favoris
    function handleClick(value) {
        console.log("🚀 ~ handleClick ~ value:", value)
        const rate = value;
        setCurrentValue(value)
        const userStorage = localStorage.getItem("user");
        // console.log(userStorage);
        const userData = JSON.parse(userStorage);
        // si user pas connecté
        if (!userData) {
            return toast.success("Vous devez vous connecter ou vous enregistrer", { type: "error", theme: "colored", autoClose: 5000 });

        } else if (userData) {
            // sinon si user existe déclenchement de la fonction pour lancer la requête pour enregistrer la note de l'utilisateur
            console.log(`Je suis ${userData.role}`);
            addRateMovie(value)
            setTimeout(() => {
                toast.success("Thank you Your rate is registered", { type: "info", theme: "colored", autoClose: 5000 });
            }, 2000);
        }
        // fonction pour sauvegarder la note du film dans la liste de favoris de l'utilisateur 
        async function addRateMovie(value) {
            console.log('addRateMovie');
            console.log('value :', value);
            console.log('film :', props.movie);
            const rate = value;
            const movieId = props.movie.id;
            // console.log('note :', rate); 
            console.log('film movieID:', movieId);
console.log("localStorage.getItem('user')).token : ", JSON.parse(localStorage.getItem('user')).token);
            const datas = {
                rate,
                movieId
            }
            console.log("🚀 ~ addRateMovie ~ datas:", datas)
            try {
                axios.patch(requests.fetchMovieRate, datas, {
                    headers: {
                        "x-access-token": JSON.parse(localStorage.getItem('user')).token,
                    }
                })
                    .then((response) => {
                        console.log(response);
                        if (response.status === 200) {
                            setTimeout(() => {
                                toast.success(response.data.msg, { type: "warning", theme: "colored", autoClose: 5000 });
                            }, 3000);
                        }

                    })
                    .catch(error => { console.log(error) });

            } catch (err) {
                console.log(err.message);
            }
        }
    }

    const handleMouseOver = value => {
        setHoverValue(value)
    };

    const handleMouseLeave = value => {
        setHoverValue(undefined)
    };

    const colors = {
        orange: "#FFC433",
        grey: "#CAC9C6"
    }

    const styles = {
        container: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        }
    }

    console.log(currentValue);

    return (
        <div style={styles.container}>
            <h2> Rate movie </h2>
            <div style={styles.stars}>
                {stars.map((_, index) => {
                    return (
                        <FaStar
                            key={index}
                            size={28}
                            style={{
                                marginRight: 10,
                                cursor: "pointer"
                            }}
                            color={(hoverValue || currentValue || props.movie.rating) > index ? colors.orange : colors.grey}
                            onClick={() => handleClick(index + 1)}
                            onMouseOver={() => handleMouseOver(index + 1)}
                            onMouseLeave={handleMouseLeave}
                        />
                    )
                })}
            </div>
        </div>
    );
};

export default RateStar;