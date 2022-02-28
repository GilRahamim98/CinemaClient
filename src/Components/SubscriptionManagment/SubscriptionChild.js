import React, { useEffect, useState } from 'react';
import Axios from "axios";
import MoviesWatched from './MoviesWatched';
import { useSelector } from 'react-redux';


function SubscriptionChild({member,showEditSub,showAllSubs}) {
  const userData = useSelector((state) => state.currentUser);
  const [allSubscriptions, setAllSubscriptions] = useState([]);

  useEffect(() => {
    async function getSubs(){
      const {data} = await Axios.get('http://localhost:5000/api/subSubscriptionsrRouter');
      setAllSubscriptions(data)
    }
    getSubs();
  },[])


  const deleteSub=async ()=>{
    const mySub = allSubscriptions.filter(sub => sub.memberId === member._id)
    if(mySub.length === 0){
      await Axios.delete(`http://localhost:5000/api/subMemberRouter/${member._id}`);
    }else {
      const subId = mySub[0]._id
      await Axios.delete(`http://localhost:5000/api/subMemberRouter/${member._id}`);
      await Axios.delete(`http://localhost:5000/api/subSubscriptionsrRouter/${subId}`);
    }


  }
  const editSub=()=>{
    showEditSub(member);
    showAllSubs();
  }
 


  return <div className="subChild">
      <h2>{member.name}</h2>
      <h4>Email:{" "}{member.email}</h4>
      <h4>City:{" "}{member.city}</h4>
      {userData.permissions.permissions.includes("updateSubscriptions")?<button className="allBtn" onClick={editSub}>Edit</button>:null}{" "}
      {userData.permissions.permissions.includes("deleteSubscriptions")?<button className="allBtn" onClick={deleteSub}>Delete</button>:null}
      <br/><br/>
      {userData.permissions.permissions.includes("viewMovies")?<MoviesWatched checkId={member._id}/>:null}
      
      

  </div>;
}

export default SubscriptionChild;
