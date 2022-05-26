import axios from "axios";
import "../common/axios.interceptor";

export const fileData = (formData: any) => {
  return axios.post("/upload", formData, {});
};
