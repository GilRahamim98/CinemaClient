import React, { useEffect, useState } from 'react';
import Axios  from 'axios';

const MOVIE_API_URL = 'http://localhost:5000/api/subMoviesrRouter'
function SingleMovieView({movieId}) {


    const [movie, setMovie] = useState({});
    const [premierd, setPremierd] = useState();
    useEffect(() => {
        return function cleanUp(){
            setMovie({})
        }
    }, [])
    useEffect(()=> {
        async function getMovie(){
            const {data} = await Axios.get(`${MOVIE_API_URL}/${movieId}`);
            setMovie(data)
            setPremierd(data.premiered.slice(0,10))
        }
        getMovie()
    },[])

  return <div>
      <h1>Single Movie View</h1>
      <p>Name: {movie.name}</p>
      <p>Genres: {String(movie.genres)}</p>
      <p>Premiered: {premierd}</p>
      <img src={movie.image} alt={`${movie.name}-pic`}/>


  </div>;
}

export default SingleMovieView;
