import React, { Component } from "react";
 

import { connect } from "react-redux";
import {
  savePatient,
  fetchPatient,
  updatePatient,
  fetchCenters,
  fetchGenders,
  fetchBgs,
  fetchOrgans,   
} from "../../services/patient/patientActions";

import { Card, Form, Button, Col, InputGroup, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSave,
  faPlusSquare,
  faUndo,
  faList,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import MyToast from "../MyToast";

class Patient extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.state = {
      genres: [],
      languages: [],
      organs: [],   // genres
      bgs: [],      //languages
      show: false,
    };
  }

  initialState = {
    patient_id: "",         //id
    name: "",             //title
    city: "",             //author
    dob: "",              //coverPhotoURL
    mobile: "",           //isbnNumber   
    email: "",              //price
    language: "",         /*language*/
    genre: "",            /*genre*/
    organ: "",        /*new*/
    bg: "",           /*new*/
  };

  componentDidMount() {
    const patientId = +this.props.match.params.patient_id;
    if (patientId) {
      this.findPatientById(patientId);
    }
    this.findAllCenters();
  }

  findAllCenters = () => {
    this.props.fetchCenters();
    setTimeout(() => {
      let patientCenters = this.props.patientObject.languages;
      if (patientCenters) {
        this.setState({
          languages: [{ value: "", display: "Select Center" }].concat(
            patientCenters.map((language) => {
              return { value: language, display: language };
            })
          ),
        });
        this.findAllGenders();
      }
    }, 100);
  };

  findAllGenders = () => {
    this.props.fetchGenders();
    setTimeout(() => {
      let patientGenders = this.props.patientObject.genres;
      if (patientGenders) {
        this.setState({
          genres: [{ value: "", display: "Select Gender" }].concat(
            patientGenders.map((genre) => {
              return { value: genre, display: genre };
            })
          ),
        });
        this.findAllBgs();
      }
    }, 100);
  };

  
// added 
findAllBgs = () => {
  this.props.fetchBgs();
  setTimeout(() => {
    let patientBgs = this.props.patientObject.bgs;
    if (patientBgs) {
      this.setState({
        bgs: [{ value: "", display: "Select Blood group" }].concat(
          patientBgs.map((bg) => {
            return { value: bg, display: bg };
          })
        ),
      });
      this.findAllOrgans();
    }
  }, 100);
};

// 


