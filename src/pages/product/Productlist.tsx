import React, { useEffect, useState } from "react";
import "jspdf-autotable";
import { Button, Form, Modal } from "react-bootstrap";
import { connect, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../projects.css";
import * as XLXS from "xlsx";
import { Alert } from "antd";
import {
  fetchAddProduct,
  fetchDeleteProduct,
  fetchEditProductStatus,
  fetchProductlist,
} from "../../redux/actionFiles/ProductAction";
import { fetchcategory } from "../../redux/actionFiles/CategoryAction";
import ProductExport from "../../components/ProductExport";
import { fileData } from "../../services/UploadServices";
import { toast } from "react-toastify";

const URL = "http://192.168.10.167:1337";
const noImage = require("../../images/no-image.png");

const Productlist = ({
  fetchProductlist,
  totalData,
  productData,
  fetchDeleteProduct,
}: any) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [data, setData]: any = useState([]);
  const [show, setShow] = useState(false);
  const [id, setId] = useState();
  const [item, setItem]: any = useState();
  const [showDelete, setShowDelete]: any = useState();
  const [showmultipleDelete, setShowmultipleDelete]: any = useState(false);

  const [search, setSearch] = useState("");
  const [sortData, setSortData]: any = useState();
  const [isAllCheck, setIsAllCheck] = useState(false);
  const [exceldata, setExceldata] = useState();
  const [file, setFile] = useState();
  const [showPopup, setShowPopup]: any = useState(false);

  const [number, setNumber] = useState(1);

  const postPerPage = 10;
  const lastPost = number * postPerPage;
  const firstPost = lastPost - postPerPage;

  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(totalData / postPerPage); i++) {
    pageNumber.push(i);
  }

  const ChangePage = (pageNumber: any) => {
    setNumber(pageNumber);
  };

  const sucessNotify = () => toast("Login Successfull");
  const multipleDeleteSuccess = () => toast("Delete Successfully");
  const uploadSuccess = () => toast("Upload Successfully");

  useEffect(() => {
    const newArr = productData.map((v: any) => ({ ...v, selected: false }));
    setData(newArr);
  }, [productData]);

  useEffect(() => {
    dispatch(fetchcategory(categoryQuery));
  }, []);

  const filteredProducts = (searchVal: string) => {
    const filteredData1 = productData.filter((item: any) => {
      return (
        item?.attributes?.productTitle
          .toLowerCase()
          .includes(searchVal.toLowerCase()) ||
        item?.attributes?.description
          .toLowerCase()
          .includes(searchVal.toLowerCase())
      );
    });
    setData([...filteredData1]);
  };

  let query = `&pagination[withCount]=true&pagination[page]=${number}&pagination[pageSize]=10&${
    sortData ? `sort=${sortData}` : ""
  }`;
  let categoryQuery = `?&pagination[withCount]=false&pagination[page]=0`;

  const query1 = `&pagination[withCount]=true&pagination[page]=1&pagination[pageSize]=10`;

  useEffect(() => {
    fetchProductlist(query);
  }, [number, sortData, totalData]);

  const handleDeleteProduct = (id: any) => {
    fetchDeleteProduct(id, query1);
    setShowDelete(false);
    setNumber(1);
  };

  const image = require("../../images/drop-down-arrow.png");
  const imageup = require("../../images/drop-up-arrow.png");

  const handleClose = () => setShow(!show);
  const handleDeleteClose = () => setShowDelete(!showDelete);
  const handlePopupClose = () => setShowPopup(!showPopup);
  const handleMultipleDelete = () => setShowmultipleDelete(!showmultipleDelete);

  const onStatusChange = (id: any, item: any) => {
    setId(id);
    setItem(item);
    setShow(!show);
  };

  const onMultipleDelete = () => {
    setShowmultipleDelete(true);
  };
  useEffect(() => {});

  const onDeleteChange = (item: any) => {
    setItem(item);
    const ProductName: any = item?.attributes?.productTitle;
    setId(item.id);
    setShowDelete(!showDelete);
  };

  const changeActiveStatus = async (id: any, item: any) => {
    item.attributes.isActive = !item.attributes.isActive;

    dispatch(fetchEditProductStatus(id, item?.attributes?.isActive, onSuccess));
  };

  const onSuccess = () => {
    setShow(false);
  };

  const onCheck = () => {
    if (isAllCheck === false) {
      setData(data?.map((item: any) => ({ ...item, selected: true })));
    } else {
      setData(data?.map((item: any) => ({ ...item, selected: false })));
    }
    setIsAllCheck(!isAllCheck);
  };

  const onOneSelect = (id: any) => {
    data.find((item: any) => {
      if (item?.id == id) {
        item.selected = !item.selected;
      }
      setData([...data]);
    });
  };

  useEffect(() => {
    data.map((item: any) => {
      if (!item?.selected) {
        setIsAllCheck(false);
      }
    });
  });

  const filterData = data?.filter((item: any) => item?.selected);

  const categoryData = useSelector((state: any) => state?.category?.category);

  const handleImportChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const readExcel = () => {
    const promise: any = new Promise((resolve, reject) => {
      const fileReader: any = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e: any) => {
        const bufferArray = e.target.result;
        const wb = XLXS.read(bufferArray, { type: "buffer" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const sheetData = XLXS.utils.sheet_to_json(ws);
        resolve(sheetData);
      };
      fileReader.onerror = (error: any) => reject(error);
    });
    promise.then((d: any) => {
      d.map((item: any) => {
        const [temp] = categoryData.filter(
          (items: any) => items?.attributes?.title === item.category
        );
        item.category = temp.id;
        setExceldata(item);
      });
      uploadSuccess();
    });
  };

  const onSuccessexcel = () => {
    setShowPopup(!showPopup);
  };

  const onmultipleDelete = () => {
    filterData?.map((item: any) => {
      fetchDeleteProduct(item.id, query1);
      setShowmultipleDelete(false);
      setNumber(1);
    });
    multipleDeleteSuccess();
  };

  useEffect(() => {
    if (exceldata) {
      dispatch(fetchAddProduct({ data: exceldata }, onSuccessexcel));
    }
  }, [exceldata]);

  const handlePopup = () => {
    setShowPopup(true);
  };
  return (
    <div className="table-container p-4">
      <div className="table-container-header">
        <div className="d-flex justify-content-between pb-3">
          <div className="d-flex">
            <h3 className="table-container-heading">Products</h3>
          </div>
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Body>Do you change Status of Product ?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShow(!show)}>
                No
              </Button>
              <Button
                variant="primary"
                onClick={() => changeActiveStatus(id, item)}
              >
                Yes
              </Button>
            </Modal.Footer>
          </Modal>

          {/* ..........for delete confirmation............... */}

          <Modal
            show={showDelete}
            onHide={handleDeleteClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Body>
              Are you sure want to delete " {item?.attributes?.productTitle} "
              product ?
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowDelete(!showDelete)}
              >
                No
              </Button>
              <Button variant="primary" onClick={() => handleDeleteProduct(id)}>
                Yes
              </Button>
            </Modal.Footer>
          </Modal>

          {/* .....................Multiple Delete................. */}

          <Modal
            show={showmultipleDelete}
            onHide={handleMultipleDelete}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Body>Are you sure want to delete product ?</Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowmultipleDelete(!showmultipleDelete)}
              >
                No
              </Button>
              <Button variant="primary" onClick={onmultipleDelete}>
                Yes
              </Button>
            </Modal.Footer>
          </Modal>

          {/* ....................for Import PopUp................ */}

          <div>
            <input
              className="input rounded"
              placeholder="Search Here"
              onChange={(e) => {
                setSearch(e.target.value);
                filteredProducts(e.target.value);
              }}
            />
            <Modal
              show={showPopup}
              onHide={handlePopupClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Body>
                <div>
                  <div className="d-flex justify-content-center align-items-center align-items-center">
                    <form className="popup-form needs-validation p-4 rounded">
                      <Button
                        className="close"
                        onClick={() => setShowPopup(!showPopup)}
                      >
                        &times;
                      </Button>
                      <div>
                        <h3>Import Product Data</h3>
                      </div>
                      <div className="mb-2">
                        <label
                          className="form-label p-1"
                          htmlFor="validationCustom03"
                        >
                          Excel File
                        </label>
                        <input
                          type="file"
                          className="form-control"
                          onChange={handleImportChange}
                        />
                      </div>{" "}
                      <Button
                        className="addbutton mt-3"
                        variant="primary"
                        size="sm"
                        active
                        type="button"
                        onClick={readExcel}
                      >
                        Submit
                      </Button>
                    </form>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
            <Button
              className="export ml-3"
              variant="primary"
              size="lg"
              active
              onClick={onMultipleDelete}
              disabled={filterData.length === 0}
            >
              Delete
            </Button>
            <Button
              className="export mx-3"
              variant="primary"
              size="lg"
              active
              onClick={handlePopup}
            >
              Import
            </Button>

            <ProductExport apiData={filterData} />
            <Button
              className="addbutton ml-2"
              variant="primary"
              size="lg"
              active
              onClick={() => {
                navigate("/add-products");
              }}
            >
              <i className="fa fa-plus pr-2" aria-hidden="true"></i>
              Add Product
            </Button>
            {"      "}
          </div>
        </div>
      </div>
      <div className="table-container-body bg-white">
        <table className="table table-centered mb-0">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={isAllCheck}
                  onChange={onCheck}
                />
              </th>
              <th>
                Product Title
                <img
                  style={{
                    width: "15px",
                    height: "15px",
                    marginTop: "-10px",
                    marginLeft: "5px",
                  }}
                  src={imageup}
                  onClick={() => setSortData("productTitle:asc")}
                />
                <img
                  style={{
                    width: "15px",
                    height: "15px",
                    marginLeft: "-15px",
                    marginTop: "10px",
                  }}
                  src={image}
                  onClick={() => setSortData("productTitle:desc")}
                />
              </th>

              <th>
                Description
                <img
                  style={{
                    width: "15px",
                    height: "15px",
                    marginTop: "-10px",
                    marginLeft: "5px",
                  }}
                  src={imageup}
                  onClick={() => setSortData("description:asc")}
                />
                <img
                  style={{
                    width: "15px",
                    height: "15px",
                    marginLeft: "-15px",
                    marginTop: "10px",
                  }}
                  src={image}
                  onClick={() => setSortData("description:desc")}
                />
              </th>

              <th>
                Quantity
                <img
                  style={{
                    width: "15px",
                    height: "15px",
                    marginTop: "-10px",
                    marginLeft: "5px",
                  }}
                  src={imageup}
                  onClick={() => setSortData("qty:asc")}
                />
                <img
                  style={{
                    width: "15px",
                    height: "15px",
                    marginLeft: "-15px",
                    marginTop: "10px",
                  }}
                  src={image}
                  onClick={() => setSortData("qty:desc")}
                />
              </th>

              <th>
                Price
                <img
                  style={{
                    width: "15px",
                    height: "15px",
                    marginTop: "-10px",
                    marginLeft: "5px",
                  }}
                  src={imageup}
                  onClick={() => setSortData("price:asc")}
                />
                <img
                  style={{
                    width: "15px",
                    height: "15px",
                    marginLeft: "-15px",
                    marginTop: "10px",
                  }}
                  src={image}
                  onClick={() => setSortData("price:desc")}
                />
              </th>
              <th>Category</th>

              <th className="productImage">Product Image</th>
              <th>
                Status
                <img
                  style={{
                    width: "15px",
                    height: "15px",
                    marginTop: "-10px",
                    marginLeft: "5px",
                  }}
                  src={imageup}
                  onClick={() => setSortData("isActive:asc")}
                />
                <img
                  style={{
                    width: "15px",
                    height: "15px",
                    marginLeft: "-15px",
                    marginTop: "10px",
                  }}
                  src={image}
                  onClick={() => setSortData("isActive:desc")}
                />
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data?.map((item: any, index: any) => {
                return (
                  <tr key={index}>
                    <td>
                      <input
                        type="checkbox"
                        checked={item?.selected}
                        onChange={() => onOneSelect(item.id)}
                      />
                    </td>
                    <td>{item?.attributes?.productTitle}</td>
                    <td>{item?.attributes?.description}</td>
                    <td>{item?.attributes?.qty}</td>

                    <td>{item?.attributes?.price}</td>
                    <td>
                      {item?.attributes?.category?.data?.attributes?.title}
                    </td>
                    <td>
                      <img
                        className="product-img"
                        src={
                          item?.attributes?.productImage?.data?.attributes?.url
                            ? `${URL}${item?.attributes?.productImage?.data?.attributes?.url}`
                            : noImage
                        }
                      />
                    </td>

                    <td>
                      <Form.Check
                        type="switch"
                        id="custom-switch"
                        onChange={() => onStatusChange(item.id, item)}
                        checked={item?.attributes?.isActive ? true : false}
                      />
                    </td>

                    <td className="table-button">
                      {" "}
                      <Button
                        className="addbutton mr-2"
                        variant="primary"
                        size="sm"
                        active
                        onClick={() =>
                          navigate("/edit-product-list", { state: item })
                        }
                      >
                        Edit
                      </Button>
                      <Button
                        className="addbutton"
                        variant="primary"
                        size="sm"
                        active
                        onClick={() => {
                          onDeleteChange(item);
                        }}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <div className="my-3 text-center">
        <button
          className="px-3 py-1 m-1 text-center btn-primary"
          onClick={() => setNumber(number - 1)}
          disabled={firstPost === 0}
        >
          Previous
        </button>

        {pageNumber.map((item, index) => {
          return (
            <>
              <button
                key={index}
                className={
                  number === item
                    ? "px-3 py-1 m-1 text-center btn-focus"
                    : "px-3 py-1 m-1 text-center btn-outline-dark"
                }
                onClick={() => ChangePage(item)}
              >
                {item}
              </button>
            </>
          );
        })}
        <button
          className="px-3 py-1 m-1 text-center btn-primary"
          onClick={() => setNumber(number + 1)}
          disabled={pageNumber.length - 0 == number}
        >
          Next
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    productData: state?.productlist?.productlist,
    totalData: state?.productlist?.meta?.pagination?.total,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchProductlist: (query: any) => dispatch(fetchProductlist(query)),
    fetchDeleteProduct: (id: any, query: any) =>
      dispatch(fetchDeleteProduct(id, query)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Productlist);
