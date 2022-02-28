import  Axios  from 'axios';
import React,{useEffect, useState} from 'react';

const MEMBERS_API_URL = "http://localhost:5000/api/subMemberRouter";
function SingleSubView({subId}) {
    const[sub,setSub]=useState({});
    useEffect(()=>{
        async function getSub(){
            const {data}=await Axios.get(`${MEMBERS_API_URL}/${subId}`);
            setSub(data)
        }
        getSub();
    },[]);
  return <div>
      <h1>Single Sub View</h1>
      <h3>Name:{sub.name}</h3>
      <h4>Email:{sub.email}</h4>
      <h4>City:{sub.city}</h4>

  </div>;
}

export default SingleSubView;
