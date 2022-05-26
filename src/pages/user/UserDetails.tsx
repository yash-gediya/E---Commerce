import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDeleteUsers,
  fetchUserslist,
} from "../../redux/actionFiles/UsersAction";
import { ExportToExcel } from "../../components/ExportToExcel";
import "../../projects.css";
import { toast } from "react-toastify";

const UserDetails = () => {
  const [data, setData]: any = useState([]);
  const [search, setSearch] = useState("");
  const [showDelete, setShowDelete]: any = useState();
  const [id, setId] = useState();
  const [item, setItem]: any = useState();
  const [number, setNumber] = useState(1);
  const [checked, setChecked] = useState(false);
  const [focus, setFocus] = useState(false);
  const [showmultipleDelete, setShowmultipleDelete]: any = useState(false);

  //<----------------------Pagination---------------------
  const postPerPage = 10;

  const lastPost = number * postPerPage;
  const firstPost = lastPost - postPerPage;
  const currentPost = data?.slice(firstPost, lastPost);

  const pageNumber = [];

  const multipleDeleteSuccess = () => toast("Delete Successfully");

  for (let i = 1; i <= Math.ceil(data?.length / postPerPage); i++) {
    pageNumber.push(i);
  }

  const ChangePage = (pageNumber: any) => {
    setNumber(pageNumber);
  };
  //-------------------------------------------------------------
  const dispatch = useDispatch();
  const handleDeleteClose = () => setShowDelete(!showDelete);

  const filteredProducts = (searchVal: string) => {
    const filteredData1 = userData.filter(
      (item: any) =>
        item.username.toLowerCase().includes(searchVal.toLowerCase()) ||
        item.email.toLowerCase().includes(searchVal.toLowerCase())
    );
    setData([...filteredData1]);
  };

  const userData = useSelector((state: any) => state?.userList?.userList);

  useEffect(() => {
    dispatch(fetchUserslist());
  }, []);

  useEffect(() => {
    setData(userData);
  }, [userData]);

  const handleDeleteUser = (id: any) => {
    dispatch(fetchDeleteUsers(id));
    setShowDelete(false);
  };

  const onDeleteChange = (item: any) => {
    setItem(item);
    setId(item?.id);

    setShowDelete(!showDelete);
  };

  const handleMultipleDelete = () => setShowmultipleDelete(!showmultipleDelete);

  //<-----------------------------Export File---------------------
  const fileName = "myfile";
  const onCheckedChange = () => {
    if (checked === false) {
      setData(data?.map((item: any) => ({ ...item, selected: true })));
    } else {
      setData(data?.map((item: any) => ({ ...item, selected: false })));
    }
    setChecked(!checked);
  };

  const onSelectedItem = (id: any) => {
    data.find((item: any) => {
      if (item?.id == id) {
        item.selected = !item.selected;
      }
      setData([...data]);
    });
  };
  const onMultipleDelete = () => {
    setShowmultipleDelete(true);
  };

  const selectedData = data?.filter((item: any) => item?.selected);

  const onmultipleDelete = () => {
    selectedData?.map((item: any) => {
      dispatch(fetchDeleteUsers(item.id));
      setShowmultipleDelete(false);
      setNumber(1);
    });
    multipleDeleteSuccess();
  };

  return (
    <>
      {" "}
      <div className="table-container p-4">
        <div className="table-container-header">
          <div className="d-flex justify-content-between pb-3">
            <div>
              <h3 className="table-container-heading">User Details</h3>
            </div>
            <div>
              <input
                style={{ height: "fit-content" }}
                className="input rounded mr-3 mt-2"
                placeholder="Search Here"
                onChange={(e) => {
                  setSearch(e.target.value);
                  filteredProducts(e.target.value);
                }}
              />{" "}
              <Button
                className="export mr-3"
                variant="primary"
                size="lg"
                active
                onClick={onMultipleDelete}
                disabled={selectedData?.length === 0}
              >
                Delete
              </Button>
              <ExportToExcel apiData={selectedData} fileName={fileName} />
            </div>
          </div>
        </div>
        <Modal
          show={showDelete}
          onHide={handleDeleteClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Body>
            Are you sure want to delete " {item?.username} " ?
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowDelete(!showDelete)}
            >
              No
            </Button>
            <Button variant="primary" onClick={() => handleDeleteUser(id)}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>

        {/* ...................multipleDelete Users..................... */}

        <Modal
          show={showmultipleDelete}
          onHide={handleMultipleDelete}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Body>Are you sure want to delete Users ?</Modal.Body>
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
        <div className="table-container-body bg-white">
          <table className="table table-centered mb-0">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={onCheckedChange}
                  />
                </th>
                <th>User Name</th>
                <th>User Email</th>
                <th>User RegistrationDate</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentPost?.map((item: any, index: any) => {
                const dateconvert = new Date(item?.createdAt);
                const dateFormate =
                  dateconvert.getDate() +
                  " - " +
                  (dateconvert.getMonth() + 1) +
                  " - " +
                  dateconvert.getFullYear();
                return (
                  <tr key={index}>
                    <td>
                      <input
                        type="checkbox"
                        checked={item?.selected}
                        onChange={() => onSelectedItem(item.id)}
                      />
                    </td>
                    <td>{item.username}</td>
                    <td>{item.email}</td>
                    <td>{dateFormate}</td>
                    <td className="table-button">
                      {" "}
                      <Button
                        className="addbutton"
                        variant="primary"
                        size="sm"
                        active
                        type="button"
                        onClick={() => onDeleteChange(item)}
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
            className="px-3 py-1 m-1 text-center btn-primary "
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

export default UserDetails;
