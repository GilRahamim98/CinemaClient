import React, { useState } from "react";
import AddUser from "./UserManagmentsComps/AddUser";
import AllUsers from "./UserManagmentsComps/AllUsers";
import EditUser from "./UserManagmentsComps/EditUser";
import Navbar from "./Navbar";

function UserManagment(props) {
  const [isAddUser, setIsAdd] = useState(false);
  const [isAllUsers, setIsAllUsers] = useState(false);
  const [isEditUser, setIsEditUser] = useState(false);
  const [currentEditUser, setCurrentEditUser] = useState({});
  const [currentEditUserObj, setCurrentEditUserObj] = useState();
  const [currentEditUserPermssions, setCurrentEditUserPermissions] = useState(
    []
  );

  const showAddUser = () => {
    if (isAddUser) {
      setIsAdd(false);
    } else {
      setIsAdd(true);
      setIsAllUsers(false);
      setIsEditUser(false);
    }
  };

  const showAllUsers = () => {
    if (isAllUsers) {
      setIsAllUsers(false);
    } else {
      setIsAllUsers(true);
      setIsAdd(false);
      setIsEditUser(false);
    }
  };
  const showEditUser = (userObj, editUserObj, permission) => {
    if (isEditUser) {
      setIsEditUser(false);
      setIsAllUsers(true);
    } else {
      setCurrentEditUser(userObj);
      setCurrentEditUserObj(editUserObj);
      setCurrentEditUserPermissions(permission);
      setIsEditUser(true);
      setIsAllUsers(false);
      setIsAdd(false);
    }
  };

  return (
    <div>
      <Navbar props={props} userColor="#389cff" />
      <h1 className="webHead">User Managment </h1>
      <br />
      <div className="comp">
        <button
          onClick={showAllUsers}
          className="inCompButton"
          style={{ backgroundColor: isAllUsers ? "#389cff" : null }}
        >
          All User
        </button>{" "}
        <button
          onClick={showAddUser}
          className="inCompButton"
          style={{ backgroundColor: isAddUser ? "#389cff" : null }}
        >
          Add User
        </button>
        {isAddUser ? <AddUser showAddUser={showAddUser} /> : null}
        {isAllUsers ? (
          <AllUsers showAllUsers={showAllUsers} showEditUser={showEditUser} />
        ) : null}
        {isEditUser ? (
          <EditUser
            currentEditUser={currentEditUser}
            editUserObj={currentEditUserObj}
            currentEditUserPermission={currentEditUserPermssions}
            showEditUser={showEditUser}
          />
        ) : null}
      </div>
    </div>
  );
}

export default UserManagment;
