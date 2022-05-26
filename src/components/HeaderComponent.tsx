import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../src/projects.css";

const HeaderComponent = () => {
  const hadlelogout = () => {
    localStorage.clear();
  };
  return (
    <div className="container-fluid p-0 ">
      <header className="header-table px-4 d-flex justify-content-end align-items-center">
        <div className="profile-message-header d-flex align-items-center ">
          <div>
            <DropdownButton id="dropdown-basic-button" title="Admin">
              <ul className="p-0">
                <Dropdown.Item href="#/action-1">
                  <Link to="#" className="profile-link">
                    <li className="d-flex text-white align-items-center rounded">
                      <i
                        className="fa fa-user text-dark p-2"
                        aria-hidden="true"
                      ></i>
                      <p className="m-0 text-dark">Profile</p>
                    </li>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item href="#/action-2">
                  {" "}
                  <Link to="#" className="profile-link">
                    <li className="d-flex text-white align-items-center rounded">
                      <i
                        className="fa fa-cogs text-dark p-2"
                        aria-hidden="true"
                      ></i>
                      <p className="m-0 text-dark">Settings</p>
                    </li>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item href="#/action-3">
                  {" "}
                  <Link to="#" className="profile-link">
                    <li className="d-flex text-white align-items-center border-bottom rounded">
                      <i
                        className="fa fa-list-ul text-dark p-2"
                        aria-hidden="true"
                      ></i>
                      <p className="m-0 text-dark">Activity Log</p>
                    </li>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item href="#/action-4">
                  <Link
                    to="/login"
                    className="profile-link"
                    onClick={hadlelogout}
                  >
                    <li className="d-flex text-white align-items-center rounded">
                      <i
                        className="fa fa-sign-out text-dark  p-2"
                        aria-hidden="true"
                      ></i>
                      <p className="m-0 text-dark">Logout</p>
                    </li>
                  </Link>
                </Dropdown.Item>
              </ul>
            </DropdownButton>
          </div>
        </div>
      </header>
    </div>
  );
};

export default HeaderComponent;
