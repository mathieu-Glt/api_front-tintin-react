import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import requests from "../../configApi/Request";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RateStar from "../RateStar";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import "./movieById.css";
import ReactCalendar from "../calendar/calendar";

export default function MovieById() {
  const params = useParams();
  const id = params.id;

  // objet unique au lieu d'un tableau
  const [movie, setMovie] = useState(null);
  const [admin, setAdmin] = useState(false);
  const [calendrier, setCalendrier] = useState(false);
  const [loading, setLoading] = useState(true);

  // affichage/masquage du calendrier
  function displayCalendar(e) {
    e.preventDefault();
    setCalendrier(!calendrier);
  }

  // récupération du film par id ou par slug
  useEffect(() => {
    async function fetchDatabase() {
      try {
        const fetchPath = !isNaN(Number(id))
          ? requests.fetchMovieById + id
          : requests.fetchMovieBySlug + id;

        const request = await axios.get(fetchPath);

        // on stocke directement l'objet film
        setMovie(request.data.results[0]);
      } catch (error) {
        throw new Error(error.message)
      } finally {
        setLoading(false);
      }
    }
    fetchDatabase();
  }, [id]);

  // vérification du rôle admin
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData) return;
    setAdmin(userData.role === "admin");
  }, []);

  // états de chargement et d'erreur
  if (loading) return <p>Chargement...</p>;
  if (!movie) return <p>Film introuvable.</p>;

  return (
    <div>
      <h1 className="title_details_film">DETAILS FILM</h1>

      <Link to="/acceuil">
        <button className="button_detials_movies">Retour Acceuil</button>
      </Link>

      <section className="card_movie">
        <div className="movie_container">
          {/* note et favoris */}
          <div className="rate">
            <FavoriteIcon movie={movie} />
            <RateStar movie={movie} />
          </div>

          {/* image et synopsis */}
          <div className="movie">
            <img
              className="image_database"
              alt="poster_film_tintin"
              src={process.env.PUBLIC_URL + "/tintin/" + movie.picture}
            />
            <p className="carousel_movies__synopsis">{movie.synopsis}</p>
          </div>

          {/* boutons */}
          <div className="movies__buttons">
            {admin && (
              <Link to={`/editmovie/${movie.id}`}>
                <button className="banner_button">Editer</button>
              </Link>
            )}
            {admin && (
              <button type="button" className="banner_button">
                Supprimer
              </button>
            )}
            <button
              className="card_button_acceuil_lecture"
              onClick={displayCalendar}
            >
              Calendar
            </button>
          </div>

          {/* calendrier */}
          {calendrier && <ReactCalendar movie={movie} />}
        </div>
      </section>
    </div>
  );
}
