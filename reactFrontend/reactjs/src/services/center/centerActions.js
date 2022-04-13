import * as BT from "./centerTypes";
import axios from "axios";

export const saveDonar = (center) => {
  return (dispatch) => {
    dispatch({
      type: BT.SAVE_DONAR_REQUEST,
    });
    axios
      .post("http://localhost:8081/rest/centers", center)
      .then((response) => {
        dispatch(donarSuccess(response.data));
      })
      .catch((error) => {
        dispatch(donarFailure(error));
      });
  };
};

export const fetchDonar = (centerId) => {
  return (dispatch) => {
    dispatch({
      type: BT.FETCH_DONAR_REQUEST,
    });
    axios
      .get("http://localhost:8081/rest/centers/" + centerId )
      .then((response) => {
        dispatch(donarSuccess(response.data));
      })
      .catch((error) => {
        dispatch(donarFailure(error));
      });
  };
};

export const updateDonar = (center) => {
  return (dispatch) => {
    dispatch({
      type: BT.UPDATE_DONAR_REQUEST,
    });
    axios
      .put("http://localhost:8081/rest/centers", center)
      .then((response) => {
        dispatch(donarSuccess(response.data));
      })
      .catch((error) => {
        dispatch(donarFailure(error));
      });
  };
};

export const deleteDonar = (centerId) => {
  return (dispatch) => {
    dispatch({
      type: BT.DELETE_DONAR_REQUEST,
    });
    axios
      .delete("http://localhost:8081/rest/centers/" + centerId)
      .then((response) => {
        dispatch(donarSuccess(response.data));
      })
      .catch((error) => {
        dispatch(donarFailure(error));
      });
  };
};

const donarSuccess = (center) => {
  return {
    type: BT.DONAR_SUCCESS,
    payload: center,
  };
};

const donarFailure = (error) => {
  return {
    type: BT.DONAR_FAILURE,
    payload: error,
  };
};

 

//added for matching 

// export const saveMatch = (center) => {
//   return (dispatch) => {
//     dispatch({
//       type: BT.SAVE_DONAR_REQUEST,
//     });
//     const bg = center.bg;
//     const organ = center.organ;
//     const city = center.city; 
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