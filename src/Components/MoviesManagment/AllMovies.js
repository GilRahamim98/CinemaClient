import Axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import MovieChild from "./MovieChild";

const moviesUrl="http://localhost:5000/api/subMoviesrRouter"
function AllMovies({showAllMovies,showEditMovie}) {
    const[movies,setMovies]=useState([]);
    const[searchVal,setSearchVal]=useState("");
    const[findVal,setFindVal]=useState("")
    const[clickedFind,setclickedFind]=useState(false);
    useEffect(() => {
        return function cleanUp(){
            setMovies([])
            
        }
    }, [])

    useEffect(()=>{
        async function getMovies(){
            const { data } = await Axios.get(moviesUrl);
            setMovies(data);
        }
        getMovies();
    },[])

    useEffect(()=>{
        async function refreshMovies(){
            const { data } = await Axios.get(moviesUrl);
            setMovies(data);
        }
        refreshMovies();
    },[movies])

    const handleChange=(e)=>{
        setSearchVal(e.target.value);
    }

    const findMovie=()=>{
        setFindVal(searchVal);
        if(clickedFind){
            setclickedFind(false);
        }else{
            setclickedFind(true);
        }

    }

    const moviesRep=movies.filter(movieObj=>findVal===""?movieObj:(movieObj.name.toLowerCase().includes(findVal.toLowerCase())&&movieObj)).map(movieObj=>{
        return (
            <MovieChild
            key={movieObj._id}
            movie={movieObj}
            showAllMovies={showAllMovies}
            showEditMovie={showEditMovie}
            />
        )
    })
  return <div >
      <h1>All Movies </h1>
      <div className="findMovie">
      <input type="text" name="find" onChange={handleChange} placeholder="Find a movie..."/>{" "}
      <button onClick={findMovie}>{clickedFind?"🔎":"🔍"}</button>
      </div>
      <br/>
      <div className="allMovies">
      {moviesRep}
      </div>
  </div>;
}

export default AllMovies;
