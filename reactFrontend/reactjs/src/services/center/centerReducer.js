// import * as BT from "./centerTypes";
import * as BT from "./centerTypes";

const initialState = {
  center: "",
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case BT.SAVE_DONAR_REQUEST:
    case BT.FETCH_DONAR_REQUEST:
    case BT.UPDATE_DONAR_REQUEST:
    case BT.DELETE_DONAR_REQUEST:
    case BT.FETCH_CENTERS_REQUEST:
    case BT.FETCH_GENDERS_REQUEST:
    case BT.FETCH_BGS_REQUEST:      // added for organ and bgs 
    case BT.FETCH_ORGANS_REQUEST:
//

    //
      return {
        ...state,
      };
    case BT.DONAR_SUCCESS:
      return {
        center: action.payload,
        error: "",
      };
    case BT.DONAR_FAILURE:
      return {
        center: "",
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
    
    //
    default:
      return state;
  }
};

export default reducer;
