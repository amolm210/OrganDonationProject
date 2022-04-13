import * as BT from "./donarTypes";
import axios from "axios";

export const saveDonar = (donar) => {
  return (dispatch) => {
    dispatch({
      type: BT.SAVE_DONAR_REQUEST,
    });
    axios
      .post("http://localhost:8081/rest/donars", donar)
      .then((response) => {
        dispatch(donarSuccess(response.data));
      })
      .catch((error) => {
        dispatch(donarFailure(error));
      });
  };
};

export const fetchDonar = (donarId) => {
  return (dispatch) => {
    dispatch({
      type: BT.FETCH_DONAR_REQUEST,
    });
    axios
      .get("http://localhost:8081/rest/donars/" + donarId )
      .then((response) => {
        dispatch(donarSuccess(response.data));
      })
      .catch((error) => {
        dispatch(donarFailure(error));
      });
  };
};

export const updateDonar = (donar) => {
  return (dispatch) => {
    dispatch({
      type: BT.UPDATE_DONAR_REQUEST,
    });
    axios
      .put("http://localhost:8081/rest/donars", donar)
      .then((response) => {
        dispatch(donarSuccess(response.data));
      })
      .catch((error) => {
        dispatch(donarFailure(error));
      });
  };
};

export const deleteDonar = (donarId) => {
  return (dispatch) => {
    dispatch({
      type: BT.DELETE_DONAR_REQUEST,
    });
    axios
      .delete("http://localhost:8081/rest/donars/" + donarId)
      .then((response) => {
        dispatch(donarSuccess(response.data));
      })
      .catch((error) => {
        dispatch(donarFailure(error));
      });
  };
};

const donarSuccess = (donar) => {
  return {
    type: BT.DONAR_SUCCESS,
    payload: donar,
  };
};

const donarFailure = (error) => {
  return {
    type: BT.DONAR_FAILURE,
    payload: error,
  };
};


export const fetchCenters = () => {
  return (dispatch) => {
    dispatch({
      type: BT.FETCH_CENTERS_REQUEST,
    });
    axios
      .get("http://localhost:8081/rest/donars/languages")
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
    .get("http://localhost:8081/rest/donars/bgs")
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
      .get("http://localhost:8081/rest/donars/genres")
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
      .get("http://localhost:8081/rest/donars/organs")
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
 

//added for matching 

// export const saveMatch = (donar) => {
//   return (dispatch) => {
//     dispatch({
//       type: BT.SAVE_DONAR_REQUEST,
//     });
//     const bg = donar.bg;
//     const organ = donar.organ;
//     const city = donar.city; 
//     axios
//       .post("http://localhost:8081/rest/fdonar", {
//         blood : bg,
//         city : city,
//         organ : organ})
//       .then((response) => {
//         dispatch(donarSuccess(response.data));
//       })
//       .catch((error) => {
//         dispatch(donarFailure(error));
//       });
//   };
// };

// 

// added for cities

export const fetchCities = () => {
  return (dispatch) => {
    dispatch({
      type: BT.FETCH_CENTERS_REQUEST,
    });
    axios
      .get("http://localhost:8081/rest/donars/cities")
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
