import Axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";

function AddSubscription({ showAddSub }) {
  const [sub, setSub] = useState({ name: null, email: null, city: null });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSub({ ...sub, [name]: value });
  };
  const saveSub = () => {
    if (
      sub.name === null ||
      sub.name === "" ||
      sub.email === null ||
      sub.email === "" ||
      sub.city === null ||
      sub.city === ""
    ) {
      alert("Fill all fields!");
    } else {
      Axios.post("http://localhost:5000/api/subMemberRouter", sub);
      showAddSub();
    }
  };
  return (
    <div className="editMovie">
      <h1>Add new member</h1>
      <table>
      <tbody>
        <tr>
          <td>Member Name:</td>
          <td>
            {" "}
            <input
              type="text"
              className="editInput"
              name="name"
              onChange={handleChange}
              placeholder="Member Full Name"
            />
          </td>
        </tr>
        <tr>
          <td>Member Email:</td>
          <td>
            {" "}
            <input
              type="text"
              className="editInput"
              name="email"
              onChange={handleChange}
              placeholder="Member Email"
            />
          </td>
        </tr>
        <tr>
          <td>Member City:</td>
          <td>
            {" "}
            <input
              type="text"
              className="editInput"
              name="city"
              onChange={handleChange}
              placeholder="Member City"
            />
          </td>
        </tr>

      </tbody>
      </table>
      <div className="addMovieBtn">
        <Button onClick={saveSub}>Save</Button>{" "}
        <Button onClick={showAddSub}>Cancel</Button>
      </div>
    </div>
  );
}

export default AddSubscription;
