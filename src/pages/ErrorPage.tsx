import React from "react";
import { useNavigate } from "react-router-dom";
import image404 from "../images/6330890.jpg";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="error-img p-5">
        <div className=" d-flex justify-content-center">
          <img className="error-image" src={image404} alt="#" />
        </div>
        <div className=" d-flex justify-content-center">
          <p className="error-page-text">
            We're sorry , the page you requested could not be found <br />
            Please go back to the homepage.
          </p>
        </div>
        <div className=" d-flex justify-content-center pt-5">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              navigate("/");
            }}
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
