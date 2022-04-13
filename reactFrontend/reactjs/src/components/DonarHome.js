import React from "react";
import { useSelector } from "react-redux";
import authToken from "../utils/authToken";
import { Alert } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Card,CardImg,CardImgOverlay,CardTitle, CardText} from "reactstrap";

const DonarHome = () => {
  if (localStorage.jwtToken) {
    authToken(localStorage.jwtToken);
  }

  const auth = useSelector((state) => state.auth);

  return (

    <Card inverse className="cardHome"> 
    <CardImg
      alt="Card image cap"
      src="https://wallpapercave.com/wp/wp5826198.jpg"
      width="100%"
    />
    <CardImgOverlay>
      <CardTitle tag="h5">
        
      </CardTitle>
      <Alert style={{ backgroundColor: "#343A40", color: "#ffffff80" }}>
      Welcome {auth.username}

      <Nav className="mr-auto">
        
         
      <Link to={"donars"} className="nav-link">
      Donor Form
      </Link>
      <Link to={"donarlist"} className="nav-link">
       Donor List
      </Link>
        
      </Nav>
      


    </Alert>
    
    
       
    </CardImgOverlay>
  </Card>





    
    // <Alert style={{ backgroundColor: "#343A40", color: "#ffffff80" }}>
    //   Welcome {auth.username}
    
    //   <Nav className="mr-auto">
        
         
    //     <Link to={"donars"} className="nav-link">
    //       Donor Form
    //     </Link>
    //     <Link to={"donarlist"} className="nav-link">
    //       Donor List
    //     </Link>
        
    //   </Nav>
      
      

    // </Alert>
  );
};

export default DonarHome;
