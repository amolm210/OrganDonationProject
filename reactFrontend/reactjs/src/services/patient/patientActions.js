import * as BT from "./patientTypes";
import axios from "axios";

export const savePatient = (patient) => {
  return (dispatch) => {
    dispatch({
      type: BT.SAVE_PATIENT_REQUEST,
    });
    axios
      .post("http://localhost:8081/rest/patients", patient)
      .then((response) => {
        dispatch(patientSuccess(response.data));
      })
      .catch((error) => {
        dispatch(patientFailure(error));
      });
  };
};

export const fetchPatient = (patientId) => {
  return (dispatch) => {
    dispatch({
      type: BT.FETCH_PATIENT_REQUEST,
    });
    axios
      .get("http://localhost:8081/rest/patients/" + patientId)
      .then((response) => {
        dispatch(patientSuccess(response.data));
      })
      .catch((error) => {
        dispatch(patientFailure(error));
      });
  };
};

export const updatePatient = (patient) => {
  return (dispatch) => {
    dispatch({
      type: BT.UPDATE_PATIENT_REQUEST,
    });
    axios
      .put("http://localhost:8081/rest/patients", patient)
      .then((response) => {
        dispatch(patientSuccess(response.data));
      })
      .catch((error) => {
        dispatch(patientFailure(error));
      });
  };
};

export const deletePatient = (patientId) => {
  return (dispatch) => {
    dispatch({
      type: BT.DELETE_PATIENT_REQUEST,
    });
    axios
      .delete("http://localhost:8081/rest/patients/" + patientId)
      .then((response) => {
        dispatch(patientSuccess(response.data));
      })
      .catch((error) => {
        dispatch(patientFailure(error));
      });
  };
};

const patientSuccess = (patient) => {
  return {
    type: BT.PATIENT_SUCCESS,
    payload: patient,
  };
};

const patientFailure = (error) => {
  return {
    type: BT.PATIENT_FAILURE,
    payload: error,
  };
};


export const fetchCenters = () => {
  return (dispatch) => {
    dispatch({
      type: BT.FETCH_CENTERS_REQUEST,
    });
    axios
      .get("http://localhost:8081/rest/patients/languages")
      .then((response) => {
        dispatch({
          type: BT.CENTERS_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: BT.CENTERS_FAILURE,
          payload: error,
        });
      });
  };
};


// added for blood group 
export const fetchBgs = () => {
  return (dispatch) => {
    dispatch({
      type: BT.FETCH_BGS_REQUEST,
    });
    axios
    .get("http://localhost:8081/rest/patients/bgs")
      .then((response) => {
        dispatch({
          type: BT.BGS_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: BT.BGS_FAILURE,
          payload: error,
        });
      });
  };
};

//



export const fetchGenders = () => {
  return (dispatch) => {
    dispatch({
      type: BT.FETCH_GENDERS_REQUEST,
    });
    axios
      .get("http://localhost:8081/rest/patients/genres")
      .then((response) => {
        dispatch({
          type: BT.GENDERS_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: BT.GENDERS_FAILURE,
          payload: error,
        });
      });
  };
};

 
// added for organs 
export const fetchOrgans = () => {
  return (dispatch) => {
    dispatch({
      type: BT.FETCH_ORGANS_REQUEST,
    });
    axios
      .get("http://localhost:8081/rest/patients/organs")
      .then((response) => {
        dispatch({
          type: BT.ORGANS_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: BT.ORGANS_FAILURE,
          payload: error,
        });
      });
  };
};
//