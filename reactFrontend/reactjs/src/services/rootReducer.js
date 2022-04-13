import { combineReducers } from "redux";
import userReducer from "./user/userReducer";
import authReducer from "./user/auth/authReducer";
// import bookReducer from "./book/bookReducer";

import donarReducer from "./donar/donarReducer";
import patientReducer from "./patient/patientReducer";

const rootReducer = combineReducers({
  user: userReducer,
  // book: bookReducer,
  auth: authReducer,
   
  donar: donarReducer,
  patient : patientReducer,

});

export default rootReducer;
