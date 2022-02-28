import Axios from "axios";
import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button'

const MOVIES_URL = "http://localhost:5000/api/subMoviesrRouter";
const SUBS_URL = "http://localhost:5000/api/subSubscriptionsrRouter";

function AddNewMovie({ memberNotSubscribedMovies, checkId, addNewMovie }) {
  const [memberNotSubYetMovies, setMemberNotSubYetMovies] = useState([]);
  const [memberIdInSubscriptionsDB, setmemberIdInSubscriptionsDB] = useState();
  const [isNotInSubDB, setisNotInSubDB] = useState();
  const [newMovieSub, setNewMovieSub] = useState({
    memberId: checkId,
    movieId: null,
    date: null,
  });

  useEffect(() => {
    async function getMemberMovies() {
      const allMovies = (await Axios.get(MOVIES_URL)).data;

      const allSubscriptions = (await Axios.get(SUBS_URL)).data;
      const allSubscriptionsIds = allSubscriptions.map((sub) => sub.memberId);
      if (allSubscriptionsIds.includes(checkId)) {
        // IF THERE IS A SUBS DB
        setisNotInSubDB(false);
        setMemberNotSubYetMovies(memberNotSubscribedMovies);

        const currentSub = allSubscriptions.filter(
          (sub) => sub.memberId === checkId
        );
        setmemberIdInSubscriptionsDB(currentSub[0]._id);
      } else {
        // // IF THERE IS NOT A SUBS DB
        setisNotInSubDB(true);
        setMemberNotSubYetMovies(allMovies);
      }
    }
    getMemberMovies();
  }, []);

  const handleMovieChange = (e) => {
    setNewMovieSub({ ...newMovieSub, movieId: e.target.value });
  };

  const handleDateChange = (e) => {
    setNewMovieSub({ ...newMovieSub, date: e.target.value });
  };

  const handleAddSubscribe = async () => {
    if (newMovieSub.date === null || newMovieSub.movieId === null) {
      alert("One or more fields are not selected");
    } else {
      if (isNotInSubDB) {
        const newSubForPost = {
          memberId: checkId,
          movies: [
            {
              movieId: newMovieSub.movieId,
              date: newMovieSub.date,
            },
          ],
        };

        const res = await Axios.post(SUBS_URL, newSubForPost);
      } else {
        const newSubForPut = {
          movieId: newMovieSub.movieId,
          date: newMovieSub.date,
        };

        const { data } = await Axios.get(
          `${SUBS_URL}/${memberIdInSubscriptionsDB}`
        );
        data.movies.push(newSubForPut);

        const res = await Axios.put(
          `${SUBS_URL}/${memberIdInSubscriptionsDB}`,
          data
        );
      }
      addNewMovie();
    }
  };

  const DDLRepeater = memberNotSubYetMovies.map((movie) => {
    return (
      <option key={movie._id} className="opt" value={movie._id}>
        {" "}
        {movie.name}{" "}
      </option>
    );
  });
  return (
    <div>
      <h3>Add a new movie </h3>
      <div>
        <select className="custom-select" onChange={handleMovieChange}>
          <option className="opt" selected disabled>
            {" "}
          </option>
          {DDLRepeater}
        </select>{" "}
        <input type="date" name="newSubDate" onChange={handleDateChange} />{" "}
        <Button className="subTheNewMovie" onClick={handleAddSubscribe}>Subscribe</Button>
      </div>
    </div>
  );
}

export default AddNewMovie;
