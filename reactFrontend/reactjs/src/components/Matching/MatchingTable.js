import React, { Component } from "react";
// import emailjs from '@emailjs/browser';

import { connect } from "react-redux";
import { deleteMatching } from "../../services/matching/matchingActions";
import {processMail} from "../../services/matching/matchingActions";

import "./../../assets/css/Style.css";
import {
  Card,
  Table,
  // Image,
  // ButtonGroup,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  // faEdit,
  // faTrash,
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

class MatchingTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matchings: [],
      search: "",
      currentPage: 1,
      matchingsPerPage: 5,
      sortDir: "asc",
    };
  }

  sortData = () => {
    setTimeout(() => {
      this.state.sortDir === "asc"
        ? this.setState({ sortDir: "desc" })
        : this.setState({ sortDir: "asc" });
      this.findAllmatchings(this.state.currentPage);
    }, 500);
  };

  componentDidMount() {
    this.findAllmatchings(this.state.currentPage);
  }

  findAllmatchings(currentPage) {
    currentPage -= 1;
    axios
      .get(
        "http://localhost:8081/rest/matchings?pageNumber=" +
          currentPage +
          "&pageSize=" +
          this.state.matchingsPerPage +
          "&sortBy=pname&sortDir=" +
          this.state.sortDir
      )
      .then((response) => response.data)
      .then((data) => {
        //console.log(data.content)
        this.setState({
          matchings: data.content,
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



// processMail = (matching) => {
//   this.props.processMail(matching);
//   var templateParams = {  
//     pname: matching.pname,
//     pmail: matching.pmail,
//     dmail: matching.dmail,
//     porgan: matching.porgan,
//     pbg: matching.pbg,
//     dname: matching.dname,
//     dcity: matching.dcity,
//     dcenter: matching.dcenter,
//     pcenter: matching.pcenter
//   };
//   emailjs.send('service_v89yq4i', 'template_3gp97f7', templateParams)
//     .then(function(response) {
//        console.log('SUCCESS!', response.status, response.text);
//     }, function(error) {
//        console.log('FAILED...', error);
//     });
// };




//

  

  deleteMatching = (matchId) => {
    this.props.deleteMatching(matchId);
    setTimeout(() => {
      if (this.props.donarObject != null) {
        this.setState({ show: true });
        setTimeout(() => this.setState({ show: false }), 3000);
        this.findAllmatchings(this.state.currentPage);
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
      this.findAllmatchings(targetPage);
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
        this.findAllmatchings(firstPage);
      }
    }
  };

  prevPage = () => {
    let prevPage = 1;
    if (this.state.currentPage > prevPage) {
      if (this.state.search) {
        this.searchData(this.state.currentPage - prevPage);
      } else {
        this.findAllmatchings(this.state.currentPage - prevPage);
      }
    }
  };

  lastPage = () => {
    let condition = Math.ceil(
      this.state.totalElements / this.state.matchingsPerPage
    );
    if (this.state.currentPage < condition) {
      if (this.state.search) {
        this.searchData(condition);
      } else {
        this.findAllmatchings(condition);
      }
    }
  };

  nextPage = () => {
    if (
      this.state.currentPage <
      Math.ceil(this.state.totalElements / this.state.matchingsPerPage)
    ) {
      if (this.state.search) {
        this.searchData(this.state.currentPage + 1);
      } else {
        this.findAllmatchings(this.state.currentPage + 1);
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
    this.findAllmatchings(this.state.currentPage);
  };

  searchData = (currentPage) => {
    currentPage -= 1;
    axios
      .get(
        "http://localhost:8081/rest/matchings/search/" +
          this.state.search +
          "?page=" +
          currentPage +
          "&size=" +
          this.state.matchingsPerPage
      )
      .then((response) => response.data)
      .then((data) => {
        this.setState({
          matchings: data.content,
          totalPages: data.totalPages,
          totalElements: data.totalElements,
          currentPage: data.number + 1,
        });
      });
  };

  render() {
    const { matchings, currentPage, totalPages, search } = this.state;

    return (
      <div>
        <div style={{ display: this.state.show ? "block" : "none" }}>
          <MyToast
            show={this.state.show}
            message={"Matching Deleted Successfully."}
            type={"danger"}
          />
        </div>
        <Card className={"border border-dark bg-dark text-white"}>
          <Card.Header>
            <div style={{ float: "left" }}>
              <FontAwesomeIcon icon={faList} /> Matching List
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
                   
                  <th onClick={this.sortData}>
                  Patient Name{" "}
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
                  <th>Patient Email</th>
                  <th>Donor Name</th>
                  {/* <th>Donor Email</th> */}
                  <th>Organ</th>
                  <th>Blood Group</th>
                  {/* <th>Patient City</th> */}
                  <th>Patient Center</th>
                  {/* <th>Donor City</th> */}
                  <th>Donor Center</th>
                   
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {matchings.length === 0 ? (
                  <tr align="center">
                    <td colSpan="7">No matchings Available.</td>
                  </tr>
                ) : (
                  matchings.map((matching) => (
                    <tr key={matching.matchid}>
                      <td>
                        {" "}
                        {matching.pname}
                      </td>
                      <td>{matching.pmail}</td>
                      <td>{matching.dname}</td>
                      {/* <td>{matching.dmail}</td> */}
                      <td>{matching.porgan}</td>
                      <td>{matching.pbg}</td>
                      {/* <td>{matching.pcity}</td> */}
                      <td>{matching.pcenter}</td>
                      {/* <td>{matching.dcity}</td> */}
                      <td>{matching.dcenter}</td>

                      
                       
                      <td>
                        {/* <ButtonGroup> */}
                          {/* <Link
                            to={"edit/" + matching.matching_id}    //edit changed to editDonar
                            className="btn btn-sm btn-outline-primary"
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </Link>{" "} */}
                          <Button
                            size="sm"
                            // variant="outline-danger"
                            onClick={() => processMail(matching)}
                          >
                            {/* <FontAwesomeIcon icon="fa-solid fa-box-archive" /> */}
                            <FontAwesomeIcon icon={faStepForward} />Save
                            {/* <FontAwesomeIcon icon={faTrash} /> */}
                          </Button>
                          


                        {/* </ButtonGroup> */}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </Card.Body>
          {matchings.length > 0 ? (
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
    donarObject: state.matching,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteMatching: (matchId) => dispatch(deleteMatching(matchId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MatchingTable);
