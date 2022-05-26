import axios from "axios";
import "../common/axios.interceptor";

export const categoryList = (query:any) => {
  return axios.get("/categories"+query);
};

export const categoryAdd = (data: any) => {
  return axios.post("/categories", data, {});
};

export const categoryEdit = (id: any, data: any) => {
  return axios.put(`/categories/${id}`, {
    data,
  });
};

export const categoryDelete = (id: any) => {
  return axios.delete(`/categories/${id}`, {});
};
