import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearReducer } from "../Redux/actions";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

function NavigationBar({ props, movieColor, subColor, userColor }) {
  const userData = useSelector((state) => state.currentUser);

  const dispatch = useDispatch();
  const goToMainPage = () => {
    props.history.push("/mainpage");
  };

  const goToMovies = () => {
    props.history.push("/movies");
  };

  const goToSubscriptions = () => {
    props.history.push("/subscriptions");
  };

  const goToUserManagment = () => {
    props.history.push("/usermanagment");
  };

  const Logout = () => {
    localStorage.clear();
    dispatch(clearReducer(null));
    props.history.push("/");
  };

  return (
    <div className="navBar">
      <Navbar className="navBarBoot" collapseOnSelect  expand="lg" bg="primary" variant="dark" >
        <Container>
          <Navbar.Brand onClick={goToMainPage}>Cinema</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">

          <Nav className="me-auto">
            {userData.permissions.permissions.includes("viewMovies") ? (
              <Nav.Item>
              <Nav.Link
                onClick={goToMovies}
                style={{ backgroundColor: movieColor }}
              >
                Movies
              </Nav.Link>
              </Nav.Item>
            ) : null}
            {userData.permissions.permissions.includes("viewSubscriptions") ? (
              <Nav.Item>
              <Nav.Link
                onClick={goToSubscriptions}
                style={{ backgroundColor: subColor }}
              >
                Subscriptions
              </Nav.Link>
              </Nav.Item>
            ) : null}
            {userData.userDetails.firstName === "Admin" ? (
              <Nav.Item>
              <Nav.Link
                onClick={goToUserManagment}
                style={{ backgroundColor: userColor }}
              >
                User Managment
              </Nav.Link>
              </Nav.Item>
            ) : null}
            <Nav.Item>
            <Nav.Link onClick={Logout}>Log Out</Nav.Link>
            </Nav.Item>
            </Nav>

          </Navbar.Collapse>
            <Nav>
            <Nav.Item className="ms-auto">
              <span>
                Welcome {userData.userDetails.firstName}{" "}
                {userData.userDetails.lastName} !
              </span>
            </Nav.Item>
          </Nav>

        </Container>
      </Navbar>
    </div>
  );
}

export default NavigationBar;
