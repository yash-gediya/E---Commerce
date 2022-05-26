import React from "react";
import HeaderComponent from "../components/HeaderComponent";
import Sidebar from "../components/Sidebar";
import "../../src/projects.css";
import { Navigate, Outlet, useNavigate } from "react-router";

const Layout = () => {
  const accessToken = localStorage.getItem("jwt");
  return accessToken ? (
    <>
      <div className="container-fluid d-flex p-0">
        <Sidebar />
        <div className="main-content width">
          <HeaderComponent />
          <div className="layout-outlet">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default Layout;
