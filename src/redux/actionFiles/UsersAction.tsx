//....................UserList...................

import { userDelete, usersData } from "../../services/UserServices";
import {
  FETCH_USERSDELETE_FAILURE,
  FETCH_USERSDELETE_REQUEST,
  FETCH_USERSDELETE_SUCCEESS,
  FETCH_USERSLIST_FAILURE,
  FETCH_USERSLIST_REQUEST,
  FETCH_USERSLIST_SUCCEESS,
} from "../typesFiles/UsersTypes";

export const fetchUserslistRequest = () => {
  return {
    type: FETCH_USERSLIST_REQUEST,
  };
};

export const fetchUserslistSuccess = (userList: any) => {
  return {
    type: FETCH_USERSLIST_SUCCEESS,
    payload: userList,
  };
};

export const fetchUserslistFailure = (error: any) => {
  return {
    type: FETCH_USERSLIST_FAILURE,
    payload: error,
  };
};

export const fetchUserslist = () => {
  return (dispatch: any) => {
    usersData()
      .then((response) => {
        if (response.status === 200) {
          dispatch(fetchUserslistSuccess(response.data));
        }
      })
      .catch((error) => {
        const errormsg = error.message;
        console.log(errormsg);

        dispatch(fetchUserslistFailure(errormsg));
      });
  };
};

//.......................Delete Users.................

export const fetchDeleteUsersRequest = () => {
  return {
    type: FETCH_USERSDELETE_REQUEST,
  };
};

const fetchDeleteUsersSuccess = (deleteUsers: any) => {
  return {
    type: FETCH_USERSDELETE_SUCCEESS,
    payload: deleteUsers,
  };
};

const fetchDeleteUsersFailure = (error: any) => {
  return {
    type: FETCH_USERSDELETE_FAILURE,
    payload: error,
  };
};

export const fetchDeleteUsers = (id: any) => {
  return (dispatch: any) => {
    userDelete(id)
      .then((response) => {
        const user = response.data;

        if (response.status === 200) {
          dispatch(fetchUserslist());
        }
      })
      .catch((error) => {
        const errormsg = error.message;
        console.log(errormsg);

        dispatch(fetchDeleteUsersFailure(errormsg));
      });
  };
};
