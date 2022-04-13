// import * as BT from "./donarTypes";
import * as BT from "./patientTypes";

const initialState = {
  patient: "",
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case BT.SAVE_PATIENT_REQUEST:
    case BT.FETCH_PATIENT_REQUEST:
    case BT.UPDATE_PATIENT_REQUEST:
    case BT.DELETE_PATIENT_REQUEST:
    case BT.FETCH_CENTERS_REQUEST:
    case BT.FETCH_GENDERS_REQUEST:
    case BT.FETCH_BGS_REQUEST:      // added for organ and bgs 
    case BT.FETCH_ORGANS_REQUEST:
    //
    
      return {
        ...state,
      };
    case BT.PATIENT_SUCCESS:
      return {
        patient: action.payload,
        error: "",
      };
    case BT.PATIENT_FAILURE:
      return {
        patient: "",
        error: action.payload,
      };
    case BT.CENTERS_SUCCESS:
      return {
        languages: action.payload,
        error: "",
      };
    case BT.CENTERS_FAILURE:
      return {
        languages: "",
        error: action.payload,
      };
    case BT.GENDERS_SUCCESS:
      return {
        genres: action.payload,
        error: "",
      };
    case BT.GENDERS_FAILURE:
      return {
        genres: "",
        error: action.payload,
      };

 // ADDED FOR BG AND ORGAN 
 case BT.BGS_SUCCESS:
  return {
    bgs: action.payload,
    error: "",
  };
case BT.BGS_FAILURE:
  return {
    bgs: "",
    error: action.payload,
  };
case BT.ORGANS_SUCCESS:
  return {
    organs: action.payload,
    error: "",
  };
case BT.ORGANS_FAILURE:
  return {
    organs: "",
    error: action.payload,
  };
//
default:
  return state;
}

 
};

export default reducer;
