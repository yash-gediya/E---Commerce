import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
  });

  const handleChangeInput = (event: any) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div>
      <div className="container fp-container">
        <div className="row">
          <div className="col-md-12 login-form-2">
            <h3>Forgot Password</h3>
            <p>Entered your registered email below to receive password</p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  name="email"
                  type="email"
                  className="form-control input"
                  placeholder="Email ..."
                  onChange={handleChangeInput}
                  value={data.email}
                />
              </div>

              <div className="form-group">
                <input
                  type="submit"
                  className="form-control btnSubmit"
                  value="Send"
                />
              </div>
            </form>
            <div className=" d-flex justify-content-center ">
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
      </div>
    </div>
  );
};

export default ForgotPassword;
