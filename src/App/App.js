import './App.scss';
import Nav from '../components/Nav/index';
import Footer from '../components/Footer/index';
import PictureLogo from '../components/Picture/PictureLogo';
import Banner from '../components/Banner/index';
import Acceuil from '../components/Acceuil/index';
// import Favories from '../components/FavorieListMovie/index';
import Series from '../components/Series/index';
import Tintin from '../components/Tintin/index';
import Herge from '../components/Herge/index';
import Header from '../components/Header/index';
// import MovieSearch from '../components/MovieSearch/moviedb';
import MovieById from '../components/MovieById/index';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  BrowserRouter as Router,
  Switch,
  Routes,
  Route,
  Redirect,
  useParams,
} from "react-router-dom"
import RateStar from '../components/RateStar';
import TopRated from '../components/TopRated';
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import RequireDataAuth from '../helperForm/form-validator';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Register from '../pages/Register';
import Login from '../pages/Login';
import { useEffect, useState } from 'react';
import requests from "../configApi/Request";
import MovieByName from '../components/MovieByName';
import CharacterById from '../components/CharacterById';
import CharacterByName from '../components/CharacterByName';
import Home from '../components/Home/home';
import FavoriesList from '../components/FavorieListMovie/index';
import Error404 from '../components/PageNotFound/error404';
import ReactPlayer from "react-player/lazy";
import { HashLink } from 'react-router-hash-link';
import MovieAdd from '../pages/MovieAdd';
import CharacterAdd from '../pages/CharacterAdd';
import DeleteMovie from '../pages/DeleteMovie';
import EditMovie from '../pages/EditMovie';
import FavoriteHeart from '../components/FavoriteHeart/FavoriteHeart';
import Basket from '../components/Basket/basket';
import store from '../store';
import { Provider, useSelector } from "react-redux";


