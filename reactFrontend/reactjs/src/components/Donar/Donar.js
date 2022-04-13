import React, { Component } from "react";

import { connect } from "react-redux";
import {
  saveDonar,
  fetchDonar,
  updateDonar,
  fetchCenters,
  fetchGenders,
  fetchBgs,
  fetchOrgans,  
} from "../../services/index";

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

class Donar extends Component {
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
    donar_id: "",         //id
    name: "",             //title
    city: "",             //author
    dob: "",    //coverPhotoURL
    mobile: "",          //isbnNumber   
    email: "",             //price
    language: "",        /*language*/
    genre: "",           /*genre*/
    organ: "",        /*new*/
    bg: "",           /*new*/
  };

  componentDidMount() {
    const donarId = +this.props.match.params.donar_id;
    if (donarId) {
      this.findDonarById(donarId);
    }
    this.findAllCenters();
  }

  findAllCenters = () => {
    this.props.fetchCenters();
    setTimeout(() => {
      let donarCenters = this.props.donarObject.languages;
      if (donarCenters) {
        this.setState({
          languages: [{ value: "", display: "Select Center" }].concat(
            donarCenters.map((language) => {
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
      let donarGenders = this.props.donarObject.genres;
      if (donarGenders) {
        this.setState({
          genres: [{ value: "", display: "Select Gender" }].concat(
            donarGenders.map((genre) => {
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
    let donarBgs = this.props.donarObject.bgs;
    if (donarBgs) {
      this.setState({
        bgs: [{ value: "", display: "Select Blood group" }].concat(
          donarBgs.map((bg) => {
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
    let donarOrgans = this.props.donarObject.organs;
    if (donarOrgans) {
      this.setState({
        organs: [{ value: "", display: "Select Organ" }].concat(
          donarOrgans.map((organ) => {
            return { value: organ, display: organ };
          })
        ),
      });
    }
  }, 100);
};
//

  findDonarById = (donarId) => {
    this.props.fetchDonar(donarId);
    setTimeout(() => {
      let donar = this.props.donarObject.donar;
      if (donar != null) {
        this.setState({
          donar_id: donar.donar_id,
          name: donar.name,
          city: donar.city,
          dob: donar.dob,
          mobile: donar.mobile,
          email: donar.email,
          language: donar.language,
          genre: donar.genre,
          bg: donar.bg,
          organ: donar.organ,
        });
      }
    }, 1000);
  };

  resetDonar = () => {
    this.setState(() => this.initialState);
  };

  submitDonar = (event) => {
    event.preventDefault();

    const donar = {
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

    this.props.saveDonar(donar);
    setTimeout(() => {
      if (this.props.donarObject.donar != null) {
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

    const donar = {
      donar_id: this.state.donar_id,
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
    this.props.updateDonar(donar);
    setTimeout(() => {
      if (this.props.donarObject.donar != null) {
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
    return this.props.history.push("/donarlist");
  };

  render() {
    const { name, city, dob, mobile, email, language, genre, bg , organ } =
      this.state;

    return (
      <div>
        <div style={{ display: this.state.show ? "block" : "none" }}>
          <MyToast
            show={this.state.show}
            message={
              this.state.method === "put"
                ? "Donar Updated Successfully."
                : "Donar Saved Successfully."
            }
            type={"success"}
          />
        </div>
        <Card className={"border border-dark bg-dark text-white"}>
          <Card.Header>
            <FontAwesomeIcon icon={this.state.donar_id ? faEdit : faPlusSquare} />{" "}
            {this.state.donar_id ? "Update Donar" : "Add Donar Information"}
          </Card.Header>
          <Form
            onReset={this.resetDonar}
            onSubmit={this.state.donar_id ? this.updateDonar : this.submitDonar}
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
                <Form.Group as={Col} controlId="formGridCoverPhotoURL">
                  <Form.Label>Date of Birth</Form.Label>
                  <InputGroup>
                    <Form.Control
                      required
                      autoComplete="off"
                      type="test"
                      name="dob"
                      value={dob}
                      onChange={this.donarChange}
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
                    onChange={this.donarChange}
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
                    onChange={this.donarChange}
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
                    onChange={this.donarChange}
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
                    onChange={this.donarChange}
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
                    onChange={this.donarChange}
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
                    onChange={this.donarChange}
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
                {this.state.donar_id ? "Update" : "Save"}
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
                <FontAwesomeIcon icon={faList} /> Donar List
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
    donarObject: state.donar,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveDonar: (donar) => dispatch(saveDonar(donar)),
    fetchDonar: (donarId) => dispatch(fetchDonar(donarId)),
    updateDonar: (donar) => dispatch(updateDonar(donar)),
    fetchCenters: () => dispatch(fetchCenters()),
    fetchGenders: () => dispatch(fetchGenders()),
    fetchBgs: () => dispatch(fetchBgs()),
    fetchOrgans: () => dispatch(fetchOrgans()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Donar);
