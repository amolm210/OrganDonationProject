import * as BT from "./matchingTypes";
import axios from "axios";
import emailjs from '@emailjs/browser';
// import sendgrid from "./sendgrid";
export const saveMatching = (matching) => {
  return (dispatch) => {
    dispatch({
      type: BT.SAVE_DONAR_REQUEST,
    });
    axios
      .post("http://localhost:8081/rest/matchings", matching)
      .then((response) => {
        dispatch(donarSuccess(response.data));
      })
      .catch((error) => {
        dispatch(donarFailure(error));
      });
  };
};

export const fetchMatching = (matchId) => {
  return (dispatch) => {
    dispatch({
      type: BT.FETCH_DONAR_REQUEST,
    });
    axios
      .get("http://localhost:8081/rest/matchings/" + matchId )
      .then((response) => {
        dispatch(donarSuccess(response.data));
      })
      .catch((error) => {
        dispatch(donarFailure(error));
      });
  };
};

export const updateMatching = (matching) => {
  return (dispatch) => {
    dispatch({
      type: BT.UPDATE_DONAR_REQUEST,
    });
    axios
      .put("http://localhost:8081/rest/matchings", matching)
      .then((response) => {
        dispatch(donarSuccess(response.data));
      })
      .catch((error) => {
        dispatch(donarFailure(error));
      });
  };
};

export const deleteMatching = (matchId) => {
  return (dispatch) => {
    dispatch({
      type: BT.DELETE_DONAR_REQUEST,
    });
    axios
      .delete("http://localhost:8081/rest/matchings/" + matchId)
      .then((response) => {
        dispatch(donarSuccess(response.data));
      })
      .catch((error) => {
        dispatch(donarFailure(error));
      });
  };
};

const donarSuccess = (matching) => {
  return {
    type: BT.DONAR_SUCCESS,
    payload: matching,
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
      .get("http://localhost:8081/rest/matchings/languages")
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
    .get("http://localhost:8081/rest/matchings/bgs")
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
      .get("http://localhost:8081/rest/matchings/genres")
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
      .get("http://localhost:8081/rest/matchings/organs")
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

// export const saveMatch = (matching) => {
//   return (dispatch) => {
//     dispatch({
//       type: BT.SAVE_DONAR_REQUEST,
//     });
//     const bg = matching.bg;
//     const organ = matching.organ;
//     const city = matching.city; 
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

 export function processMail(matching) {
//   const sgMail = require('@sendgrid/mail');
//   sgMail.setApiKey(process.env.SENDGRID_API_KEY);
//   const msg = {
//   to: 'harshalwagh530@gmail.com',
//   from: 'harshalwagh530@gmail.com', // Use the email address or domain you verified above
//   subject: 'Sending with Twilio SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
//   };
//   //ES6
//   sgMail
//   .send(msg)
//   .then(() => {}, error => {
//     console.error(error);

//     if (error.response) {
//       console.error(error.response.body)
//     }
//   });
  //ES8
//   (async () => {
//     try {
//       await sgMail.send(msg);
//     } catch (error) {
//       console.error(error);

//     if (error.response) {
//       console.error(error.response.body)
//     }
//   }
// })();





  var templateParams = {  
    pname: matching.pname,
    porgan: matching.porgan,
    pbg: matching.pbg,
    dname: matching.dname,
    dcity: matching.dcity,
    dcenter: matching.dcenter,
    pcenter: matching.pcenter,
    pmail: matching.pmail
  };
  emailjs.send('service_v89yq4i', 'template_3gp97f7', templateParams, 'ih0vvgfA8guBLawfV')
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
       console.log('FAILED...', error);
    });
};