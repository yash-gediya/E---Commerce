import {
  FETCH_LOGIN_FAILURE,
  FETCH_LOGIN_REQUEST,
  FETCH_LOGIN_SUCCEESS,
} from "../typesFiles/LoginTypes";

const initialState = {
  loading: true,
  users: [],
  error: "",
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FETCH_LOGIN_SUCCEESS:
      return {
        loading: false,
        users: action.payload,
        error: "",
      };

    case FETCH_LOGIN_FAILURE:
      return {
        loading: false,
        users: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
