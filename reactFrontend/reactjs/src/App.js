import React from "react";
import "./App.css";

import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavigationBar from "./components/NavigationBar";
import Welcome from "./components/Welcome";
// import Contact from "./components/Contact";
 
 
import UserList from "./components/User/UserList";
import Register from "./components/User/Register";
import Login from "./components/User/Login";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Admin from "./components/Admin";
import DonarHome from "./components/DonarHome";
import Matching from "./components/Matching/Matching";
import MatchingTable from "./components/Matching/MatchingTable";


import Donar from "./components/Donar/Donar";
 
import DonarList from "./components/Donar/DonarList";
// import FDonarList from "./components/Donar/filtered_donarlist";
// import FDonar from "./components/Donar/filterd_Donar";

 


import Patient from "./components/Patient/Patient";
import PatientList from "./components/Patient/PatientList";

// import Donar from "./components/Donar/Donar";
// import Donar from "./components/Donar_admin/DonarList_a";
import Donar_a from "./components/Donar_admin/Donar_a";
import DonarList_a from "./components/Donar_admin/DonarList_a";
import Patient_a from "./components/Patient_admin/Patient_a";
import PatientList_a from "./components/Patient_admin/PatientList_a";
import Center from "./components/Center/Center";
import CenterList from "./components/Center/CenterList";


const App = () => {
  window.onbeforeunload = (event) => {
    const e = event || window.event;
    e.preventDefault();
    if (e) {
      e.returnValue = "";
    }
    return "";
  };

  return (
    <Router>
      <NavigationBar />
      <Container>
        <Row>
          <Col lg={12} className={"margin-top"}>
          
            <Switch>
              <Route path="/" exact component={Welcome} />
              <Route path="/home" exact component={Home} />
              {/* <Route path="/add" exact component={Book} /> */}
              
              <Route path="/donars" exact component={Donar} />
              <Route path="/donarlist" exact component={DonarList} />
             
              <Route path="/donars_a" exact component={Donar_a} />
              <Route path="/donarList_a" exact component={DonarList_a} />

              <Route path="/patients" exact component={Patient} />
              <Route path="/patientList" exact component={PatientList} />
              
              <Route path="/patients_a" exact component={Patient_a} />
              <Route path="/patientList_a" exact component={PatientList_a} />
              {/* <Route path="/about" exact component={About} /> */}
              
               
              {/* <Route path="/fdonarlist" exact component={FDonarList} />

              <Route path="/fdonar" exact component={FDonar} /> */}
               {/* <Route path="/Contact" exact component={Contact} /> */}
              {/* <Route path="/edit/:id" exact component={Book} />*/}
              <Route path="/edit/:id" exact component={Donar} />
              <Route path="/editPatient/:id" exact component={Patient} />
              {/* <Route path="/list" exact component={BookList} /> */}
              <Route path="/users" exact component={UserList} />
              <Route path="/register" exact component={Register} />
              <Route path="/login" exact component={Login} />
              <Route path="/admin" exact component={Admin} />
              <Route path="/donarhome" exact component={DonarHome} />
              <Route path="/center" exact component={Center} />
              <Route path="/centerList" exact component={CenterList} />
              <Route path="/matching" exact component={Matching} />
              <Route path="/matchingTable" exact component={MatchingTable} />              
              <Route
                path="/logout"
                exact
                component={() => (
                  <Login message="User Logged Out Successfully." />
                )}
              />
            </Switch>
          </Col>
        </Row>
      </Container>
      <Footer />
    </Router>
  );
};

export default App;
