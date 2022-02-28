import React, { useState,useEffect} from "react";
import Axios from "axios";
import Button from "react-bootstrap/Button";

function AddMovie({ showAddMovie }) {
  const [movie, setMovie] = useState({
    name: null,
    genres: [],
    image: null,
    premiered: null,
  });
  useEffect(() => {
    return function cleanUp(){
        setMovie({})
       
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
  const saveMovie = () => {
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
      Axios.post("http://localhost:5000/api/subMoviesrRouter/", {
        ...movie,
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      showAddMovie();
    }
  };
  return (
    <div className="editMovie">
      <br />
      <h1>Add new movie</h1>

      <table>
      <tbody>
        <tr>
          <td>Name:</td>
          <td>
            <input
              type="text"
              className="editInput"
              name="name"
              onChange={handleChange}
              placeholder="Movie Name"
            />
          </td>
        </tr>
        <tr>
          <td> Geners:</td>
          <td>
            <input
              type="text"
              className="editInput"
              name="genres"
              onChange={handleChange}
              placeholder="Movie Geners"
            />
          </td>
        </tr>
        <tr>
          <td>Image Url:</td>
          <td>
            <input
              type="text"
              className="editInput"
              name="image"
              onChange={handleChange}
              placeholder="Movie Image"
            />
          </td>
        </tr>
        <tr>
          <td>Premired:</td>
          <td>
            <input
              type="date"
              className="editInput"
              name="premiered"
              onChange={handleChange}
            />
          </td>
        </tr>
      </tbody>
      </table>

      <div className="addMovieBtn">
        <Button onClick={saveMovie}>Save Movie</Button>
        <Button onClick={showAddMovie}>Cancel</Button>
      </div>
    </div>
  );
}

export default AddMovie;
