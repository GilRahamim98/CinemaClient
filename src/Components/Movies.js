import React, { useEffect, useState } from "react";
import AddMovie from "./MoviesManagment/AddMovie";
import AllMovies from "./MoviesManagment/AllMovies";
import {  useSelector } from "react-redux";
import EditMovie from "./MoviesManagment/EditMovie";
import SingleMovieView from "./MoviesManagment/SingleMovieView";
import Navbar from "./Navbar";

function Movies(props) {
  const userData = useSelector((state) => state.currentUser);
  const [isAddMovie, setIsAddMovie] = useState(false);
  const [isAllMovies, setIsAllMovies] = useState(false);
  const [isEditMovie, setIsEditMovie] = useState(false);
  const [isSingleMovie, setIsSingleMovie] = useState(false);
  const [currentEditMovie, setCurrentEditMovie] = useState({});

  useEffect(() => {
    if (props.match.params.id !== undefined) {
      setIsSingleMovie(true);
    } else {
    }
  }, []);

  const showAddMovie = () => {
    if (isAddMovie) {
      setIsAddMovie(false);
    } else {
      setIsAddMovie(true);
      setIsAllMovies(false);
      setIsEditMovie(false);
      setIsSingleMovie(false);
    }
  };

  const showAllMovies = () => {
    if (isAllMovies) {
      setIsAllMovies(false);
    } else {
      setIsAllMovies(true);
      setIsAddMovie(false);
      setIsEditMovie(false);
      setIsSingleMovie(false);
    }
  };

  const showEditMovie = (movieObj) => {
    if (isEditMovie) {
      setIsEditMovie(false);
      setIsAllMovies(true);
    } else {
      setCurrentEditMovie(movieObj);
      setIsEditMovie(true);
      setIsAddMovie(false);
      setIsAllMovies(false);
    }
  };

  return (
    <div >
      <Navbar props={props} movieColor="#389cff"/>
      <h1 className="webHead">Movies </h1>
      <br />
      <div className="comp">
      {userData.permissions.permissions.includes("viewMovies")?<button className="inCompButton" onClick={showAllMovies} style={{backgroundColor:isAllMovies?"#389cff":null}}>All Movies</button>:null}{" "}
      {userData.permissions.permissions.includes("createMovies")?<button className="inCompButton" onClick={showAddMovie} style={{backgroundColor:isAddMovie?"#389cff":null}}>Add Movie</button> :null}
      {isAddMovie ? <AddMovie showAddMovie={showAddMovie} /> : null}
      {isAllMovies ? (
        <AllMovies
          showAllMovies={showAllMovies}
          showEditMovie={showEditMovie}
        />
      ) : null}
      {isEditMovie ? (
        <EditMovie
          currentEditMovie={currentEditMovie}
          showEditMovie={showEditMovie}
        />
      ) : null}
      {isSingleMovie ? (
        <SingleMovieView movieId={props.match.params.id} />
      ) : null}

      </div>
    </div>
  );
}

export default Movies;
