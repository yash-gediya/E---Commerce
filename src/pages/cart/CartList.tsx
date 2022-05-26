import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Paginations from "../Pagination";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserslist } from "../../redux/actionFiles/UsersAction";
import { fetchCartlist } from "../../redux/actionFiles/CartAction";

const CartList = () => {

  const cartData = useSelector((state: any) => state?.cart?.cart);
  const totalData = useSelector((state: any)=>state?.cart?.meta?.pagination?.total) 

  const [show, setShow] = useState(false);
  const [item, setItem]: any = useState();
  const [data,setData] = useState([...cartData])

useEffect(() => {
  setData([...cartData]);
}, [cartData]);

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

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleClose = () => setShow(!show);
  useEffect(() => {
    dispatch(fetchUserslist());
  }, []);

  const onStatusChange = (item: any) => {
    setItem(item);
    setShow(!show);
  };

  let query = `?pagination[withCount]=true&pagination[page]=${number}&pagination[pageSize]=5`;
  const userData = useSelector((state: any) => state?.userList?.userList);

  useEffect(() => {
    dispatch(fetchCartlist(query));
  }, [number]);

  let total = 0;

  return (
    <div className="table-container p-4">
      <div className="table-container-header">
        <div className="d-flex justify-content-between pb-3">
          <div>
            <h3 className="table-container-heading">Cart</h3>
          </div>
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Body>
              <Button className="close" onClick={() => setShow(!show)}>
                &times;
              </Button>{" "}
              <table className="table table-centered mb-0">
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {item?.map((itm: any) => {
                    total =
                      total +
                      parseInt(itm?.product?.data?.attributes?.price) *
                        parseInt(itm?.qty);
                    return (
                      <tr>
                        <td>{itm?.product?.data?.attributes?.productTitle}</td>
                        <td>{itm?.qty}</td>
                        <td>
                          {parseInt(itm?.product?.data?.attributes?.price) *
                            parseInt(itm?.qty)}
                        </td>
                      </tr>
                    );
                  })}
                  <tr>
                    <td colSpan={2} className="fw-bold">
                      TOTAL
                    </td>
                    <td className="fw-bold">{total}</td>
                  </tr>
                </tbody>
              </table>
            </Modal.Body>
          </Modal>

          
        </div>
      </div>
      <div className="table-container-body bg-white">
        <div className="p-2">
          <table className="table table-centered mb-0">
            <thead>
              <tr>
                <th>Order Id</th>
                <th>User Name</th>
                <th>Quantity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                data?.map((item: any, index: number) => {
                  const [temp] = userData.filter((items: any) => {
                    if (items?.id === item?.attributes?.user_id?.data?.id) {
                      item.attributes.user_id.data.id = items?.username;
                    }
                  });

                  return (
                    <tr key={index}>
                      <td>{item?.id}</td>
                      <td>{item?.attributes?.user_id?.data?.id}</td>
                      <td>{item?.attributes?.product_list?.length}</td>
                      <td className="table-button"> 
                        {" "}
                        <Button
                          className="addbutton mr-2"
                          variant="primary"
                          size="sm"
                          active
                          onClick={() =>
                            onStatusChange(item?.attributes?.product_list)
                          }
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
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

export default CartList;
