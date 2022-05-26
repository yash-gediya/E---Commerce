import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { Editcategory } from "../../redux/actionFiles/CategoryAction";
import "../../projects.css";
import { Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  title: Yup.string().required("* Title is a Required "),
});

const EditCategorylist = ({ Editcategory }: any) => {
  const navigate = useNavigate();
  const location: any = useLocation();
  const id = location.state.id;
  const onSuccess = () => {
    navigate("/category-list");
  };

  return (
    <>
      <Formik
        initialValues={{
          title: location.state.attributes.title,
          isActive: location.state.attributes.isActive,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          Editcategory(
            id,
            {
              data: {
                title: values.title,
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
                <h2>Edit Category</h2>
              </div>
              <div className="mb-3">
                <label className="form-label p-1" htmlFor="validationCustom01">
                  Title
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
            </form>
          </div>
        )}
      </Formik>
    </>
  );
};
const mapStateToProps = (state: any) => {
  return {
    categoryData: state.category.category,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    Editcategory: (id: any, details: any, onSuccess: any) =>
      dispatch(Editcategory(id, details.data, onSuccess)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditCategorylist);
