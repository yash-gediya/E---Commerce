import axios from "axios";
import "../common/axios.interceptor";

export const usersData = () => {
  return axios.get("/users");
};

export const userDelete = (id: any) => {
  return axios.delete(`/users/${id}`, {});
};
