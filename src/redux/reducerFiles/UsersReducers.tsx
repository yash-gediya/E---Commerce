//.........................UsersList..............

import {
  FETCH_USERSDELETE_FAILURE,
  FETCH_USERSDELETE_REQUEST,
  FETCH_USERSDELETE_SUCCEESS,
  FETCH_USERSLIST_FAILURE,
  FETCH_USERSLIST_REQUEST,
  FETCH_USERSLIST_SUCCEESS,
} from "../typesFiles/UsersTypes";

const initialStateUserslist = {
  loading: false,
  userlist: [],
  error: "",
};

export const UsersListReducer = (
  state: any = initialStateUserslist,
  action: any
) => {
  switch (action.type) {
    case FETCH_USERSLIST_FAILURE:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERSLIST_SUCCEESS:
      return {
        ...state,
        userList: action.payload,
        loading: false,
      };
    case FETCH_USERSLIST_REQUEST:
      return {
        loading: false,
        error: "",
      };
    default:
      return state;
  }
};

//........................Delete Users Reducer................

const initialStateDeleteusers = {
  loading: true,
  deleteproducts: [],
  error: "",
  meta: "",
};

export const deleteProductReducer = (
  state = initialStateDeleteusers,
  action: any
) => {
  switch (action.type) {
    case FETCH_USERSDELETE_FAILURE:
      return {
        ...state,
        loading: true,
      };

    case FETCH_USERSDELETE_REQUEST:
      return {
        ...state,
        loading: false,
        deleteUsers: action.payload.data,
        error: "",
      };

    case FETCH_USERSDELETE_SUCCEESS:
      return {
        loading: false,
        deleteproducts: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