function App() {

  // récupération de la valeur du champs input barre de recherche
  const [inputValue, setInputValue] = useState("");

  // booleen pour la gestion de l'affichage du résultat de la barre de recherche
  const [toggleSearch, setToggleSearch] = useState(false);

  // tableau qui recoit la reponse de la fonction handleForm
  const [data, setData] = useState([]);

  // pas sûre d'être conservé
  const [dataMovie, setDataMovie] = useState([]);

  // pas sûre d'être conservé
  const [movieTitle, setMovieTitle] = useState("");

  // récupératoin de la valeur entrer dans la barre de recherche pour l'afficher dans la vue
  const [search, setSearch] = useState('');

  // booleen qui contrôle l'affichage de la video
  const [playMovie, setPlayMovie] = useState(null);

  // booleen qui contrôle l'affichage de la recherche tapé la barre de recherche
  const [closeSearch, setCloseSearch] = useState(true);

  // tableau qui recoit la reponse du hook useEffect de la fonction fetchAllCharacters pour récupérer tous les personnages de l'api
  const [character, setCharacter] = useState([])

  // conserver à titre provisoire (gestion du state globale)
  const [todos, setTodos] = useState([]);

  // fonction pour lancer l'affichage de la fenêtre du film
  function handleClickMovie(e, url) {
    console.log(url);
    e.preventDefault();
    setPlayMovie(url);
  }
  // fonction pour fermer l'affichage de la fenêtre du film
  function handleClickMovieClose(e) {
    e.preventDefault();
    setPlayMovie(null);
  }
  // fonction pour fermer l'affichage de la recherche
  function handleClickSearchClose(e) {
    e.preventDefault();
    setCloseSearch(!closeSearch);
  }

  // fonction pour ajouter une carte au panier à l'aide de redux
  function addBasket(item) {
    // console.log(item);
    try {
      store.dispatch({
        type: 'ADD_TODO',
        payload: item
      })
      store.dispatch({
        type: 'SUCCESS',
        payload: 'Request successfull'
      })


    } catch (error) {
      store.dispatch({
        type: 'ERROR',
        payload: 'Bad request'
      })

    }

  }
  // içi récupération des datas du state management de redux
  const displaySuccess = useSelector((state) => state.ErrorReducer)
  console.log(displaySuccess);

  // condition pour renvoyer la bonne notification à l'utilisateur lors de l'ajout de la carte personnage au panier
  if (displaySuccess[1] === 'Request successfully') {
    setTimeout(() => {
      toast.success(displaySuccess[1], { type: "info", theme: "colored", autoClose: 5000 });

    }, 2000);

  }
  if (displaySuccess[1] === 'Bad request') {
    setTimeout(() => {
      toast.success(displaySuccess[1], { type: "danger", theme: "colored", autoClose: 5000 });

    }, 2000);

  }


  // içi connexion au store de redux
  useEffect(() => {
    store.subscribe(() => syncStore())

  }, []);

  // récupération des datas du store
  const syncStore = () => {
    setTodos(store.getState());
    console.log(store.getState());
  };



  // hook pour récupérer tous les personnages de Tintin stocké en bdd à l'aide d'une requête axios
  useEffect(() => {
    async function fetchAllCharacters() {
      await axios.get(requests.fetchAllCharactersDatabase)
        .then((response) => {
          console.log(response.data.results);
          const results = response.data.results;
          console.log(results);
          setCharacter(results);
        })
        .catch(function (error) {
          console.log(error);
        })
    }
    fetchAllCharacters();

  }, [])

  // récupération de la valeur du champs input de la barre de recherche dans le composant Nav
  const handleInput = (e) => {
    setInputValue(e.target.value);
    //console.log(inputValue);


  };

  // fonction qui soumet le formulaire de la barre de recherche dans le composant Nav au clique sur la validation
  const handleForm = (e, searchValue) => {
    e.preventDefault();
    axios.get(requests.fetchMovieBySearch + searchValue)

      .then((response) => {
        const data = response.data.results
        // console.log(data.length);
        setToggleSearch(false)
        setTimeout(() => {
          setData(data)
          setToggleSearch(true)
        }, 500)
      })
      .catch(function (error) {
        console.log(error);
      });

    setSearch(searchValue);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }


  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />
      <Router>

        {/* navbar */}
        {/*composant Nav ou se trouve le menu de navigation */}
        <Nav
          movieStorage={movieTitle}
          handleInput={handleInput}
          data={inputValue}
          handleForm={handleForm}
          todos={todos}
        />

        {/*Logo du site  */}
        <PictureLogo />


        {/*composant Header ou se trouve l'entête */}
        {/*transmission des props liés à la recherche tapé dans la barre de recherche se trouvant dans la fonction de soumission du formulaire barre de recherche */}
        <Header
          data={data}
        />


        <section id="search-haut"></section>

        {/*si une recherche dans la barre est faite alors l'affichage du résultat s'affiche */}
        {closeSearch ?
          <div className='d-flex flex-row flex-wrap'>

            <h1 className={`${toggleSearch ? 'title' : 'title-transparent'}`}>Résutat de la recherche pour : "{search}"
              <button className="close-video" onClick={handleClickSearchClose}>x</button>
            </h1>
            {/* affichage du résulat de la barre de recherche */}
            {data.map((movie, index) => (
              <div className='card-movie-search d-flex flex-row flex-wrap justify-content-center p-1 pt-2'>
                <div className={`${toggleSearch ? 'movie_container_search' : 'movie_container_search-transparent mb-4'}`}>

                  <div className='content-card p-4 card text-bg-dark mb-3 mt-3 col-sm-5 m-auto ' key={index}>
                    <FavoriteHeart
                      movie={movie}
                    />

                    <div className="d-flex flex-row pb-2 justify-content-center mb-2">
                      <RateStar
                        movie={movie}
                      />
                    </div>

                    <div className='d-flex flex-row pb-2 justify-content-center mb-2'>
                      <p className='movies__synopsis card-text pt-4 text-warning display-6'>{movie.title}</p>
                    </div>
                    <div className="movie" >
                      <img className="image_database_search" alt="image_film_tintin" src={process.env.PUBLIC_URL + '/tintin/' + movie.picture} />
                    </div>
                    <p className="movies__synopsis_search card-text pt-4">
                      {movie.synopsis}
                    </p>
                    <button type="button" onClick={(e) => handleClickMovie(e, movie.movie)} className="banner_button btn-sm">
                      <PlayCircleIcon /><HashLink className="text-dark" smooth to='#movie-tintin'>Lecture</HashLink>
                    </button>

                  </div>
                </div>
              </div>
            ))}

          </div> : null}

        {/* <Basket /> */}
        {/* ici les différents lien dirigeant sur les pages du site */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/acceuil" element={<Acceuil />} />
          <Route path="/favories" element={<FavoriesList />} />
          <Route path="/characters" element={<Series data={character} handleAddBasket={addBasket} todos={todos} />} />
          <Route path="/basket" element={<Basket todos={todos} data={character} />} />
          <Route path="/tintin" element={<Tintin />} />
          <Route path="/herge" element={<Herge />} />
          <Route path="/toprated" element={<TopRated />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/movies/:id" element={<MovieById />} />
          <Route path="/characters/:id" element={<CharacterById />} />
          <Route path={`/characters/:name`} element={<CharacterByName />} />
          <Route path={`/movies/:name`} element={<MovieByName />} />
          <Route path={`/addmovie`} element={<MovieAdd />} />
          <Route path={`/editmovie/:id`} element={<EditMovie props={{ datas: dataMovie }} />} />
          <Route path={`/addcharacter`} element={<CharacterAdd />} />
          {/* <Route path="/movies/delete/:id" element={<DeleteMovie />} /> */}
          <Route path='*' element={<Error404 />} />
        </Routes>

        <div className='banner'>
          {/* banner */}
          <Banner />
        </div>
        {/* video */}

        {/* affichage de la fenêtre de la video */}
        <section id="movie-tintin"></section>
        {playMovie ?
          <div className="video-container">
            <button className="close-video" onClick={handleClickMovieClose}>x</button>
            <h1>Bon visionnage</h1>
            <div className="video-player">
              <ReactPlayer url={playMovie} />
            </div>
          </div>
          : null}


        {/* footer */}
        <Footer />
      </Router>
    </div>
  );
}

export default App;