// added for organs 
findAllOrgans = () => {
  this.props.fetchOrgans();
  setTimeout(() => {
    let patientOrgans = this.props.patientObject.organs;
    if (patientOrgans) {
      this.setState({
        organs: [{ value: "", display: "Select Organ" }].concat(
          patientOrgans.map((organ) => {
            return { value: organ, display: organ };
          })
        ),
      });
    }
  }, 100);
};
//




  findPatientById = (patientId) => {
    this.props.fetchPatient(patientId);
    setTimeout(() => {
      let patient = this.props.patientObject.patient;
      if (patient != null) {
        this.setState({
          patient_id: patient.patient_id,
          name: patient.name,
          city: patient.city,
          dob: patient.dob,
          mobile: patient.mobile,
          email: patient.email,
          language: patient.language,
          genre: patient.genre,
          bg: patient.bg,
          organ: patient.organ,
        });
      }
    }, 1000);
  };

  resetPatient = () => {
    this.setState(() => this.initialState);
  };

  submitPatient = (event) => {
    event.preventDefault();

    const patient = {
      name: this.state.name,
      city: this.state.city,
      dob: this.state.dob,
      mobile: this.state.mobile,
      email: this.state.email,
      language: this.state.language,
      genre: this.state.genre,
      bg: this.state.bg,
      organ: this.state.organ,
    };

    this.props.savePatient(patient);
    setTimeout(() => {
      if (this.props.patientObject.patient != null) {
        this.setState({ show: true, method: "post" });
        setTimeout(() => this.setState({ show: false }), 3000);
      } else {
        this.setState({ show: false });
      }
    }, 2000);
    this.setState(this.initialState);
  };

  updatePatient = (event) => {
    event.preventDefault();

    const patient = {
      patient_id: this.state.patient_id,
      name: this.state.name,
      city: this.state.city,
      dob: this.state.dob,
      mobile: this.state.mobile,
      email: this.state.email,
      language: this.state.language,
      genre: this.state.genre,
      bg: this.state.bg,
      organ: this.state.organ,
    };
    this.props.updatePatient(patient);
    setTimeout(() => {
      if (this.props.patientObject.patient != null) {
        this.setState({ show: true, method: "put" });
        setTimeout(() => this.setState({ show: false }), 3000);
      } else {
        this.setState({ show: false });
      }
    }, 2000);
    this.setState(this.initialState);
  };

  patientChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  patientList = () => {
    return this.props.history.push("/patientlist");
  };

  render() {
    const { name, city, dob, mobile, email, language, genre ,bg , organ } =
      this.state; 

       
    return (
      
      <div>
        
        <div style={{ display: this.state.show ? "block" : "none" }}>
          <MyToast
            show={this.state.show} 
            message={
              this.state.method === "put"
                ? "Patient Updated Successfully."
                : "Patient Saved Successfully."
            }
            type={"success"}
          />
        </div>
        <Card className={"border border-dark bg-dark text-white"}>
          <Card.Header>
            <FontAwesomeIcon icon={this.state.patient_id ? faEdit : faPlusSquare} />{" "}
            {this.state.patient_id ? "Update Patient" : "Add Patient Information"}
          </Card.Header>
          <Form
            onReset={this.resetPatient}
            onSubmit={this.state.patient_id ? this.updatePatient : this.submitPatient}
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
                    // value={localStorage.email}
                    // defaultValue={localStorage.email}
                    onChange={this.patientChange}
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
                    onChange={this.patientChange}
                    className={"bg-dark text-white"}
                    placeholder="Enter City Name"
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridCoverPhotoURL">
                  <Form.Label>Date of Birth</Form.Label>
                  <InputGroup>
                    <Form.Control
                      required
                      autoComplete="off"
                      type="test"
                      name="dob"
                      value={dob}
                      onChange={this.patientChange}
                      className={"bg-dark text-white"}
                      placeholder="Enter Date of Birth"
                    />
                    <InputGroup.Append>
                      {this.state.dob !== "" && (
                        <Image
                          src={this.state.dob}
                          roundedRight
                          width="40"
                          height="38"
                        />
                      )}
                    </InputGroup.Append>
                  </InputGroup>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridISBNNumber">
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="test"
                    name="mobile"
                    value={mobile}
                    onChange={this.patientChange}
                    className={"bg-dark text-white"}
                    placeholder="Enter Contact Number"
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridPrice">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="test"
                    name="email"
                    value={email}
                    onChange={this.patientChange}
                    className={"bg-dark text-white"}
                    placeholder={localStorage.email}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridLanguage">
                  <Form.Label>Center</Form.Label>
                  <Form.Control
                    required
                    as="select"
                    custom
                    onChange={this.patientChange}
                    name="language"
                    value={language}
                    className={"bg-dark text-white"}
                  >
                    {this.state.languages.map((language) => (
                      <option key={language.value} value={language.value}>
                        {language.display}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

{/* added */}
<Form.Group as={Col} controlId="formGridBg">
                  <Form.Label>Blood Group</Form.Label>
                  <Form.Control
                    required
                    as="select"
                    custom
                    onChange={this.patientChange}
                    name="bg"
                    value={bg}
                    className={"bg-dark text-white"}
                  >
                    {this.state.bgs.map((bg) => (
                      <option key={bg.value} value={bg.value}>
                        {bg.display}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
{/* // */}

                <Form.Group as={Col} controlId="formGridGenre">
                  <Form.Label>Gender</Form.Label>
                  <Form.Control
                    required
                    as="select"
                    custom
                    onChange={this.patientChange}
                    name="genre"
                    value={genre}
                    className={"bg-dark text-white"}
                  >
                    {this.state.genres.map((genre) => (
                      <option key={genre.value} value={genre.value}>
                        {genre.display}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

{/* // for organ  */}
                  <Form.Group as={Col} controlId="formGridOrgan">
                  <Form.Label>Organ Name</Form.Label>
                  <Form.Control
                    required
                    as="select"
                    custom
                    onChange={this.patientChange}
                    name="organ"
                    value={organ}
                    className={"bg-dark text-white"}
                  >
                    {this.state.organs.map((organ) => (
                      <option key={organ.value} value={organ.value}>
                        {organ.display}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
{/* // */}


              </Form.Row>
            </Card.Body>
            <Card.Footer style={{ textAlign: "right" }}>
              <Button size="sm" variant="success" type="submit">
                <FontAwesomeIcon icon={faSave} />{" "}
                {this.state.patient_id ? "Update" : "Save"}
              </Button>{" "}
              <Button size="sm" variant="info" type="reset">
                <FontAwesomeIcon icon={faUndo} /> Reset
              </Button>{" "}
              <Button
                size="sm"
                variant="info"
                type="button"
                onClick={() => this.patientList()}
              >
                <FontAwesomeIcon icon={faList} /> Patient List
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
    patientObject: state.patient,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    savePatient: (patient) => dispatch(savePatient(patient)),
    fetchPatient: (patientId) => dispatch(fetchPatient(patientId)),
    updatePatient: (patient) => dispatch(updatePatient(patient)),
    fetchCenters: () => dispatch(fetchCenters()),
    fetchGenders: () => dispatch(fetchGenders()),
    fetchBgs: () => dispatch(fetchBgs()),
    fetchOrgans: () => dispatch(fetchOrgans()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Patient);
