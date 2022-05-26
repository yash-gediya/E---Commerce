import axios from "axios";
import "../common/axios.interceptor";

export const loginData = (data: any) => {
  return axios.post("/auth/local", data);
};
