import React from "react";
import { useSelector } from "react-redux";
import authToken from "../utils/authToken";
import { Alert } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Admin = () => {
  if (localStorage.jwtToken) {
    authToken(localStorage.jwtToken);
  }

  const auth = useSelector((state) => state.auth);

  return (
    <Alert style={{ backgroundColor: "#343A40", color: "#ffffff80" }}>
      Welcome {auth.username}
       
      
    
      <Nav className="mr-auto">
        
         
      <Link to={"donars_a"} className="nav-link">
          Donor Form
        </Link>
        <Link to={"donarList_a"} className="nav-link">
          Donor List
        </Link>
        <Link to={"patients_a"} className="nav-link">
          Patient Form
        </Link>
        <Link to={"patientList_a"} className="nav-link">
          Patient List
        </Link>
        <Link to={"center"} className="nav-link">
          Center  
        </Link> 
        <Link to={"centerList"} className="nav-link">
          Center List
        </Link> 
        {/* <Link to={"matching"} className="nav-link">
          Matching
        </Link>  */}
        <Link to={"matchingTable"} className="nav-link">
          Matching Table
        </Link> 
      </Nav>
      
      {/* <div className="mb-2">
    <Button variant="primary" size="lg">
      Donar List
    </Button>{'\t'}
    <Button variant="secondary" size="lg">
      Patient List
    </Button>
     
    </div> */}

    </Alert>
  );
};

export default Admin;
