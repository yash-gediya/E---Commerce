import React, { useCallback, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../projects.css";

import {
  fetchcategory,
  deleteCategory,
  Editcategory,
} from "../../redux/actionFiles/CategoryAction";

const Categorylist = ({
  fetchcategory,
  categoryData,
  totalData,
  deleteCategory,
}: any) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [data, setData]: any = useState([...categoryData]);
  const [sortData, setSortData]: any = useState();

  useEffect(() => {
    setData([...categoryData]);
  }, [categoryData]);

  const [show, setShow] = useState(false);
  const [id, setId] = useState();
  const [item, setItem]: any = useState();
  const [showDelete, setShowDelete]: any = useState();

  const [number, setNumber] = useState(1);
  const postPerPage = 5;
  const lastPost = number * postPerPage;
  const firstPost = lastPost - postPerPage;

  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(totalData / postPerPage); i++) {
    pageNumber.push(i);
  }

  const ChangePage = (pageNumber: any) => {
    setNumber(pageNumber);
  };

  const query = `?&pagination[withCount]=true&pagination[page]=${number}&pagination[pageSize]=5&${
    sortData ? `sort=${sortData}` : ""
  }`;
  const query1 = `?&pagination[withCount]=true&pagination[page]=1&pagination[pageSize]=5`;
  const handleClose = () => setShow(!show);
  const handleDeleteClose = () => setShowDelete(!showDelete);

  const onStatusChange = (id: any, item: any) => {
    setId(id);
    setItem(item);
    setShow(!show);
  };
  useEffect(() => {
    fetchcategory(query);
  }, [number, sortData]);

  const deleteCategoty = (id: any) => {
    deleteCategory(id, query1);
    setShowDelete(false);
    setNumber(1);
  };
  const changeActiveStatus = async (id: any, item: any) => {
    item.attributes.isActive = !item.attributes.isActive;

    dispatch(Editcategory(id, item.attributes, onSuccess));
  };

  const onSuccess = () => {
    setShow(false);
  };

  const onDeleteChange = (item: any, query: any) => {
    setItem(item);
    setId(item?.id);
    setShowDelete(!showDelete);
  };

  const image = require("../../images/drop-down-arrow.png");
  const imageup = require("../../images/drop-up-arrow.png");

  return (
    <>
      {" "}
      <div className="table-container p-4">
        <div className="table-container-header">
          <div className="d-flex justify-content-between pb-3">
            <div>
              <h3 className="table-container-heading">Category</h3>
            </div>
            <div className="">
              <Button
                className="addbutton"
                variant="primary"
                size="lg"
                active
                onClick={() => navigate("/add-category")}
              >
                <i className="fa fa-plus pr-2" aria-hidden="true"></i>
                Add Category
              </Button>
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
                {" "}
                Are you sure want to delete " {item?.attributes?.title} "
                Category ?
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => setShowDelete(!showDelete)}
                >
                  No
                </Button>
                <Button variant="primary" onClick={() => deleteCategoty(id)}>
                  Yes
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
        <div className="table-container-body bg-white">
          <table className="table table-centered mb-0">
            <thead>
              <tr>
                <th>
                  Title{" "}
                  <img
                    style={{
                      width: "15px",
                      height: "15px",
                      marginTop: "-10px",
                      marginLeft: "5px",
                    }}
                    src={imageup}
                    onClick={() => setSortData("title:asc")}
                  />
                  <img
                    style={{
                      width: "15px",
                      height: "15px",
                      marginLeft: "-15px",
                      marginTop: "10px",
                    }}
                    src={image}
                    onClick={() => setSortData("title:desc")}
                  />
                </th>
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
              {data.map((item: any, index: any) => {
                return (
                  <tr key={index}>
                    <td>{item.attributes.title}</td>

                    <td>
                      {" "}
                      <Form.Check
                        type="switch"
                        id="custom-switch"
                        onChange={() => onStatusChange(item.id, item)}
                        checked={item.attributes.isActive ? true : false}
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
                          navigate("/edit-category-list", { state: item })
                        }
                      >
                        Edit
                      </Button>
                      <Button
                        className="addbutton"
                        variant="primary"
                        size="sm"
                        active
                        type="button"
                        onClick={() => onDeleteChange(item, query)}
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
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    categoryData: state.category.category,
    totalData: state?.category?.meta?.pagination?.total,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchcategory: (query: any) => dispatch(fetchcategory(query)),
    deleteCategory: (id: any, query: any) =>
      dispatch(deleteCategory(id, query)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Categorylist);
