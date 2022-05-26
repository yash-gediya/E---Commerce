import "antd/dist/antd.css";
import { InboxOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchcategory } from "../../redux/actionFiles/CategoryAction";
import { fetchAddProduct } from "../../redux/actionFiles/ProductAction";
import { fetchAddFile } from "../../redux/actionFiles/UploadActionFile";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import Dragger from "antd/lib/upload/Dragger";

const validationSchema = Yup.object({
  productTitle: Yup.string().required("* Product Title is required"),
  description: Yup.string().required("* Product Description is required"),
  qty: Yup.string().required("* Product Quantity is required"),
  price: Yup.string().required("* Product Price is required"),
  category: Yup.string().required("* Product Category is required"),
});

const AddProducts = ({ fetchcategory, categoryData, fetchAddProduct }: any) => {
  const navigate = useNavigate();
  const [product, setProduct]: any = useState({
    data: {
      productImage: "",
    },
  });
  const [error, setError]: any = useState();
  const URL = "http://192.168.10.167:1337";
  const [files, setFiles]: any = React.useState();

  const fileData = useSelector((state: any) => state?.files?.FILES);

  const handleFileSelect = (event: any) => {
    const status = event?.file?.originFileObj;
    console.log("==========", status[0]);
    setFiles(status);
  };

  useEffect(() => {
    const formData = new FormData();
    JSON.stringify(formData?.append("files", files));
    formData?.append("selectedFileName", files?.name);
    console.log(formData);

    dispatch(fetchAddFile(formData));
  }, [files]);
  console.log(files);

  useEffect(() => {
    if (fileData) {
      setProduct({
        ...product,
        data: {
          ...product?.data,
          productImage: fileData,
        },
      });
    }
  }, [fileData]);

  let query = `?&pagination[withCount]=false&pagination[page]=0`;

  useEffect(() => {
    fetchcategory(query);
  }, []);

  const dispatch = useDispatch();
  const onSuccess = () => {
    navigate("/product-list");
  };

  return (
    <>
      <Formik
        initialValues={{
          productTitle: "",
          description: "",
          qty: "",
          price: "",
          isActive: true,
          category: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          if (!product?.data?.productImage) {
            setError("* Product Image is Required");
          } else {
            fetchAddProduct(
              {
                data: {
                  productTitle: values.productTitle,
                  isActive: values.isActive,
                  description: values.description,
                  qty: values.qty,
                  price: values.price,
                  category: values.category,
                  productImage: product?.data?.productImage,
                },
              },
              onSuccess
            );
          }
        }}
      >
        {({ handleSubmit, handleChange, values, errors, touched }) => (
          <div className="d-flex justify-content-center align-items-center align-items-center">
            <form
              onSubmit={(values) => handleSubmit(values)}
              className="needs-validation p-4 rounded"
            >
              <div>
                <h2>Add Product</h2>
              </div>
              <div className="mb-3">
                <label className="form-label p-1" htmlFor="validationCustom01">
                  Product Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="productTitle"
                  value={values?.productTitle}
                  onChange={handleChange}
                  placeholder="Product Title..."
                />
                {touched.productTitle && errors.productTitle ? (
                  <span style={{ color: "red", fontSize: "10px" }}>
                    {errors.productTitle}
                  </span>
                ) : null}
              </div>
              <div className="mb-2">
                <label className="form-label p-1" htmlFor="validationCustom02">
                  Product Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="description"
                  value={values?.description}
                  onChange={handleChange}
                  placeholder="Description..."
                />{" "}
                {touched.description && errors.description ? (
                  <span style={{ color: "red", fontSize: "10px" }}>
                    {errors.description}
                  </span>
                ) : null}
              </div>
              <div className="mb-2">
                <label
                  className="form-label p-1"
                  htmlFor="validationCustomUsername"
                >
                  Product Quantity
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="qty"
                  value={values?.qty}
                  onChange={handleChange}
                  placeholder="Quantity..."
                  aria-describedby="inputGroupPrepend"
                />{" "}
                {touched.qty && errors.qty ? (
                  <span style={{ color: "red", fontSize: "10px" }}>
                    {errors.qty}
                  </span>
                ) : null}
              </div>
              <div className="mb-2">
                <label className="form-label p-1" htmlFor="validationCustom03">
                  Product Price
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="price"
                  value={values?.price}
                  onChange={handleChange}
                  placeholder="Price..."
                />
                {touched.price && errors.price ? (
                  <span style={{ color: "red", fontSize: "10px" }}>
                    {errors.price}
                  </span>
                ) : null}
              </div>{" "}
              <div className="mb-2">
                <label className="form-label p-1" htmlFor="validationCustom03">
                  Product Category
                </label>
                <div className="control">
                  <Field
                    component="select"
                    name="category"
                    placeholder="Category..."
                    className="form-control"
                  >
                    <option>Select Category</option>
                    {categoryData?.map((item: any, index: any) => (
                      <option key={index} value={item.id}>
                        {item?.attributes?.title}
                      </option>
                    ))}
                  </Field>
                </div>
                {touched.category && errors.category ? (
                  <span style={{ color: "red", fontSize: "10px" }}>
                    {errors.category}
                  </span>
                ) : null}
              </div>
              <div>
                <label className="form-label p-1" htmlFor="validationCustom03">
                  Product Image
                </label>{" "}
                <div className="d-flex">
                  <div>
                    <Dragger name="productImage" onChange={handleFileSelect}>
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">Upload</p>
                    </Dragger>
                  </div>
                  <div className="img-preview-container">
                    <img
                      className="img-preview"
                      style={
                        fileData?.url
                          ? { display: "block" }
                          : { display: "none" }
                      }
                      src={`${URL}${fileData?.url}`}
                    />
                  </div>
                </div>
                <span style={{ color: "red", fontSize: "10px" }}>{error}</span>
              </div>
              <button className="btn btn-primary  mt-5" type="submit">
                Submit
              </button>
              <button
                className="btn btn-primary  mt-5 ml-2"
                type="button"
                onClick={() => navigate("/product-list")}
              >
                Cancel
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
    categoryData: state?.category?.category,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchcategory: (query: any) => dispatch(fetchcategory(query)),
    fetchAddProduct: (product: any, onSuccess: any) =>
      dispatch(fetchAddProduct(product, onSuccess)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddProducts);
