import React, { useEffect,useState } from "react";
import Axios from 'axios'
import Button from "react-bootstrap/esm/Button";

function UserChild({ user, permission,showEditUser,showAllUsers }) {
  const[userObj,setUserObj]=useState("")
  useEffect(()=>{
    async function getUser(){
      const {data}=await Axios.get(`http://localhost:5000/api/user/${user.id}`);
      setUserObj(data);

    }
    getUser();
  },[userObj])

  const deleteUser=async()=>{
    await Axios.delete(`http://localhost:5000/api/user/${user.id}`);
    await Axios.delete(`http://localhost:5000/api/userjson/${user.id}`)
    await Axios.delete(`http://localhost:5000/api/permissionsjson/${user.id}`)
  }

  const editUser=()=>{
    showEditUser(user, userObj,permission);
    showAllUsers();
  }

  return (
    <div className="userChild">
    <table className="editMovie">
    <tbody>
      <tr>
        <td>Name:</td>
        <td>{user.firstName} {user.lastName}</td>
      </tr>
      <tr>
        <td>User Name:</td>
        <td>{userObj.name}</td>
      </tr>
      <tr>
        <td> Session time out (Minutes):</td>
        <td>{user.sessionTimeOut}</td>
      </tr>
      <tr>
        <td>Created date:</td>
        <td>{user.createdDate}</td>
      </tr>
      <tr>
        <td> Permissions:</td>
        <td>{permission.permissions!==undefined?String(permission.permissions):null}</td>
      </tr>
      </tbody>
    </table>
    <div className="addMovieBtn">
      <Button onClick={editUser}>Edit</Button>{" "}
      <Button onClick={deleteUser}>Delete</Button>
    </div>
      
    </div>
  );
}

export default UserChild;
