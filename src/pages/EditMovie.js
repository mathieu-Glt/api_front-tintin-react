import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import requests from "../configApi/Request";
import axios from "axios";

// composant pour editer un film
export default function EditMovie(props) {
  const navigate = useNavigate();
  const params = useParams();

  const arrayMovies = props.props.datas;
  // console.log(arrayMovies);
  arrayMovies.map((movie, index) => {
    if (movie.id === params.id) {
      return console.log(movie.id);
    }
  });

  const id = params.id;
  // console.log(arrayMovies[id]);

  const [movieId, setMovieId] = useState(id);
  const [title, setTitle] = useState("");
  const [picture, setPicture] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [movie, setMovie] = useState("");
  const [rating, setRating] = useState("");
  const [slug, setSlug] = useState("");
  const [redirect, setRedirect] = useState(false);

  function handleChangeTitle(e) {
    setTitle(e.target.value);
  }

  function handleChangePicture(e) {
    setPicture(e.currentTarget.files[0]);
  }

  function handleChangeMovie(e) {
    setMovie(e.target.value);
  }

  function handleChangeSynopsis(e) {
    setSynopsis(e.target.value);
  }

  function handleChangeRating(e) {
    setRating(e.target.value);
  }

  function handleChangeSlug(e) {
    setSlug(e.target.value);
  }

  function handleSubmitForm(e) {
    if (picture === null) {
      let body = {
        title,
        picture: "tintin.jpg",
        synopsis,
        movie,
        rating,
        slug,
      };
      postEditMovie(body);
    } else {
      let formData = new FormData();
      formData.append("image", picture);
      if (!formData) {
        return;
      } else {
        // enregistrement de la photo
        try {
          axios({
            method: "post",
            url: requests.fetchUploadPicture,
            data: formData,
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`,
            },
          })
            .then((response) => {
              if (response.ok) {
                let body = {
                  title,
                  picture: response.data.url,
                  synopsis,
                  movie,
                  rating,
                  slug,
                };
                postEditMovie(body);
              }
            })
            .catch((err) => console.log(err.message));
        } catch (error) {
          throw new Error(error.message);
        }
      }
    }

    async function postEditMovie(body) {
      try {
        const request = await axios
          .put(requests.fetchEditMovie + movieId, body, {
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`,
            },
          })
          .then((response) => {
            if (response.status === 200) {
              setTimeout(() => {
                toast.success(response.data.msg, {
                  type: "success",
                  theme: "colored",
                  autoClose: 5000,
                });
              }, 3000);
              setTimeout(() => {
                navigate("/acceuil");
              }, 5000);
            }
          })
          .catch((error) => {
            throw new Error(error.message);
          });
      } catch (err) {
        throw new Error(err.message);
      }
    }
  }

  return (
    <div>
      <Link to="/acceuil">
        <button>Retour Acceuil</button>
      </Link>

      <h1 className="bg-success text-dark">Formulaire pour éditer un film</h1>

      <form className="form">
        <label htmlFor="titleMovie" style={{ color: "black" }}>
          <strong>Titre film :</strong>
        </label>
        <input
          type="text"
          value={title}
          id="titleMovie"
          name="titleMovie"
          onChange={handleChangeTitle}
          required
        />

        <label htmlFor="nomPicture" style={{ color: "black" }}>
          <strong>Nomination image :</strong>
        </label>
        <input
          type="file"
          id="nomPicture"
          name="nomPicture"
          onChange={handleChangePicture}
          required
        />

        <label htmlFor="rateMovie" style={{ color: "black" }}>
          <strong>Note film :</strong>
        </label>
        <input
          type="number"
          value={rating}
          id="rateMovie"
          name="rateMovie"
          onChange={handleChangeRating}
          required
        />

        <label htmlFor="slugMovie" style={{ color: "black" }}>
          <strong>Film slug :</strong>
        </label>
        <input
          type="text"
          value={slug}
          id="slugMovie"
          name="slugMovie"
          onChange={handleChangeSlug}
          required
        />

        <label htmlFor="urlMovie" style={{ color: "black" }}>
          <strong>Url Film :</strong>
        </label>
        <input
          type="text"
          value={movie}
          id="urlMovie"
          name="urlMovie"
          onChange={handleChangeMovie}
          required
        />

        <label htmlFor="synopsisMovie" style={{ color: "black" }}>
          <strong>Synopsis Film :</strong>
        </label>
        <textarea
          id="synopsisMovie"
          name="synopsisMovie"
          value={synopsis}
          onChange={handleChangeSynopsis}
          rows="5"
          cols="33"
        >
          Your synopsis...
        </textarea>
        <button
          className="submit-form"
          onClick={(e) => handleSubmitForm(movieId)}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
