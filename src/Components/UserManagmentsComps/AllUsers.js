import Axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import UserChild from "./UserChild";

const usersUrl = "http://localhost:5000/api/userjson";
const permissionsUrl = "http://localhost:5000/api/permissionsjson";

function AllUsers({showEditUser,showAllUsers}) {
  const [users, setUsers] = useState([]);


  useEffect(() => {
    async function getUsers() {
      const { data } = await Axios.get(usersUrl);
      const permissions = (await Axios.get(permissionsUrl)).data;

      const mergeArr = (data, permissions) =>
        data.map((user) => {
          return {
            user: user,
            permissions: permissions.find(
              (permission) => permission.id === user.id
            ),
          };
        });
      const newArr = mergeArr(data, permissions);
      setUsers(newArr);
    }
    getUsers();
  }, [users]);


  const usersRep = users.map((userObj) => {
    return (
      <UserChild
        key={userObj.user.id}
        user={userObj.user}
        permission={userObj.permissions}
        showEditUser={showEditUser}
        showAllUsers={showAllUsers}
      />
    );
  }).splice(1,users.length);

  return (
    <div >
      <h1>All Users </h1>
      <div className="allUsers">
      {usersRep.length!==0?usersRep:<h2>There is no users right now</h2>}
      </div>
    </div>
  );
}

export default AllUsers;
