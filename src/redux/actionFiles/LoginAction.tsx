import {
  FETCH_LOGIN_FAILURE,
  FETCH_LOGIN_REQUEST,
  FETCH_LOGIN_SUCCEESS,
} from "../typesFiles/LoginTypes";
import { loginData } from "../../services/LoginServices";

export const fetchloginRequest = () => {
  return {
    type: FETCH_LOGIN_REQUEST,
  };
};

const fetchloginSuccess = (users: any) => {
  return {
    type: FETCH_LOGIN_SUCCEESS,
    payload: users,
  };
};

const fetchloginFailure = (error: any) => {
  return {
    type: FETCH_LOGIN_FAILURE,
    payload: error,
  };
};

export const fetchlogin = (data: any, onSuccess: any) => {
  return (dispatch: any) => {
    loginData(data)
      .then((response) => {
        const user = response.data;

        if (response.request.status === 200) {
          localStorage.setItem("jwt", response.data.jwt);

          dispatch(fetchloginSuccess(user));
          onSuccess();
        }
      })
      .catch((error) => {
        const errormsg = error.message;
        console.log(errormsg);

        dispatch(fetchloginFailure(errormsg));
      });
  };
};
