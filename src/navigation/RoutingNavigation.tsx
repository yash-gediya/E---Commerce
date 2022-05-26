import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ForgotPassword from "../pages/ForgotPassword";
import Dashboard from "../components/Dashboard";
import Layout from "../pages/Layout";
import LoginContainer from "../pages/LoginContainer";
import store from "../redux/store";
import Productlist from "../pages/product/Productlist";
import Categorylist from "../pages/category/Categorylist";
import AddProducts from "../pages/product/AddProducts";
import EditProductlist from "../pages/product/EditProductlist";
import EditCategorylist from "../pages/category/EditCategorylist";
import Addcategory from "../pages/category/Addcategory";
import CartList from "../pages/cart/CartList";
import ErrorPage from "../pages/ErrorPage";
import UserDetails from "../pages/user/UserDetails";
import ProductExport from "../components/ProductExport";

const RoutingNavigation = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path={"/login"} element={<LoginContainer />} />
          <Route path={"/forgot-password"} element={<ForgotPassword />} />
          <Route path={"*"} element={<ErrorPage />} />
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/product-list" element={<Productlist />} />
            <Route path={"/category-list"} element={<Categorylist />} />
            <Route path={"/add-products"} element={<AddProducts />} />
            <Route path={"/edit-product-list"} element={<EditProductlist />} />
            <Route path={"/user-details"} element={<UserDetails />} />
            <Route
              path={"/edit-category-list"}
              element={<EditCategorylist />}
            />
            <Route path={"/add-category"} element={<Addcategory />} />
            <Route path={"/cart-list"} element={<CartList />} />
            <Route path={"/product-export"} element={<ProductExport />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default RoutingNavigation;
