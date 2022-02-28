import React from "react";
import { Switch, Route } from "react-router-dom";
import Register from "../Components/Register";
import Login from "../Components/Login";
import MainPage from "../Components/MainPage";
import Movies from "../Components/Movies";
import Subscriptions from "../Components/Subscriptions";
import UserManagment from "../Components/UserManagment";


function Routers() {
  return (
    <div>
      <Switch>
        <Route path="/" component={Login} exact />
        <Route path="/mainpage" component={MainPage} />
        <Route path="/register" component={Register} />
        <Route path="/movies/:id?" component={Movies} />
        <Route path="/subscriptions/:id?" component={Subscriptions} />
        <Route path="/usermanagment" component={UserManagment} />
      </Switch>
    </div>
  );
}

export default Routers;
