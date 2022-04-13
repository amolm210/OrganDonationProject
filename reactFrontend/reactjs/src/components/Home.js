import React from "react";
import { useSelector } from "react-redux";
import authToken from "../utils/authToken";
import { Alert } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Card,CardImg,CardImgOverlay,CardTitle, CardText} from "reactstrap";
// import { css } from "../../src/assets/css/Style.css";

// import ReactCompareImage from 'react-compare-image';

const Home = () => {
  if (localStorage.jwtToken) {
    authToken(localStorage.jwtToken);
  }

  const auth = useSelector((state) => state.auth);

  return (

  <Card inverse className="cardHome"> 
    <CardImg
      alt="Card image cap"
      // src="/welcome.jpg"
      src="https://cdn.pixabay.com/photo/2022/01/15/13/21/digitization-6939537_960_720.jpg"
      width="100%"
    />
    <CardImgOverlay>
      <CardTitle tag="h5">
        
      </CardTitle>
      <Alert style={{ backgroundColor: "#343A40", color: "#ffffff80" }}>
      Welcome {auth.username}

      <Nav className="mr-auto">
        
         
        <Link to={"patients"} className="nav-link">
          Patient Form
        </Link>
        <Link to={"patientList"} className="nav-link">
          Patient List
        </Link>
        
      </Nav>
      


    </Alert>
    
    
       
    </CardImgOverlay>
  </Card>


















    // <Alert style={{ backgroundColor: "#343A40", color: "#ffffff80" }}>
    //   Welcome {auth.username}

    //   <Nav className="mr-auto">
        
         
    //     <Link to={"patients"} className="nav-link">
    //       Patient Form
    //     </Link>
    //     <Link to={"patientList"} className="nav-link">
    //       Patient List
    //     </Link>
        
    //   </Nav>
      


    // </Alert>
    
    

    // <ReactCompareImage leftImage="https://wallpaperaccess.com/full/138728.jpg" rightImage="https://wallpaperaccess.com/full/138730.jpg"  />

  );
};

export default Home;
