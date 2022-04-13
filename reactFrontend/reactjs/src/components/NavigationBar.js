import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { logoutUser } from "../services/index";

const NavigationBar = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutUser());
  };

  const guestLinks = (
    <>
      <div className="mr-auto"></div>
      <Nav className="navbar-right">
        <Link to={"register"} className="nav-link">
          <FontAwesomeIcon icon={faUserPlus} /> Register
        </Link>
        <Link to={"login"} className="nav-link">
          <FontAwesomeIcon icon={faSignInAlt} /> Login
        </Link>
      </Nav>
    </>
  );
  const userLinks = (
    <>
      <Nav className="mr-auto">
        
      {/* <Link to={"fdonarlist"} className="nav-link">
          Filtered Donor List 
         </Link>

         <Link to={"fdonar"} className="nav-link">
          Filtered Donor 
         </Link> */}
        {/* <Link to={"donars"} className="nav-link">
          Donor Form
        </Link>
        <Link to={"donarlist"} className="nav-link">
          Donor List
        </Link>
        <Link to={"patients"} className="nav-link">
          Patient Form
        </Link>
        <Link to={"patientList"} className="nav-link">
          Patient List
        </Link>  */}
        
      </Nav>
      <Nav className="navbar-right">
        <Link to={"logout"} className="nav-link" onClick={logout}>
          <FontAwesomeIcon icon={faSignOutAlt} /> Logout
        </Link>
      </Nav>
    </>
  );

  return (
    <Navbar bg="dark" variant="dark">
      <Link to={auth.isLoggedIn ? "home" : ""} className="navbar-brand">
        <img
          src="https://image.shutterstock.com/image-vector/love-yourself-cute-cartoon-heart-600w-1176901459.jpg"
          // src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Book_icon_1.png"
          width="25"
          height="25"
          alt="brand"
        />{" "}
        Organ Donation Management System
      </Link>
      {auth.isLoggedIn ? userLinks : guestLinks}
    </Navbar>
    
     

    
  );
};

export default NavigationBar;
