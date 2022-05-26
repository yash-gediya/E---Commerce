import {
  FETCH_FILES_FAILURE,
  FETCH_FILES_REQUEST,
  FETCH_FILES_SUCCEESS,
} from "../typesFiles/UploadFileTypes";
import { fileData } from "../../services/UploadServices";

export const fetchFilesRequest = () => {
  return {
    type: FETCH_FILES_REQUEST,
  };
};

const fetchFilesSuccess = (FILES: any) => {
  return {
    type: FETCH_FILES_SUCCEESS,
    payload: FILES,
  };
};

const fetchFilesFailure = (error: any) => {
  return {
    type: FETCH_FILES_FAILURE,
    payload: error,
  };
};

export const fetchAddFile = (formData: any) => {
  return (dispatch: any) => {
    fileData(formData)
      .then((response) => {
        const user = response.data[0];

        if (response.status === 200) {
          dispatch(fetchFilesSuccess(user));
        }
      })
      .catch((error) => {
        const errormsg = error.message;

        dispatch(fetchFilesFailure(errormsg));
      });
  };
};
