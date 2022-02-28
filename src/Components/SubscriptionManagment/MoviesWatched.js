import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AddNewMovie from "./AddNewMovie";

const subscriptionsUrl = "http://localhost:5000/api/subSubscriptionsrRouter";
const moviesUrl = "http://localhost:5000/api/subMoviesrRouter";
function MoviesWatched({ checkId }) {
  const userData = useSelector((state) => state.currentUser);

  const [movies, setMovies] = useState([]);
  const [memberNotSubscribedMovies, setMemberNotSubscribedMovies] = useState(
    []
  );
  const [isAddNewMovie, setIsAddNewMovie] = useState(false);

  

  useEffect(() => {
    async function getSubs() {
      const { data } = await Axios.get(subscriptionsUrl);

      const subFilter = data.filter((subObj) => subObj.memberId === checkId);

      const subNewMovie = subFilter[0].movies.map((movie) => movie);

      const subMovies = await Promise.all(
        subNewMovie.map(async (movie) => ({
          movieObj: (await Axios.get(`${moviesUrl}/${movie.movieId}`)).data,
          date: movie.date,
        }))
      );
      setMovies(subMovies);
      const subMovieID = subFilter[0].movies.map((movie) => movie.movieId);

      const moviesArr = (await Axios.get(moviesUrl)).data;
      setMemberNotSubscribedMovies(
        moviesArr.filter((movie) => {
          if (!subMovieID.includes(movie._id)) {
            return movie;
          }
        })
      );
    }
    getSubs();
  }, [isAddNewMovie]);

  const addNewMovie = () => {
    if (isAddNewMovie) {
      setIsAddNewMovie(false);
    } else {
      setIsAddNewMovie(true);
    }
  };

  const subsRep = movies.map((movie) => {
    return (
      <li key={movie.movieObj._id}>
        <Link to={`/movies/${movie.movieObj._id}`}>{movie.movieObj.name}</Link>,
        {movie.date.slice(0, 10)}
      </li>
    );
  });
  return (
    <div className="movieWatched" >
      <h2>Movies Watched</h2>
      {userData.permissions.permissions.includes("createSubscriptions") ? (
        <button className="subMovieBtn" style={isAddNewMovie?{backgroundColor:"#0080ff",color:"White"}:null} onClick={addNewMovie}>
          Subscribe to new movie
        </button>
      ) : null}
      {isAddNewMovie ? (
        <AddNewMovie
          memberNotSubscribedMovies={memberNotSubscribedMovies}
          checkId={checkId}
          addNewMovie={addNewMovie}
        />
      ) : null}
      {subsRep.length !== 0 ? (
        <ul>{subsRep}</ul>
      ) : (
        <h3>There are no movies...</h3>
      )}
    </div>
  );
}

export default MoviesWatched;
