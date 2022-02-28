import Axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";

function EditSubscription({ currentEditSub, showEditSub }) {
  const [sub, setSub] = useState({
    name: currentEditSub.name,
    email: currentEditSub.email,
    city: currentEditSub.city,
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSub({ ...sub, [name]: value });
  };
  const updateSub = async () => {
    if(sub.name===null||sub.name===""||sub.email===null||sub.email===""||sub.city===null||sub.city===""){
      alert("Fill all fields!")
    }else{

      await Axios.put(
        `http://localhost:5000/api/subMemberRouter/${currentEditSub._id}`,
        sub
      );
      showEditSub();
    }
  };

  return (
    <div className="editMovie">
      <h1>Edit Member: {currentEditSub.name}</h1>
      <table>
        <tr>
        <td>Name:</td>
        <td><input
        type="text"
        name="name"
        defaultValue={sub.name}
        onChange={handleChange}
      /></td>
        </tr>
        <tr>
          <td>Email:</td>
          <td><input
        type="text"
        name="email"
        defaultValue={sub.email}
        onChange={handleChange}
      /></td>
        </tr>
        <tr>
          <td>City:</td>
          <td> <input
        type="text"
        name="city"
        defaultValue={sub.city}
        onChange={handleChange}
      /></td>
        </tr>
      </table>
     
     <div className="addMovieBtn">
      <Button onClick={updateSub}>Update</Button>
      <Button onClick={showEditSub}>Cancel</Button>
     </div>
    </div>
  );
}

export default EditSubscription;
