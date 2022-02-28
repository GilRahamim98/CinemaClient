import React from "react";
import Navbar from "./Navbar";

function MainPage(props) {
  return (
    <div>
      <Navbar props={props} />
      <h1 className="webHead">Main Page </h1>
      <h2>Welcome to our cinema website!</h2>

    </div>
  );
}

export default MainPage;
