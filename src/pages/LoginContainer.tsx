import { Navigate, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { fetchlogin } from "../redux/actionFiles/LoginAction";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "../projects.css";
import { Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  identifier: Yup.string()
    .email("Enter Correct Email")
    .required("Email is a required field"),

  password: Yup.string()
    .required("Please enter your password")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/,
      "Password must contain at least 6 characters, one uppercase, one number and one special case character"
    ),
});

const LoginContainer = ({ fetchlogin }: any) => {
  const navigate = useNavigate();
  const sucessNotify = () => toast("Login Successfull");
  const onSuccess = () => {
    navigate("/");
    sucessNotify();
  };

  const image = require("../images/login-img.jpg");
  const accessToken = localStorage.getItem("jwt");
  return !accessToken ? (
    <>
      <Formik
        initialValues={{ identifier: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          fetchlogin(
            {
              identifier: values.identifier,
              password: values.password,
            },

            onSuccess
          );
        }}
      >
        {({ handleSubmit, handleChange, values, errors, touched }) => (
          <div className="container-fluid login-main-container d-flex align-items-center">
            <div className="login-container d-flex justify-content-center w-100">
              <div className="  d-flex w-75">
                <div className="login-form-1 p-0 w-50">
                  <img className="login-img w-100 h-100" src={image} alt="" />
                </div>
                <div className="login-form-2 w-50">
                  <h3>Welcome Back!</h3>

                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <input
                        name="identifier"
                        type="text"
                        className="form-control input"
                        placeholder="Enter Username"
                        onChange={handleChange}
                        value={values.identifier}
                      />

                      {touched.identifier && errors.identifier ? (
                        <span style={{ color: "red", fontSize: "10px" }}>
                          {errors.identifier}
                        </span>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <input
                        name="password"
                        type="password"
                        className="form-control input"
                        placeholder="Enter Password"
                        onChange={handleChange}
                        value={values.password}
                      />
                      {touched.password && errors.password ? (
                        <span style={{ color: "red", fontSize: "10px" }}>
                          {errors.password}
                        </span>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <input type="checkbox" /> Remember Me
                    </div>
                    <div className="form-group">
                      <button type="submit" className="form-control btnSubmit">
                        Login
                      </button>
                    </div>

                    <hr />
                    <div style={{ textAlign: "center" }}>
                      <Link to="/forgot-password">Forgot Password</Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </>
  ) : (
    <Navigate to="/" />
  );
};

const mapStateToProps = (state: any) => {
  return {
    userData: state.users,
    errorMsg: state.error,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchlogin: (data: any, onSuccess: any) =>
      dispatch(fetchlogin(data, onSuccess)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
