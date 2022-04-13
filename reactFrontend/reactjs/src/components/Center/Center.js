import React, { Component } from "react";

import { connect } from "react-redux";
import {
  saveDonar,
  fetchDonar,
  updateDonar,
} from "../../services/center/centerActions";

import { Card, Form, Button, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSave,
  faPlusSquare,
  faUndo,
  faList,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import MyToast from "../MyToast";

class Center extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    // this.state = {
    //   genres: [],
    //   languages: [],
    //   organs: [],   // genres
    //   bgs: [],      //languages
    //   show: false,
    // };
  }

  initialState = {
    center_id: "",         //id
    name: "",             //title
    city: "",             //author
   
    mobile: "",          //isbnNumber   
     
  };

  componentDidMount() {
    const centerId = +this.props.match.params.center_id;
    if (centerId) {
      this.findDonarById(centerId);
    }
    // this.findAllCenters();
  }

   
  
 

  findDonarById = (centerId) => {
    this.props.fetchDonar(centerId);
    setTimeout(() => {
      let center = this.props.centerObject.center;
      if (center != null) {
        this.setState({
          center_id: center.center_id,
          name: center.name,
          city: center.city,
          dob: center.dob,
          mobile: center.mobile,
          age: center.age,
          language: center.language,
          genre: center.genre,
          bg: center.bg,
          organ: center.organ,
        });
      }
    }, 1000);
  };

  resetDonar = () => {
    this.setState(() => this.initialState);
  };

  submitDonar = (event) => {
    event.preventDefault();

    const center = {
      name: this.state.name,
      city: this.state.city,
      dob: this.state.dob,
      mobile: this.state.mobile,
      age: this.state.age,
      language: this.state.language,
      genre: this.state.genre,
      bg: this.state.bg,
      organ: this.state.organ,
    };

    this.props.saveDonar(center);
    setTimeout(() => {
      if (this.props.centerObject.center != null) {
        this.setState({ show: true, method: "post" });
        setTimeout(() => this.setState({ show: false }), 3000);
      } else {
        this.setState({ show: false });
      }
    }, 2000);
    this.setState(this.initialState);
  };

  updateDonar = (event) => {
    event.preventDefault();

    const center = {
      center_id: this.state.center_id,
      name: this.state.name,
      city: this.state.city,
      mobile: this.state.mobile,
       
    };
    this.props.updateDonar(center);
    setTimeout(() => {
      if (this.props.centerObject.center != null) {
        this.setState({ show: true, method: "put" });
        setTimeout(() => this.setState({ show: false }), 3000);
      } else {
        this.setState({ show: false });
      }
    }, 2000);
    this.setState(this.initialState);
  };

  donarChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  donarList = () => {
    return this.props.history.push("/centerList");
  };

  render() {
    const { name, city, mobile } =
      this.state;

    return (
      <div>
        <div style={{ display: this.state.show ? "block" : "none" }}>
          <MyToast
            show={this.state.show}
            message={
              this.state.method === "put"
                ? "Center Updated Successfully."
                : "Center Saved Successfully."
            }
            type={"success"}
          />
        </div>
        <Card className={"border border-dark bg-dark text-white"}>
          <Card.Header>
            <FontAwesomeIcon icon={this.state.center_id ? faEdit : faPlusSquare} />{" "}
            {this.state.center_id ? "Update Donar" : "Add Center Information"}
          </Card.Header>
          <Form
            onReset={this.resetDonar}
            onSubmit={this.state.center_id ? this.updateDonar : this.submitDonar}
            id="bookFormId"
          >
            <Card.Body>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridTitle">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"                    
                    type="test"
                    name="name"
                    value={name}
                    onChange={this.donarChange}
                    className={"bg-dark text-white"}
                    placeholder="Enter Your Name"
                  />
                 </Form.Group>
                  <Form.Group as={Col} controlId="formGridAuthor">
                  <Form.Label>City</Form.Label>
                   <Form.Control
                    required
                    autoComplete="off"
                    type="test"
                    name="city"
                    value={city}
                    onChange={this.donarChange}
                    className={"bg-dark text-white"}
                    placeholder="Enter City Name"
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                 
                <Form.Group as={Col} controlId="formGridISBNNumber">
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="test"
                    name="mobile"
                    value={mobile}
                    onChange={this.donarChange}
                    className={"bg-dark text-white"}
                    placeholder="Enter Contact Number"
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                 

 {/* added */}
 {/* // */}
              </Form.Row>
            </Card.Body>
            <Card.Footer style={{ textAlign: "right" }}>
              <Button size="sm" variant="success" type="submit">
                <FontAwesomeIcon icon={faSave} />{" "}
                {this.state.center_id ? "Update" : "Save"}
              </Button>{" "}
              <Button size="sm" variant="info" type="reset">
                <FontAwesomeIcon icon={faUndo} /> Reset
              </Button>{" "}
              <Button
                size="sm"
                variant="info"
                type="button"
                onClick={() => this.donarList()}
              >
                <FontAwesomeIcon icon={faList} /> Center List
              </Button>
            </Card.Footer>
          </Form>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    centerObject: state.center,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveDonar: (center) => dispatch(saveDonar(center)),
    fetchDonar: (centerId) => dispatch(fetchDonar(centerId)),
    updateDonar: (center) => dispatch(updateDonar(center)),
     
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Center);
