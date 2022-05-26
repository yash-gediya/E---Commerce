import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../src/projects.css";

const Sidebar = (props: any) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleSidebarClose = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`sidebar open p-2 ${
        isCollapsed ? "open-sidebar" : "close-sidebar"
      }`}
    >
      <div className="sidebar-header p-2 d-flex justify-content-center">
        <div>
          <i
            className="sidebar-emoji  fa fa-smile-o text-white"
            aria-hidden="true"
          ></i>
        </div>
        <p className="sidebar-heading text-white m-0">SWAGGER</p>
      </div>
      <div className="sidebar-body">
        <ul className="p-0">
          <Link to="/">
            <li className="d-flex text-white align-items-center my-3">
              <i className="fa fa-tachometer p-2" aria-hidden="true"></i>
              <p className="m-0">Dashboard</p>
            </li>
          </Link>
          <Link to="/product-list">
            <li className="d-flex text-white align-items-center  my-3">
              <i className="fa fa-cubes p-2" aria-hidden="true"></i>
              <p className="m-0">Products</p>
            </li>
          </Link>
          <Link to="/cart-list">
            <li className="d-flex text-white align-items-center my-3">
              <i className="fa fa-shopping-cart p-2" aria-hidden="true"></i>
              <p className="m-0">Cart</p>
            </li>
          </Link>
          <Link to="/category-list">
            <li className="d-flex text-white align-items-center  my-3">
              <i className="fa fa-th-list p-2" aria-hidden="true"></i>
              <p className="m-0 ">Category</p>
            </li>
          </Link>
          <Link to="/user-details">
            <li className="d-flex text-white align-items-center  my-3">
              <i className="fa fa-users p-2" aria-hidden="true"></i>
              <p className="m-0 ">User</p>
            </li>
          </Link>
        </ul>
      </div>
      <div className="sidebar-close d-flex justify-content-center pt-2">
        <button
          type="button"
          className="sidebar-close-button btn text-reset border-0 rounded-circle"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
          onClick={handleSidebarClose}
        >
          <i className="fa fa-chevron-left text-white" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
};
export default Sidebar;
