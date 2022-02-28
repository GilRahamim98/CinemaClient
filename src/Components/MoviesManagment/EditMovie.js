import Axios from "axios";
import React, { useState,useEffect} from "react";
import Button from 'react-bootstrap/Button';


function EditMovie({ currentEditMovie, showEditMovie }) {
  const [movie, setMovie] = useState({
    name: currentEditMovie.name,
    genres: currentEditMovie.genres,
    image: currentEditMovie.image,
    premiered: currentEditMovie.premiered,
  });
  useEffect(() => {
    return function cleanUp(){
        setMovie([])
        // console.log(movies);
    }
}, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "geners") {
      setMovie({ ...movie, [name]: value.split(",") });
    } else {
      setMovie({ ...movie, [name]: value });
    }
  };

  const UpdateMovie = () => {
    if (
      movie.name === "" ||
      movie.name === null ||
      movie.genres.length === 0 ||
      movie.image === "" ||
      movie.image === null ||
      movie.premiered === null
    ) {
      alert("Fill all fields ");
    } else {
      Axios.put(
        `http://localhost:5000/api/subMoviesrRouter/${currentEditMovie._id}`,
        movie
      )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      showEditMovie();
    }
  };
  const cancelEdit = () => {
    showEditMovie();
  };
  return (
    <div className="editMovie">
      <table className="editMovieTable">
        <tr>
          <td>Movie name:</td>
          <td>
            <input
              type="text"
              name="name"
              className="editInput"
              defaultValue={movie.name}
              onChange={handleChange}
            />
          </td>
        </tr>
        <tr>
          <td>Geners:</td>
          <td>
            {" "}
            <input
              type="text"
              name="genres"
              className="editInput"
              defaultValue={movie.genres}
              onChange={handleChange}
            />
          </td>
        </tr>
        <tr>
          <td>Image Url:</td>
          <td>
            {" "}
            <input
              type="text"
              name="image"
              className="editInput"
              defaultValue={movie.image}
              onChange={handleChange}
            />
          </td>
        </tr>
        <tr>
          <td>Premired Date:</td>
          <td>
            {" "}
            <input
              type="date"
              name="premiered"
              className="editInput"
              defaultValue={movie.premiered.slice(0, 10)}
              onChange={handleChange}
            />
          </td>
        </tr>
      </table>
      <div className="addMovieBtn">
      <Button  onClick={UpdateMovie}>
        Update Movie
      </Button>{" "}
      <Button  onClick={cancelEdit}>
        Cancel
      </Button>
      </div>
    </div>
  );
}

export default EditMovie;
