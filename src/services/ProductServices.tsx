import axios from "axios";
import "../common/axios.interceptor";

export const productList = (query: any) => {
  return axios.get(`/products?populate=productImage,category ${query}`);
};

export const productAdd = (product: any) => {
  return axios.post("/products", product);
};

export const productEdit = (data: any, id: any, query: any) => {
  return axios.put(`/products/${id}?populate=productImage,category ${query}`, {
    data,
  });
};

export const statusChangeProductEdit = (id: any, data: any) => {
  return axios.put(`/products/${id}`, {
    data: { isActive: data },
  });
};
export const productDelete = (id: any) => {
  return axios.delete(`/products/${id}`, {});
};

export const productById = (id: any) => {
  return axios.get(`/products/${id}?populate=productImage&populate=category`);
};
