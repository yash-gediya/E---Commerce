import {
  FETCH_CATEGORY_FAILURE,
  FETCH_CATEGORY_REQUEST,
  FETCH_CATEGORY_SUCCEESS,
} from "../typesFiles/CategoryTypes";
import {
  categoryAdd,
  categoryDelete,
  categoryEdit,
  categoryList,
} from "../../services/CategoryServices";

export const fetchcategoryRequest = () => {
  return {
    type: FETCH_CATEGORY_REQUEST,
  };
};

const fetchcategorySuccess = (category: any) => {
  return {
    type: FETCH_CATEGORY_SUCCEESS,
    payload: category,
  };
};

const fetchcategoryFailure = (error: any) => {
  return {
    type: FETCH_CATEGORY_FAILURE,
    payload: error,
  };
};

//<---------------------------------Fetch Category----------------------

export const fetchcategory = (query: any) => {
  return (dispatch: any) => {
    dispatch(fetchcategoryRequest);
    categoryList(query)
      .then((response) => {
        const resp = response.data;
        if (response?.status === 200) {
          dispatch(fetchcategorySuccess(resp));
        } else {
          dispatch(fetchcategoryFailure(resp.message));
        }
      })
      .catch((error) => {
        const errormsg = error.message;
        console.log(errormsg);
        dispatch(fetchcategoryFailure(errormsg));
      });
  };
};
//<----------------------------------Add Category-----------------------
export const Addcategory = (data: any, onSuccess: any) => {
  return (dispatch: any) => {
    dispatch(fetchcategoryRequest);
    categoryAdd(data)
      .then((response) => {
        const user = response.data;
        if (response?.status === 200) {
          onSuccess();
        }
      })
      .catch((error) => {
        const errormsg = error.message;
        console.log(errormsg);

        dispatch(fetchcategoryFailure(errormsg));
      });
  };
};

//<--------------------------------------Delete Category--------------------

export const deleteCategory = (id: any, query: any) => {
  return (dispatch: any) => {
    dispatch(fetchcategoryRequest);
    categoryDelete(id)
      .then((response) => {
        const user = response.data;

        if (response.status === 200) {
          dispatch(fetchcategory(query));
        }
      })
      .catch((error) => {
        const errormsg = error.message;
        console.log(errormsg);
        dispatch(fetchcategoryFailure(errormsg));
      });
  };
};

//<-----------------------------------------Edit Category------------------------

export const Editcategory = (id: any, data: any, onSuccess: any) => {
  return (dispatch: any) => {
    dispatch(fetchcategoryRequest);
    categoryEdit(id, data)
      .then((response) => {
        if (response.status === 200) {
          onSuccess();
        }
      })
      .catch((error) => {
        const errormsg = error.message;
        dispatch(fetchcategoryFailure(errormsg));
      });
  };
};
