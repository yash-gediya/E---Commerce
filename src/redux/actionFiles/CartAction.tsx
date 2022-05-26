import { cartDetails } from "../../services/CartServices";
import {
  FETCH_CARTLIST_FAILURE,
  FETCH_CARTLIST_REQUEST,
  FETCH_CARTLIST_SUCCEESS,
} from "../typesFiles/CartTypes";

export const fetchCartlistRequest = () => {
  return {
    type: FETCH_CARTLIST_REQUEST,
  };
};

export const fetchCartlistSuccess = (cart: any) => {
  return {
    type: FETCH_CARTLIST_SUCCEESS,
    payload: cart,
  };
};

export const fetchCartlistFailure = (error: any) => {
  return {
    type: FETCH_CARTLIST_FAILURE,
    payload: error,
  };
};

export const fetchCartlist = (query: any) => {
  return (dispatch: any) => {
    cartDetails(query)
      .then((response: any) => {
        if (response.status === 200) {
          dispatch(fetchCartlistSuccess(response.data));
        }
      })
      .catch((error: any) => {
        dispatch(fetchCartlistFailure(error));
      });
  };
};
