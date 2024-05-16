import FavoriteIconEmpty from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIconFilled from '@mui/icons-material/Favorite';
import { toast } from "react-toastify";
import requests from '../../configApi/Request';
import axios from 'axios';

// composant pour afficher film ajouté en favoris ou non
export default function FavoriteHeart(props) {
    console.log("🚀 ~ FavoriteHeart ~ props:", props)
    // si props.movie.favorite (film present dans mes favoris) existe affiche moi le coeur rempli sinon vide
    const Component = props.movie.favorite ? FavoriteIconFilled : FavoriteIconEmpty;
    console.log("props.movie.favorite : ", props.movie.favorite);
    
    // fonction pour lancer l'affichage des films en favoris si utilisateur connecté
    function handleClick(e, movieId) {
        e.preventDefault();
        console.log("🚀 ~ handleClick ~ movieId:", movieId)

        // récupération des informations de l'utilisateur dans le storage si elles sont présentes
        const userStorage = localStorage.getItem("user");
        const userData = JSON.parse(userStorage);
        // postDatabase();
        // si l'utilisateur est connecté lance la fonction postDatabase
        if (userData) {
            postDatabase(movieId)
            // si user connecté
            // requête POST pour film en favori dans la base de donnée

        } else {
            // si utilisateur pas connecté notification ci-dessous
            toast.success("Vous devez créer un compte pour enregistrer le film en favori", { type: "info", theme: "colored", autoClose: 5000 });

        }
    }
    // fonction pour ajouter un  film dans sa liste de favoris
    async function postDatabase(id) {
        console.log("🚀 ~ postDatabase ~ id:", id)
        //envoie de l'objet movie dans la requête 
        const movie = {
            id: id,
            movieTitle: props.movie.title
        }
        console.log("🚀 ~ postDatabase ~ movie:", movie)
        try {
            // si le film ne figure pas déja dans la liste lance la requête pour l'ajouter
            if (!props.movie.favorite) {
                await axios.post(requests.fetchAddMovieFavories, movie, {
                    headers: {
                        "x-access-token": JSON.parse(localStorage.getItem('user')).token,
                    }
                })
                    .then((response) => {
                        console.log(response);
                        if (response.OK) {
                            setTimeout(() => {
                                toast.success(response.data.msg, { type: "warning", theme: "colored", autoClose: 5000 });
                            }, 3000);

                        }

                    })
                    .catch(error => { console.log(error) });

            }

        } catch (err) {
            console.log(err.message);
        }
    }


    return (

        <a onClick={(e) => handleClick(e, props.movie.id)} className="link-favourite" href="#">
            <Component style={{ color: "red", width: "40px", height: "40px" }} />
        </a>

    )
}
