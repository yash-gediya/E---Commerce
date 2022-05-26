import { Alert } from "antd";
//.................ProductList Action.............

import {
  FETCH_PRODUCTLIST_REQUEST,
  FETCH_PRODUCTLIST_SUCCEESS,
  FETCH_PRODUCTLIST_FAILURE,
  FETCH_PRODUCTBYID_REQUEST,
  FETCH_PRODUCTBYID_FAILURE,
  FETCH_PRODUCTBYID_SUCCEESS,
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
import axios from "axios";
import { Navigate } from "react-router-dom";
import {
  productAdd,
  productById,
  productDelete,
  productEdit,
  productList,
  statusChangeProductEdit,
} from "../../services/ProductServices";

interface ProductList {
  id?: number;
  productTitle: string;
  productImage: number;
  category: number;
  description: string;
  qty: number;
  price: number;
  isActive: boolean;
}
//....................Productlist...................

export const fetchProductlistRequest = () => {
  return {
    type: FETCH_PRODUCTLIST_REQUEST,
  };
};

export const fetchProductlistSuccess = (productlist: any) => {
  return {
    type: FETCH_PRODUCTLIST_SUCCEESS,
    payload: productlist,
  };
};

export const fetchProductlistFailure = (error: any) => {
  return {
    type: FETCH_PRODUCTLIST_FAILURE,
    payload: error,
  };
};

export const fetchProductlist = (query: any) => {
  return (dispatch: any) => {
    productList(query)
      .then((response) => {
        if (response.status === 200) {
          dispatch(fetchProductlistSuccess(response.data));
        }
      })
      .catch((error) => {
        const errormsg = error.message;
        console.log(errormsg);

        dispatch(fetchProductlistFailure(errormsg));
      });
  };
};

//........................AddProduct Action.....................

export const fetchAddProductRequest = () => {
  return {
    type: FETCH_ADDPRODUCT_REQUEST,
  };
};

const fetchAddProductSuccess = (addproducts: any) => {
  return {
    type: FETCH_ADDPRODUCT_SUCCEESS,
    payload: addproducts,
  };
};

const fetchAddProductFailure = (error: any) => {
  return {
    type: FETCH_ADDPRODUCT_FAILURE,
    payload: error,
  };
};

export const fetchAddProduct = (product: any, onSuccess: any) => {
  return (dispatch: any) => {
    productAdd(product)
      .then((response) => {
        const user = response.data;
        if (response.status === 200) {
          dispatch(fetchAddProductSuccess(user));
          <Alert message="Success Tips" type="success" showIcon />;

          onSuccess();
        }
      })
      .catch((error) => {
        const errormsg = error.message;
        console.log(errormsg);

        dispatch(fetchAddProductFailure(errormsg));
      });
  };
};

//..........................Edit Products.................

export const fetchEditProductRequest = () => {
  return {
    type: FETCH_EDITPRODUCT_REQUEST,
  };
};

const fetchEditProductSuccess = (editproducts: any) => {
  return {
    type: FETCH_EDITPRODUCT_SUCCEESS,
    payload: editproducts,
  };
};

const fetchEditProductFailure = (error: any) => {
  return {
    type: FETCH_EDITPRODUCT_FAILURE,
    payload: error,
  };
};

export const fetchEditProduct = (
  id: any,
  data: ProductList,
  onSuccess: any,
  query: any
) => {
  return (dispatch: any) => {
    productEdit(data, id, query)
      .then((response) => {
        const user = response.data;

        if (response.status === 200) {
          dispatch(fetchEditProductSuccess(user));
          onSuccess();
        }
      })
      .catch((error) => {
        const errormsg = error.message;
        console.log(errormsg);

        dispatch(fetchEditProductFailure(errormsg));
      });
  };
};

export const fetchEditProductStatus = (id: any, data: any, onSuccess: any) => {
  return (dispatch: any) => {
    statusChangeProductEdit(id, data)
      .then((response) => {
        const user = response.data;

        if (response.status === 200) {
          dispatch(fetchEditProductSuccess(user));
          dispatch(fetchProductlist);
          onSuccess();
        }
      })
      .catch((error) => {
        const errormsg = error.message;
        console.log(errormsg);

        dispatch(fetchEditProductFailure(errormsg));
      });
  };
};

//.......................Delete Products.................

export const fetchDeleteProductRequest = () => {
  return {
    type: FETCH_DELETEPRODUCT_REQUEST,
  };
};

const fetchDeleteProductSuccess = (editproducts: any) => {
  return {
    type: FETCH_DELETEPRODUCT_SUCCEESS,
    payload: editproducts,
  };
};

const fetchDeleteProductFailure = (error: any) => {
  return {
    type: FETCH_DELETEPRODUCT_FAILURE,
    payload: error,
  };
};

export const fetchDeleteProduct = (id: any, query: any) => {
  return (dispatch: any) => {
    productDelete(id)
      .then((response) => {
        const user = response.data;

        if (response.status === 200) {
          dispatch(fetchProductlist(query));
        }
      })
      .catch((error) => {
        const errormsg = error.message;
        console.log(errormsg);

        dispatch(fetchDeleteProductFailure(errormsg));
      });
  };
};

//......................product get by id.........
export const fetchProductGetByIdRequest = () => {
  return {
    type: FETCH_PRODUCTBYID_REQUEST,
  };
};

const fetchProductGetByIdSuccess = (productById: any) => {
  return {
    type: FETCH_PRODUCTBYID_SUCCEESS,
    payload: productById,
  };
};

const fetchProductGetByIdFailure = (error: any) => {
  return {
    type: FETCH_PRODUCTBYID_FAILURE,
    payload: error,
  };
};

export const fetchAddProductById = (id: any) => {
  return (dispatch: any) => {
    productById(id)
      .then((response) => {
        const user = response.data;

        if (response.status === 200) {
          dispatch(fetchProductGetByIdSuccess(response.data));
        }
      })
      .catch((error) => {
        const errormsg = error.message;
        console.log(errormsg);

        dispatch(fetchDeleteProductFailure(errormsg));
      });
  };
};
