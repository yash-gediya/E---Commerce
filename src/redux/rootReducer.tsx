import { combineReducers } from "redux";
import cartReducer from "./reducerFiles/CartReducer";
import categoryReducer from "./reducerFiles/CategoryReducer";
import loginReducer from "./reducerFiles/LoginReducer";
import {
  addProductReducer,
  deleteProductReducer,
  editProductReducer,
  productlistByIdReducer,
  productlistReducer,
} from "./reducerFiles/ProductlistReducer";
import filesReducer from "./reducerFiles/UploadFileReducer";
import { UsersListReducer } from "./reducerFiles/UsersReducers";

const rootReducer = combineReducers({
  users: loginReducer,
  productlist: productlistReducer,
  addproduct: addProductReducer,
  editproduct: editProductReducer,
  productByid: productlistByIdReducer,
  deleteproduct: deleteProductReducer,
  category: categoryReducer,
  userList: UsersListReducer,
  deleteUsers: deleteProductReducer,
  files: filesReducer,
  cart: cartReducer,
});
export default rootReducer;
