import React, { useState } from "react";
import { Addcategory } from "../../redux/actionFiles/CategoryAction";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../projects.css";
import { Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  title: Yup.string().required("* Title is a Required "),
});

const Category = ({ Addcategory }: any) => {
  const navigate = useNavigate();

  const onSuccess = () => {
    navigate("/category-list");
  };

  return (
    <>
      <Formik
        initialValues={{ title: "", isActive: true }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          Addcategory(
            {
              data: {
                title: values.title,
                isActive: values.isActive,
              },
            },
            onSuccess
          );
        }}
      >
        {({ handleSubmit, handleChange, values, errors }) => (
          <div className="d-flex justify-content-center align-items-center align-items-center">
            <form
              onSubmit={handleSubmit}
              className="needs-validation p-4 rounded"
            >
              <div>
                <h2>Add Category</h2>
              </div>
              <div className="mb-3">
                <label className="form-label p-1" htmlFor="validationCustom01">
                  Category Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  placeholder="Title..."
                />
                <span style={{ color: "red", fontSize: "10px" }}>
                  {errors.title}
                </span>
              </div>
              <button
                className="btn btn-primary "
                type="submit"
                disabled={!values.title}
              >
                Submit
              </button>
              <button className="btn btn-primary  ml-2" type="button" onClick={()=>navigate('/category-list')}>
                Cancle
              </button>
            </form>
          </div>
        )}
      </Formik>
    </>
  );
};
const mapStateToProps = (state: any) => {
  return {
    userData: state.category.category,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    Addcategory: (data: any, onSuccess: any) =>
      dispatch(Addcategory(data, onSuccess)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Category);
