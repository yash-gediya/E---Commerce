import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../src/projects.css";
import { Line } from "@ant-design/plots";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserslist } from "../redux/actionFiles/UsersAction";

const Dashboard = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [firstLoad, setFirstLoad] = useState(false);
  const userData = useSelector((state: any) => state?.userList?.userList);
  const [datas, setDatas]: any = useState([]);

  useEffect(() => {
    if (!firstLoad) {
      dispatch(fetchUserslist());
      setFirstLoad(true);
    }
  }, []);

  useEffect(() => {
    const result = userData?.reduce(function (r: any, a: any) {
      const dateconvert = new Date(a.createdAt);
      const dateFormate =
        dateconvert.getDate() +
        "-" +
        (dateconvert.getMonth() + 1) +
        "-" +
        dateconvert.getFullYear();

      r[dateFormate] = r[dateFormate] || [];
      r[dateFormate].push(a);
      return r;
    }, Object.create(null));

    let temp;
    if (result) {
      temp = Object?.entries(result);
    }
    temp?.map((item: any) => {
      setDatas((prev: any) => [
        ...prev,
        {
          year: item[0],
          value: item[1].length,
        },
      ]);
    });
  }, [userData]);

  const config = {
    data: datas,
    xField: "year",
    yField: "value",
    label: {},
    point: {
      size: 5,
      shape: "diamond",
      style: {
        fill: "white",
        stroke: "#5B8FF9",
        lineWidth: 2,
      },
    },
    tooltip: {
      showMarkers: false,
    },
    state: {
      active: {
        style: {
          shadowBlur: 4,
          stroke: "#000",
          fill: "red",
        },
      },
    },
    interactions: [
      {
        type: "marker-active",
      },
    ],
  };

  return (
    <div>
      <div className="d-flex mt-4">
        <div className="col-4">
          <Card className="dashboard-cart">
            <Card.Body>
              <Card.Title>Product List</Card.Title>
              <Card.Text className="m-0 pb-4">
                When the product is right, you don’t have to be a great
                Marketer.
              </Card.Text>
              <Button
                variant="primary"
                onClick={() => navigate("/product-list")}
              >
                Product
              </Button>
            </Card.Body>
          </Card>
        </div>
        <div className="col-4">
          <Card className="dashboard-cart">
            <Card.Body>
              <Card.Title>Category</Card.Title>
              <Card.Text className="m-0 pb-4">
                The sales department isn’t the whole company, but the whole
                company better be the sales department.
              </Card.Text>
              <Button
                variant="primary"
                onClick={() => navigate("/category-list")}
              >
                Category
              </Button>
            </Card.Body>
          </Card>
        </div>{" "}
        <div className="col-4">
          <Card className="dashboard-cart">
            <Card.Body>
              <Card.Title>Cart List</Card.Title>
              <Card.Text className="m-0 pb-4">
                “If you’re competitor-focused, you have to wait until there is a
                competitor doing something.
              </Card.Text>
              <Button variant="primary" onClick={() => navigate("/cart-list")}>
                Cart
              </Button>
            </Card.Body>
          </Card>
        </div>
      </div>{" "}
      <div className="charts my-5">
        <Line {...config} />
      </div>
    </div>
  );
};

export default Dashboard;
