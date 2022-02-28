import React, { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  clearReducer,
  setAllSubscriptions,
  setCurrentUser,
  setId,
} from "../Redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";

const USERS_API = "http://localhost:5000/api/user";
const USER_DETAILS_URL = "http://localhost:5000/api/userjson/";
const PERMISSIONS_URL = "http://localhost:5000/api/permissionsjson";
const SUBSCRIPTIONS_URL = "http://localhost:5000/api/subSubscriptionsrRouter";

function Login(props) {
  const [userLogin, setUser] = useState({ name: null, password: null });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const eye = <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...userLogin, [name]: value });
  };

  const loginFunction = async () => {
    if (
      userLogin.name === "" ||
      userLogin.name === null ||
      userLogin.password === "" ||
      userLogin.password === null
    ) {
      alert("Enter user name and password before you try to continue");
    } else {
      const usersArr = (await Axios.get(USERS_API)).data;
      const matchedUser = usersArr.filter((user) => {
        return (
          user.name === userLogin.name && user.password === userLogin.password
        );
      });
      if (matchedUser.length === 0) {
        alert("User name or Password are Wrong try again");
      } else {
        dispatch(setId(matchedUser[0]._id));
        const user = {
          userDetails: (
            await Axios.get(`${USER_DETAILS_URL}/${matchedUser[0]._id}`)
          ).data,
          permissions: (
            await Axios.get(`${PERMISSIONS_URL}/${matchedUser[0]._id}`)
          ).data,
        };
        dispatch(setCurrentUser(user));
        dispatch(
          setAllSubscriptions((await Axios.get(SUBSCRIPTIONS_URL)).data)
        );

        props.history.push("/mainpage");
        //console.log( user.userDetails.sessionTimeOut);

        setTimeout(() => {
          props.history.push("/");
          localStorage.clear();
          dispatch(clearReducer(null));
        }, ((user.userDetails.sessionTimeOut) * 60000));
      }
    }
  };
  const togglePassword = () => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };

  return (
    <div className="fullsignin">
      <div className="signin">
        <h1>Login </h1>
        <div className="floating">
          <input
            name="name"
            className="input-control"
            type="text"
            onChange={handleChange}
            placeholder="User Name"
          />
        </div>
        <div className="floating">
          <i className="icon" onClick={togglePassword}>
            {eye}
          </i>
          <input
            name="password"
            className="input-control"
            type={showPassword ? "text" : "password"}
            onChange={handleChange}
            placeholder="Password"
          />
        </div>
        <br />
        <Button className="loginButton" onClick={loginFunction}>
          Log in{" "}
        </Button>
        <br />
        <hr></hr>
        New here? <Link to="/register">Create new account</Link>
      </div>
    </div>
  );
}

export default Login;
