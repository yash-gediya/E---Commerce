import React from "react";
import "../../src/projects.css";
import { Link } from "react-router-dom";

const ProfileComponent = () => {
  const hadlelogout = () => {
    localStorage.clear();
  };

  return (
    <>
      <div className="d-flex justify-content-end pr-4 pt-1">
        <div className="main-profile bg-light rounded p-2">
          <ul className="p-0">
            <Link to="#">
              <li className="d-flex text-white align-items-center rounded">
                <i className="fa fa-user text-dark p-2" aria-hidden="true"></i>
                <p className="m-0 text-dark">Profile</p>
              </li>
            </Link>
            <Link to="#">
              <li className="d-flex text-white align-items-center rounded">
                <i className="fa fa-cogs text-dark p-2" aria-hidden="true"></i>
                <p className="m-0 text-dark">Settings</p>
              </li>
            </Link>
            <Link to="#">
              <li className="d-flex text-white align-items-center border-bottom rounded">
                <i
                  className="fa fa-list-ul text-dark p-2"
                  aria-hidden="true"
                ></i>
                <p className="m-0 text-dark">Activity Log</p>
              </li>
            </Link>
            <Link to="/login" onClick={hadlelogout}>
              <li className="d-flex text-white align-items-center rounded">
                <i
                  className="fa fa-sign-out text-dark  p-2"
                  aria-hidden="true"
                ></i>
                <p className="m-0 text-dark">Logout</p>
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </>
  );
};

export default ProfileComponent;
