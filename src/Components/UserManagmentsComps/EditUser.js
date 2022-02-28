import React, { useState, useEffect } from "react";
import Axios from "axios";
import Button from "react-bootstrap/esm/Button";

const USERS_API_URL="http://localhost:5000/api/user";
function EditUser({
  currentEditUser,
  editUserObj,
  currentEditUserPermission,
  showEditUser,
}) {
  const[userNamesArr,setUserNamesArr]=useState([]);
  const [editedUser, setEditedUser] = useState({
    firstName: currentEditUser.firstName,
    lastName: currentEditUser.lastName,
    userName: editUserObj.name,
    createdDate: currentEditUser.createdDate,
    sessionTimeOut: currentEditUser.sessionTimeOut,
    permissions: currentEditUserPermission.permissions,
  });

  const [permissions, setPermissions] = useState({
    viewSubscriptions: editedUser.permissions.includes("viewSubscriptions") ? true : false,
    createSubscriptions: editedUser.permissions.includes("createSubscriptions") ? true : false,
    deleteSubscriptions: editedUser.permissions.includes("deleteSubscriptions") ? true : false,
    updateSubscriptions: editedUser.permissions.includes("updateSubscriptions") ? true : false,
    viewMovies: editedUser.permissions.includes("viewMovies") ? true : false,
    createMovies: editedUser.permissions.includes("createMovies") ? true : false,
    deleteMovies: editedUser.permissions.includes("deleteMovies") ? true : false,
    updateMovies: editedUser.permissions.includes("updateMovies") ? true : false,
  });
  
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
      setEditedUser((prevNewUser) => ({
       ...prevNewUser,
       permissions: permissionsArr
     }))
     
    }
    setToArray()
    
  },[permissions])

  const handleChange = async (e) => {
    const { name, value } = e.target;
    await setEditedUser({ ...editedUser, [name]: value });
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

  const handleUpdateUser = async () => {
    if(editedUser.firstName===""||editedUser.lastName===""||editedUser.userName===""||editedUser.sessionTimeOut===""||editedUser.permissions.length===0){
      alert("One or more fields are empty");
    }else{
      if(userNamesArr.includes(editedUser.userName)&&editedUser.userName!==editUserObj.name){
        alert("This user name is already in use")
      }else{
        const newUpdatedUser = { name: editedUser.userName, password: editUserObj.password };
        await Axios.put(
          `http://localhost:5000/api/user/${currentEditUser.id}`,
          newUpdatedUser
        );
        const newUpdatedUserJSON = {
          id: currentEditUser.id,
          firstName: editedUser.firstName,
          lastName: editedUser.lastName,
          createdDate: editedUser.createdDate,
          sessionTimeOut: editedUser.sessionTimeOut,
        };
        await Axios.put(
          `http://localhost:5000/api/userjson/${currentEditUser.id}`,
          newUpdatedUserJSON
        );
        const newUpdatedPermission = {
          id: currentEditUser.id,
          permissions: editedUser.permissions,
        };
        await Axios.put(
          `http://localhost:5000/api/permissionsjson/${currentEditUser.id}`,
          newUpdatedPermission
        );
        showEditUser();

      }

    }
  };

  

 

  return (
    <div>
      <h1>Edit User</h1>
      First Name:
      <input
        type="text"
        name="firstName"
        defaultValue={editedUser.firstName}
        onChange={handleChange}
      />
      <br />
      Last Name:
      <input
        type="text"
        name="lastName"
        defaultValue={editedUser.lastName}
        onChange={handleChange}
      />
      <br />
      User Name:
      <input
        type="text"
        name="userName"
        defaultValue={editedUser.userName}
        onChange={handleChange}
      />
      <br />
      Created Date:{editedUser.createdDate}
      <br />
      Session time out (Minutes):{" "}
      <input
        type="text"
        name="sessionTimeOut"
        defaultValue={editedUser.sessionTimeOut}
        onChange={handleChange}
      />
      <br />
      Permissions:
      <br />
      <input
        type="checkbox"
        name="viewSubscriptions"
        checked={
          permissions.viewSubscriptions
        }
        onChange={handleSubscriptionCheckboxesChange}
        
      />
      View Subscriptions <br />
      <input
        type="checkbox"
        name="createSubscriptions"
        checked={
          permissions.createSubscriptions
        }
        onChange={handleSubscriptionCheckboxesChange}

        
      />
      Create Subscriptions <br />
      <input
        type="checkbox"
        name="deleteSubscriptions"
        checked={
          permissions.deleteSubscriptions
        }
        onChange={handleSubscriptionCheckboxesChange}
        
      />
      Delete Subscriptions <br />
      <input
        type="checkbox"
        name="updateSubscriptions"
        checked={
          permissions.updateSubscriptions
        }
        onChange={handleSubscriptionCheckboxesChange}
        
      />
      Update Subscriptions <br />
      <input
        type="checkbox"
        name="viewMovies"
        checked={
          permissions.viewMovies
        }
        onChange={handleMoviesCheckboxesChange}
        
      />
      View Movies <br />
      <input
        type="checkbox"
        name="createMovies"
        checked={
          permissions.createMovies
        }
        onChange={handleMoviesCheckboxesChange}
        
      />
      Create Movies <br />
      <input
        type="checkbox"
        name="deleteMovies"
        checked={
          permissions.deleteMovies
        }
        onChange={handleMoviesCheckboxesChange}
      />
      Delete Movies <br />
      <input
        type="checkbox"
        name="updateMovies"
        checked={
          permissions.updateMovies
        }
        onChange={handleMoviesCheckboxesChange}

      />
      Update Movies <br />
      <Button onClick={handleUpdateUser}>Update</Button>{" "}
      <Button onClick={showEditUser}>Cancel</Button>
    </div>
  );
}

export default EditUser;
