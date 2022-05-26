import Dragger from "antd/lib/upload/Dragger";
import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchcategory } from "../../redux/actionFiles/CategoryAction";
import { InboxOutlined } from "@ant-design/icons";
import {
  fetchAddProductById,
  fetchEditProduct,
} from "../../redux/actionFiles/ProductAction";
import { Formik } from "formik";
import * as Yup from "yup";
import { fetchAddFile } from "../../redux/actionFiles/UploadActionFile";

const validationSchema = Yup.object({
  productTitle: Yup.string().required("* Product Title is required"),
  description: Yup.string().required("* Product Description is required"),
  qty: Yup.string().required("* Product Quantity is required"),
  price: Yup.string().required("* Product Price is required"),
  category: Yup.string().required("* Product Category is required"),
});

const EditProductlist = ({
  fetchcategory,
  categoryData,
  fetchEditProduct,
}: any) => {
  const [data, setData]: any = useState();
  const [files, setFiles]: any = React.useState([]);
  const [error, setError]: any = useState();

  const location: any = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const URL = "http://192.168.10.167:1337";
  const id: any = location?.state?.id;
  let query = `?&pagination[withCount]=false&pagination[page]=0`;

  const fileData = useSelector((state: any) => state?.files?.FILES);

  const productDAta = useSelector(
    (state: any) => state?.productByid?.productByid?.attributes
  );

  const handleFileSelect = (event: any) => {
    const status = event?.file?.originFileObj;
    setFiles(status);
  };

  useEffect(() => {
    setData({
      ...data,
      productImage: fileData?.id,
    });
  }, [fileData]);

  useEffect(() => {
    dispatch(fetchAddProductById(id));
  }, []);

  useEffect(() => {
    fetchcategory(query);
  }, []);

  useEffect(() => {
    const formData = new FormData();
    JSON.stringify(formData?.append("files", files));
    formData?.append("selectedFileName", files?.name);
    dispatch(fetchAddFile(formData));
  }, [files]);

  const onSuccess = () => {
    navigate("/product-list");
  };

  useEffect(() => {
    fetchcategory(query);
  }, []);

  return (
    <>
      <Formik
        initialValues={{
          productTitle: location.state.attributes.productTitle,
          description: location.state.attributes.description,
          qty: location.state.attributes.qty,
          price: location.state.attributes.price,
          isActive: location.state.attributes.isActive,
          productImage: location.state.attributes.isActive,
          category: location?.state?.attributes?.category?.data?.id,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          fetchEditProduct(
            id,
            {
              productTitle: values.productTitle,
              description: values.description,
              qty: values.qty,
              price: values.price,
              isActive: values.isActive,
              productImage: data?.productImage,
              category: values.category,
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
                <h2>Edit Product</h2>
              </div>
              <div className="mb-2">
                <label className="form-label p-1" htmlFor="validationCustom01">
                  Product Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="productTitle"
                  value={values?.productTitle}
                  onChange={handleChange}
                  placeholder="ProductTitle..."
                />
                <span style={{ color: "red", fontSize: "10px" }}>
                  {errors.productTitle}
                </span>
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
                />
                <span style={{ color: "red", fontSize: "10px" }}>
                  {errors.description}
                </span>
                <div className="valid-feedback">Looks good!</div>
              </div>
              <div className="mb-2">
                <label
                  className="form-label p-1"
                  htmlFor="validationCustomUsername"
                >
                  Product Quantity
                </label>
                <div className="input-group">
                  <input
                    type="number"
                    className="form-control"
                    name="qty"
                    value={values?.qty}
                    onChange={handleChange}
                    placeholder="Qty..."
                    aria-describedby="inputGroupPrepend"
                  />
                  <span style={{ color: "red", fontSize: "10px" }}>
                    {errors.qty}
                  </span>
                </div>
              </div>
              <div className="mb-2">
                <label className="form-label p-1" htmlFor="validationCustom03">
                  Product Price
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="validationCustom03"
                  name="price"
                  value={values?.price}
                  onChange={handleChange}
                  placeholder="Price..."
                  required
                />{" "}
                <span style={{ color: "red", fontSize: "10px" }}>
                  {errors.price}
                </span>
                <div className="invalid-feedback">
                  Please provide a valid city.
                </div>
              </div>
              <div className="mb-2">
                <label className="form-label p-1" htmlFor="validationCustom03">
                  Product Category
                </label>
                <select
                  name="category"
                  value={values?.category}
                  className="form-control"
                  placeholder="Categories"
                  onChange={handleChange}
                >
                  <option>Select Category</option>
                  {categoryData?.map((item: any, index: any) => (
                    <option key={index} value={item.id}>
                      {item.attributes.title}
                    </option>
                  ))}
                </select>
              </div>
              <span style={{ color: "red", fontSize: "10px" }}>
                {errors.category}
              </span>
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
              <button className="btn btn-primary mt-5" type="submit">
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
    categoryData: state?.category?.category,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchcategory: (query: any) => dispatch(fetchcategory(query)),
    fetchEditProduct: (id: any, data: any, onSuccess: any, query: any) =>
      dispatch(fetchEditProduct(id, data, onSuccess, query)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditProductlist);
