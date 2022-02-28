import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SUBS_API_URL = "http://localhost:5000/api/subSubscriptionsrRouter";
const MEMBER_API_URL = "http://localhost:5000/api/subMemberRouter";
function MovieSubs({ movieId }) {
  const [subMembersToThisMovie, setSubMembersToThisMovie] = useState([]);
  
  useEffect(() => {
    return function cleanUp(){
        setSubMembersToThisMovie([])
       
    }
}, [])

  useEffect(() => {
    async function getSubs() {
      const allSubs = (await Axios.get(SUBS_API_URL)).data;
      const membersIdsSubToMovie = allSubs
        .map((sub) => {
          const index = sub.movies
            .map((movie) => movie.movieId)
            .indexOf(movieId);
          if (index > -1) {
            return { memberId: sub.memberId, date: sub.movies[index].date };
          } else {
            return null;
          }
        })
        .filter((sub) => sub !== null);
      const finalArr = await Promise.all(
        membersIdsSubToMovie.map(async (sub) => {
          const name = (await Axios.get(`${MEMBER_API_URL}/${sub.memberId}`))
            .data.name;
          return {
            id: sub.memberId,
            memberName: name,
            date: sub.date,
          };
        })
      );

      setSubMembersToThisMovie(finalArr);
    }
    getSubs();
  }, []);

  const subMemRep = subMembersToThisMovie.map((subMem,index) => {
    return (
      <li key={index}>
        <Link to={`/subscriptions/${subMem.id}`}>{subMem.memberName}</Link>,
        {subMem.date.slice(0, 10)}
      </li>
    );
  });

  return (
    <div>
      {subMemRep.length !== 0 ? (
        <div>
          <h3>Movie Subs</h3>
          <ul className="subsUl">{subMemRep}</ul>
        </div>
      ) : <p >There are no subscriptions to this movie</p>}
    </div>
  );
}

export default MovieSubs;
