import Axios from "axios";
import { useState,useEffect } from "react";
import React  from 'react';
import { Link } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";

const USERS_API_URL="http://localhost:5000/api/user"
function CreatUser(props) {
  const [newUser, setUser] = useState({ name: null, password: null });
  const[usersArr,setUsersArr]=useState([]);

  useEffect(()=>{
    async function getUsers(){
      const{data}=await Axios.get(USERS_API_URL);
      setUsersArr(data);
    }
    getUsers();

  },[])


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...newUser, [name]: value });
  }

  const createAccount = async(e) => {
    e.preventDefault();
    const userObj=usersArr.filter(user=>user.name===newUser.name);
    if(userObj.length===0){
      alert("There is no such user ,contact the admin")
    }else if(userObj[0].password!==null){
      alert("There is already a password for this user")
    }else{
      await Axios.put(`${USERS_API_URL}/${userObj[0]._id}`,newUser)
      props.history.push("/");

    }
    
  }
  return <div className="registerPage">
      <h1>Register</h1><br/>
      <form className="formReg" onSubmit={createAccount}>
      <table>
      <tbody>
        <tr>
        <td>User Name:</td>
        <td><input name="name" type="text" onChange={handleChange} /></td>
        </tr>
        <tr>
          <td>Password:</td>
          <td><input name="password" type="password" onChange={handleChange} /></td>
        </tr>
      </tbody>
      </table>
      <div className="addMovieBtn">
      <Button type="submit">Create Account</Button>{" "}
      <Link to="/"><Button>Go Back</Button></Link>
      </div>
      </form>
  </div>;
}

export default CreatUser;
