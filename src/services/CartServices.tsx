import axios from "axios";
import "../common/axios.interceptor";

export const cartDetails = (query: any) => {
  return axios.get(
    `/carts?populate=user_id,product_list.product,&filters[isOrderPlaced]=true${query}`
  );
};
