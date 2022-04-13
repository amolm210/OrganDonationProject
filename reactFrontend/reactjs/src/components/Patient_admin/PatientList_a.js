import React, { Component } from "react";

import { connect } from "react-redux";
import { deletePatient } from "../../services/patient/patientActions";

import "./../../assets/css/Style.css";
import {
  Card,
  Table,
  // Image,
  ButtonGroup,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  // faEdit,
  faTrash,
  faStepBackward,
  faFastBackward,
  faStepForward,
  faFastForward,
  faSearch,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
// import { Link } from "react-router-dom";
import MyToast from "../MyToast";
import axios from "axios";

class PatientList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patients: [],
      search: "",
      currentPage: 1,
      patientsPerPage: 5,
      sortDir: "asc",
    };
  }

  sortData = () => {
    setTimeout(() => {
      this.state.sortDir === "asc"
        ? this.setState({ sortDir: "desc" })
        : this.setState({ sortDir: "asc" });
      this.findAllPatients(this.state.currentPage);
    }, 500);
  };

  componentDidMount() {
    this.findAllPatients(this.state.currentPage);
  }

  findAllPatients(currentPage) {
    currentPage -= 1;
    axios
      .get(
        "http://localhost:8081/rest/patients?pageNumber=" +
          currentPage +
          "&pageSize=" +
          this.state.patientsPerPage +
          "&sortBy=email&sortDir=" +
          this.state.sortDir
      )
      .then((response) => response.data)
      .then((data) => {
        this.setState({
          patients: data.content,
          totalPages: data.totalPages,
          totalElements: data.totalElements,
          currentPage: data.number + 1,
        });
      })
      .catch((error) => {
        console.log(error);
        localStorage.removeItem("jwtToken");
        this.props.history.push("/");
      });
  }

  deletePatient = (patientId) => {
    this.props.deletePatient(patientId);
    setTimeout(() => {
      if (this.props.patientObject != null) {
        this.setState({ show: true });
        setTimeout(() => this.setState({ show: false }), 3000);
        this.findAllPatients(this.state.currentPage);
      } else {
        this.setState({ show: false });
      }
    }, 1000);
  };

  changePage = (event) => {
    let targetPage = parseInt(event.target.value);
    if (this.state.search) {
      this.searchData(targetPage);
    } else {
      this.findAllPatients(targetPage);
    }
    this.setState({
      [event.target.name]: targetPage,
    });
  };

  firstPage = () => {
    let firstPage = 1;
    if (this.state.currentPage > firstPage) {
      if (this.state.search) {
        this.searchData(firstPage);
      } else {
        this.findAllPatients(firstPage);
      }
    }
  };

  prevPage = () => {
    let prevPage = 1;
    if (this.state.currentPage > prevPage) {
      if (this.state.search) {
        this.searchData(this.state.currentPage - prevPage);
      } else {
        this.findAllPatients(this.state.currentPage - prevPage);
      }
    }
  };

  lastPage = () => {
    let condition = Math.ceil(
      this.state.totalElements / this.state.patientsPerPage
    );
    if (this.state.currentPage < condition) {
      if (this.state.search) {
        this.searchData(condition);
      } else {
        this.findAllPatients(condition);
      }
    }
  };

  nextPage = () => {
    if (
      this.state.currentPage <
      Math.ceil(this.state.totalElements / this.state.patientsPerPage)
    ) {
      if (this.state.search) {
        this.searchData(this.state.currentPage + 1);
      } else {
        this.findAllPatients(this.state.currentPage + 1);
      }
    }
  };

  searchChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  cancelSearch = () => {
    this.setState({ search: "" });
    this.findAllPatients(this.state.currentPage);
  };

  searchData = (currentPage) => {
    currentPage -= 1;
    axios
      .get(
        "http://localhost:8081/rest/patients/search/" +
          this.state.search +
          "?page=" +
          currentPage +
          "&size=" +
          this.state.patientsPerPage
      )
      .then((response) => response.data)
      .then((data) => {
        this.setState({
          patients: data.content,
          totalPages: data.totalPages,
          totalElements: data.totalElements,
          currentPage: data.number + 1,
        });
      });
  };

  render() {
    const { patients, currentPage, totalPages, search } = this.state;

    return (
      <div>
        <div style={{ display: this.state.show ? "block" : "none" }}>
          <MyToast
            show={this.state.show}
            message={"Patient Deleted Successfully."}
            type={"danger"}
          />
        </div>
        <Card className={"border border-dark bg-dark text-white"}>
          <Card.Header>
            <div style={{ float: "left" }}>
              <FontAwesomeIcon icon={faList} /> Patient List
            </div>
            <div style={{ float: "right" }}>
              <InputGroup size="sm">
                <FormControl
                  placeholder="Search"
                  name="search"
                  value={search}
                  className={"info-border bg-dark text-white"}
                  onChange={this.searchChange}
                />
                <InputGroup.Append>
                  <Button
                    size="sm"
                    variant="outline-info"
                    type="button"
                    onClick={this.searchData}
                  >
                    <FontAwesomeIcon icon={faSearch} />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    type="button"
                    onClick={this.cancelSearch}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </div>
          </Card.Header>
          <Card.Body>
            <Table bordered hover striped variant="dark">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>City</th>
                  <th>Contact</th>
                  <th onClick={this.sortData}>
                    Email{" "}
                    <div
                      className={
                        this.state.sortDir === "asc"
                          ? "arrow arrow-up"
                          : "arrow arrow-down"
                      }
                    >
                      {" "}
                    </div>
                  </th>
                  <th>Center</th>
                  <th>Gender</th>

                  <th>Organ</th>
                  <th>Blood</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients.length === 0 ? (
                  <tr align="center">
                    <td colSpan="7">No Patients Available.</td>
                  </tr>
                ) : (
                  patients.map((patient) => (
                    <tr key={patient.patient_id}>
                      <td>
                        {/* <Image
                          src={patient.coverPhotoURL}
                          roundedCircle
                          width="25"
                          height="25"
                        />{" "} */}
                        {patient.name}
                      </td>
                      <td>{patient.city}</td>
                      <td>{patient.mobile}</td>
                      <td>{patient.email}</td>
                      <td>{patient.language}</td>
                      <td>{patient.genre}</td>
                      <td>{patient.organ}</td>
                      <td>{patient.bg}</td>
                      <td>
                        <ButtonGroup>
                          {/* <Link
                            to={"editPatient/" + patient.patient_id}    //edit changed to editDonar
                            className="btn btn-sm btn-outline-primary"
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </Link>{" "} */}
                          <Button
                            size="sm"
                            variant="outline-danger"
                            onClick={() => this.deletePatient(patient.patient_id)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </Card.Body>
          {patients.length > 0 ? (
            <Card.Footer>
              <div style={{ float: "left" }}>
                Showing Page {currentPage} of {totalPages}
              </div>
              <div style={{ float: "right" }}>
                <InputGroup size="sm">
                  <InputGroup.Prepend>
                    <Button
                      type="button"
                      variant="outline-info"
                      disabled={currentPage === 1 ? true : false}
                      onClick={this.firstPage}
                    >
                      <FontAwesomeIcon icon={faFastBackward} /> First
                    </Button>
                    <Button
                      type="button"
                      variant="outline-info"
                      disabled={currentPage === 1 ? true : false}
                      onClick={this.prevPage}
                    >
                      <FontAwesomeIcon icon={faStepBackward} /> Prev
                    </Button>
                  </InputGroup.Prepend>
                  <FormControl
                    className={"page-num bg-dark"}
                    name="currentPage"
                    value={currentPage}
                    onChange={this.changePage}
                  />
                  <InputGroup.Append>
                    <Button
                      type="button"
                      variant="outline-info"
                      disabled={currentPage === totalPages ? true : false}
                      onClick={this.nextPage}
                    >
                      <FontAwesomeIcon icon={faStepForward} /> Next
                    </Button>
                    <Button
                      type="button"
                      variant="outline-info"
                      disabled={currentPage === totalPages ? true : false}
                      onClick={this.lastPage}
                    >
                      <FontAwesomeIcon icon={faFastForward} /> Last
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>
            </Card.Footer>
          ) : null}
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
    deletePatient: (patientId) => dispatch(deletePatient(patientId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientList);
