import {
  FETCH_CARTLIST_FAILURE,
  FETCH_CARTLIST_REQUEST,
  FETCH_CARTLIST_SUCCEESS,
} from "../typesFiles/CartTypes";

const initialState = {
  loading: true,
  cart: [],
  error: "",
  meta: "",
};

const cartReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_CARTLIST_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FETCH_CARTLIST_SUCCEESS:
      return {
        ...state,
        cart: action.payload.data,
        meta: action.payload.meta,
        loading: false,
      };

    case FETCH_CARTLIST_FAILURE:
      return {
        loading: false,
        cart: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default cartReducer;
