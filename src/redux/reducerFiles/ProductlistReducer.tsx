//........................Product list............

import {
  FETCH_PRODUCTLIST_REQUEST,
  FETCH_PRODUCTLIST_SUCCEESS,
  FETCH_PRODUCTLIST_FAILURE,
  FETCH_PRODUCTBYID_REQUEST,
  FETCH_PRODUCTBYID_SUCCEESS,
  FETCH_PRODUCTBYID_FAILURE,
} from "../../redux/typesFiles/ProductTypes";
import {
  FETCH_ADDPRODUCT_REQUEST,
  FETCH_ADDPRODUCT_SUCCEESS,
  FETCH_ADDPRODUCT_FAILURE,
} from "../../redux/typesFiles/ProductTypes";
import {
  FETCH_EDITPRODUCT_REQUEST,
  FETCH_EDITPRODUCT_SUCCEESS,
  FETCH_EDITPRODUCT_FAILURE,
} from "../../redux/typesFiles/ProductTypes";
import {
  FETCH_DELETEPRODUCT_REQUEST,
  FETCH_DELETEPRODUCT_SUCCEESS,
  FETCH_DELETEPRODUCT_FAILURE,
} from "../../redux/typesFiles/ProductTypes";

//.........................Productlist..............

const initialStateProductlist = {
  loading: false,
  productlist: [],
  isEdited: false,
  error: "",
  meta: "",
};

export const productlistReducer = (
  state: any = initialStateProductlist,
  action: any
) => {
  switch (action.type) {
    case FETCH_PRODUCTLIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PRODUCTLIST_SUCCEESS:
      return {
        ...state,
        productlist: action.payload.data,
        meta: action.payload.meta,
        loading: false,
      };
    case FETCH_PRODUCTLIST_FAILURE:
      return {
        loading: false,
        productlist: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

//........................ AddProduct ............

const initialStateAddProduct = {
  loading: true,
  addproducts: [],
  error: "",
  meta: "",
};

export const addProductReducer = (
  state = initialStateAddProduct,
  action: any
) => {
  switch (action.type) {
    case FETCH_ADDPRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FETCH_ADDPRODUCT_SUCCEESS:
      return {
        loading: false,
        addproducts: action.payload.data,
        meta: action.payload.meta,
        error: "",
      };

    case FETCH_ADDPRODUCT_FAILURE:
      return {
        loading: false,
        addproducts: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

//.........................Edit Product Reducer............

const initialStateEditProduct = {
  loading: true,
  editproducts: [],
  error: "",
  meta: "",
};

export const editProductReducer = (
  state = initialStateEditProduct,
  action: any
) => {
  switch (action.type) {
    case FETCH_EDITPRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FETCH_EDITPRODUCT_SUCCEESS:
      return {
        ...state,
        isEdited: true,
        loading: false,
        editproducts: action.payload.data,
        meta: action.payload.meta,
        error: "",
      };

    case FETCH_EDITPRODUCT_FAILURE:
      return {
        loading: false,
        editproducts: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

//........................Delete Product Reducer................

const initialStateDeleteProduct = {
  loading: true,
  deleteproducts: [],
  error: "",
  meta: "",
};

export const deleteProductReducer = (
  state = initialStateDeleteProduct,
  action: any
) => {
  switch (action.type) {
    case FETCH_DELETEPRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FETCH_DELETEPRODUCT_SUCCEESS:
      return {
        loading: false,
        deleteproducts: action.payload.data,
        meta: action.payload.meta,
        error: "",
      };

    case FETCH_DELETEPRODUCT_FAILURE:
      return {
        loading: false,
        deleteproducts: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

//........................Product add by id Reducer................

const initialStateProductAddByid = {
  loading: false,
  productlist: [],
  error: "",
  meta: "",
};

export const productlistByIdReducer = (
  state: any = initialStateProductAddByid,
  action: any
) => {
  switch (action.type) {
    case FETCH_PRODUCTBYID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PRODUCTBYID_SUCCEESS:
      return {
        ...state,
        productByid: action.payload.data,
        meta: action.payload.meta,
        loading: false,
      };
    case FETCH_PRODUCTBYID_FAILURE:
      return {
        loading: false,
        productByid: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
