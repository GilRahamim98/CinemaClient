import React, { useEffect, useState } from "react";
import Axios from "axios";
import Button from "react-bootstrap/esm/Button";

const USERS_API_URL="http://localhost:5000/api/user";
function AddUser({ showAddUser }) {
  const[userNamesArr,setUserNamesArr]=useState([]);
  const [newUser, setNewUser] = useState({
    firstName: null,
    lastName: null,
    userName: null,
    sessionTimeOut: null,
    permissions: [],
  });

  const [permissions, setPermissions] = useState({
    viewSubscriptions: false,
    createSubscriptions: false,
    deleteSubscriptions: false,
    updateSubscriptions: false,
    viewMovies: false,
    createMovies: false,
    deleteMovies: false,
    updateMovies: false,
  });

  const newDate = new Date().toJSON().slice(0, 10);

  useEffect(()=>{
    async function getUserNames(){
      const userArr=((await Axios.get(USERS_API_URL)).data).map(user=>user.name);
      setUserNamesArr(userArr)
    }
    getUserNames();
  },[])

  useEffect(() => {
    async function setToArray(){
      const permissionsArr = Object.entries(permissions).map(per => per[1] ? per[0] : null).filter(per => per !== null)
     setNewUser((prevNewUser) => ({
       ...prevNewUser,
       permissions: permissionsArr
     }))
     
    }
    setToArray()
    
  },[permissions])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSubscriptionCheckboxesChange = (e) => {
    const name = e.target.name;
    const value = e.target.checked;
    if (name !== "viewSubscriptions") {
      setPermissions((prevPermissions) => ({
        ...prevPermissions,
        viewSubscriptions: value || prevPermissions.viewSubscriptions,
        [name]: value,
      }));
    } else {
      setPermissions((prevPermissions) => ({
        ...prevPermissions,
        [name]:
          prevPermissions.createSubscriptions ||
          prevPermissions.deleteSubscriptions ||
          prevPermissions.updateSubscriptions ||
          value,
      }));
    }
  };

  // prevPermmissions works on the real-time state.
  const handleMoviesCheckboxesChange = (e) => {
    const name = e.target.name;
    const value = e.target.checked;
    if (name !== "viewMovies") {
      setPermissions((prevPermissions) => ({
        ...prevPermissions,
        viewMovies: value || prevPermissions.viewMovies,
        [name]: value,
      }));
    } else {
      setPermissions((prevPermissions) => ({
        ...prevPermissions,
        [name]:
          prevPermissions.createMovies ||
          prevPermissions.deleteMovies ||
          prevPermissions.updateMovies ||
          value,
      }));
    }
  };

  const saveUser = async () => {
    if(newUser.firstName===""||newUser.firstName===null||newUser.lastName===""||newUser.lastName===null||newUser.userName===""||newUser.userName===null||newUser.sessionTimeOut===""||newUser.sessionTimeOut===null||newUser.permissions.length===0){
      alert("One or more fields are empty,check it")
    }else{
      if(userNamesArr.includes(newUser.userName)){
        alert("This user name is used, change it ")
      }else{

        const newUserDB = { name: newUser.userName, password: null };
        const response = await Axios.post(
          "http://localhost:5000/api/user",
          newUserDB
        );
        const newUserJson = {
          id: response.data,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          createdDate: newDate,
          sessionTimeOut: newUser.sessionTimeOut,
        };
        Axios.post("http://localhost:5000/api/userjson", newUserJson);
        const newPermissionJson = {
          id: response.data,
          permissions: newUser.permissions,
        };
        Axios.post("http://localhost:5000/api/permissionsjson", newPermissionJson);
        showAddUser();
      }

    }
  };

  return (
    <div>
      <h1>Add User </h1>
      First Name:
      <input type="text" name="firstName" onChange={handleChange} />
      <br />
      Last Name:
      <input type="text" name="lastName" onChange={handleChange} />
      <br />
      User Name:
      <input type="text" name="userName" onChange={handleChange} />
      <br />
      Session time out (Minutes):{" "}
      <input type="text" name="sessionTimeOut" onChange={handleChange} />
      <br />
      Permissions:
      <br />
      <input
        type="checkbox"
        value={"View Subscriptions"}
        name="viewSubscriptions"
        checked={permissions.viewSubscriptions}
        onClick={handleSubscriptionCheckboxesChange}
      />
      View Subscriptions <br />
      <input
        type="checkbox"
        value={"Create Subscriptions"}
        name="createSubscriptions"
        checked={permissions.createSubscriptions}
        onClick={handleSubscriptionCheckboxesChange}
      />
      Create Subscriptions <br />
      <input
        type="checkbox"
        name="deleteSubscriptions"
        checked={permissions.deleteSubscriptions}
        onClick={handleSubscriptionCheckboxesChange}
      />
      Delete Subscriptions <br />
      <input
        type="checkbox"
        name="updateSubscriptions"
        checked={permissions.updateSubscriptions}
        onClick={handleSubscriptionCheckboxesChange}
      />
      Update Subscriptions <br />
      <input
        type="checkbox"
        name="viewMovies"
        checked={permissions.viewMovies}
        onClick={handleMoviesCheckboxesChange}
      />
      View Movies <br />
      <input
        type="checkbox"
        name="createMovies"
        checked={permissions.createMovies}
        onClick={handleMoviesCheckboxesChange}
      />
      Create Movies <br />
      <input
        type="checkbox"
        name="deleteMovies"
        checked={permissions.deleteMovies}
        onClick={handleMoviesCheckboxesChange}
      />
      Delete Movies <br />
      <input
        type="checkbox"
        name="updateMovies"
        checked={permissions.updateMovies}
        onClick={handleMoviesCheckboxesChange}
      />
      Update Movies <br />
      <Button onClick={saveUser}>Save</Button>{" "}
      <Button onClick={showAddUser}>Cancel</Button>
    </div>
  );
}

export default AddUser;
