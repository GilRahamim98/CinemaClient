import Axios from "axios";
import React from "react";
import MovieSubs from "./MovieSubs";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const SUBS_API_URL = "http://localhost:5000/api/subSubscriptionsrRouter";

function MovieChild({ movie, showAllMovies, showEditMovie }) {
  const userData = useSelector((state) => state.currentUser);
  const [allSubscriptions, setAllSubscriptions] = useState([]);
  useEffect(() => {
    return function cleanUp(){
        setAllSubscriptions([])
        // console.log(movies);
    }
}, [])

  useEffect(() => {
    async function getSubs() {
      const { data } = await Axios.get(SUBS_API_URL);
      setAllSubscriptions(data);
    }
    getSubs();
  }, []);

  const isThereIsSubsToThisMovie = () => {
    let flag = false;
    allSubscriptions.forEach((sub) =>
      sub.movies.forEach((movieObj) => {
        if (movieObj.movieId === movie._id) {
          flag = true;
        }
      })
    );
    return flag;
  };

  const deleteMovie = async () => {
    if (isThereIsSubsToThisMovie()) {
      const newSubscriptionsArr = [...allSubscriptions];
      newSubscriptionsArr.forEach((sub) =>
        sub.movies.forEach((item, index, obj) => {
          if (item.movieId === movie._id) {
            obj.splice(index, 1);
          }
        })
      );
      newSubscriptionsArr.forEach(async (sub) => {
        await Axios.put(`${SUBS_API_URL}/${sub._id}`, sub);
      });
      await Axios.delete(
        `http://localhost:5000/api/subMoviesrRouter/${movie._id}`
      );
    } else {
      await Axios.delete(
        `http://localhost:5000/api/subMoviesrRouter/${movie._id}`
      );
    }
  };

  const editMovie = () => {
    showEditMovie(movie);
    showAllMovies();
  };

  return (
    <div className="movieChild">
      <h1>
        {movie.name}
        {","}
        {movie.premiered.slice(0, 4)}
      </h1>
      <p>Geners: {String(movie.genres)}</p>
      <div className="cont">
        <img className="image" src={movie.image} alt={`${movie.name}-pic`} />
        <div className="overlay">
          <div className="textOnImage">{movie.name}</div>
        </div>
      </div>
      <br />
      <br />
      {userData.permissions.permissions.includes("updateMovies") ? (
        <button className="allBtn" onClick={editMovie}>
          Edit
        </button>
      ) : null}{" "}
      {userData.permissions.permissions.includes("deleteMovies") ? (
        <button className="allBtn" onClick={deleteMovie}>
          Delete
        </button>
      ) : null}
      <br />
      {userData.permissions.permissions.includes("viewSubscriptions") ? (
        <MovieSubs movieId={movie._id} />
      ) : null}
    </div>
  );
}

export default MovieChild;
