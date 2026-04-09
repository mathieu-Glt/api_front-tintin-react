import React from "react";
import "./acceuil.css";
import "../FavorieListMovie/keyframes-favories.css";
import { useState, useEffect } from "react";
import axios from "axios";
import requests from "../../configApi/Request";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import RateStar from "../RateStar";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player/lazy";
import { HashLink } from "react-router-hash-link";
import FavoriteHeart from "../FavoriteHeart/FavoriteHeart";
import DeleteMovie from "../../pages/DeleteMovie";

function Acceuil(props) {
  const currentUrl = window.location.pathname;

  const [movieDatabase, setMovieDatabase] = useState([]);
  const [movieDatabaseNotUser, setMovieDatabaseNotUser] = useState([]);
  const [playMovie, setPlayMovie] = useState(null);
  const [admin, setAdmin] = useState(false);
  const [closeMovie, setCloseMovie] = useState(true);

  // ── nouveaux états ──
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function handleClickMovie(e, url) {
    e.preventDefault();
    setPlayMovie(url);
  }

  function handleClickMovieClose(e) {
    e.preventDefault();
    setCloseMovie(false);
    setPlayMovie(null);
  }

  useEffect(() => {
    const userStorage = localStorage.getItem("user");
    const userData = JSON.parse(userStorage);

    if (!userData) {
      fetchDatabaseNotUser();
    } else if (userData.role === "admin") {
      setAdmin(true);
      fetchDatabase();
    } else {
      setAdmin(false);
      fetchDatabase();
    }
  }, []);

  async function fetchDatabase() {
    try {
      setLoading(true);
      setError(null);
      const request = await axios.get(requests.fetchAllTintinDatabase, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`,
        },
      });
      setMovieDatabase(request.data.results[0]);
    } catch (err) {
      console.error("Erreur fetchDatabase :", err);
      setError(
        "Impossible de charger les films. Le serveur est peut-être en cours de démarrage, réessaie dans quelques secondes.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function fetchDatabaseNotUser() {
    try {
      setLoading(true);
      setError(null);
      const request = await axios.get(requests.fetchAllTintinDatabaseNotUser);
      setMovieDatabaseNotUser(request.data.results[0] || request.data.results);
    } catch (err) {
      console.error("Erreur fetchDatabaseNotUser :", err);
      setError(
        "Impossible de charger les films. Le serveur est peut-être en cours de démarrage, réessaie dans quelques secondes.",
      );
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="loading-container">
        <p>⏳ Chargement des films en cours...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>❌ {error}</p>
        <button
          onClick={() => {
            const userData = JSON.parse(localStorage.getItem("user"));
            userData ? fetchDatabase() : fetchDatabaseNotUser();
          }}
        >
          Réessayer
        </button>
      </div>
    );
  }

  const films = movieDatabase.length > 0 ? movieDatabase : movieDatabaseNotUser;

  return (
    <div>
      <HashLink className="bas_de_page" smooth to="#tintin-bas">
        👎 Bas de page 👎
      </HashLink>
      <h1 className="title_acceuil">TOUS LES FILMS TINTIN</h1>
      <section className="card_movie_section">
        <section id="tintin-haut"></section>

        {films.map((movie, index) => (
          <div className="movie_container_favories" key={index}>
            {movieDatabase.length > 0 && <FavoriteHeart movie={movie} />}

            {movieDatabase.length > 0 && (
              <div className="star">
                <RateStar movie={movie} />
              </div>
            )}

            <div className="image_acceuil">
              <div className="movie_acceuil">
                <img
                  className="image_database_favoris"
                  alt="poster_film_tintin"
                  src={
                    movie.picture
                      ? process.env.PUBLIC_URL + "/tintin/" + movie.picture
                      : process.env.PUBLIC_URL + "/tintin/placeholder.jpg"
                  }
                />
              </div>
            </div>

            <p className="movies__synopsis_acceuil">
              {movie.synopsis?.substring(0, 300)}...
            </p>

            <div type="button" className="movies_buttons_acceuil">
              <button
                className="card_button_acceuil_lecture"
                type="button"
                onClick={(e) => handleClickMovie(e, movie.movie)}
              >
                <PlayCircleIcon />
                <HashLink className="lecture" smooth to="#movie-tintin">
                  Lecture
                </HashLink>
              </button>

              <Link to={`/movies/${movie.slug}`}>
                <button className="card_button_acceuil_details">
                  Voir les détails
                </button>
              </Link>

              {admin && (
                <Link to={`/editmovie/${movie.id}`}>
                  <button type="button" className="card_button_acceuil_edit">
                    Editer le film
                  </button>
                </Link>
              )}

              {admin && (
                <DeleteMovie
                  currentUrl={currentUrl}
                  movie={movie}
                  onSuccess={fetchDatabase}
                />
              )}
            </div>
          </div>
        ))}

        <section id="tintin-bas"></section>
      </section>

      <HashLink className="hauts_de_page" smooth to="#tintin-haut">
        👍 Hauts de page 👍
      </HashLink>

      {admin && (
        <Link to="/addmovie">
          <button type="button" className="button-add-movie">
            Ajouter un film
          </button>
        </Link>
      )}

      <section id="movie-tintin"></section>

      {playMovie && (
        <div className="video-container">
          <button className="close-video" onClick={handleClickMovieClose}>
            x
          </button>
          <h2>Bon visionnage</h2>
          <div className="video-player">
            <ReactPlayer url={playMovie} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Acceuil;
