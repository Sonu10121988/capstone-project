import React, { useEffect, useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";

const OrderHistory = () => {
  const [prevHistory, setprevHistory] = useState([]);
  const [userData, setUserData] = useState({});

  const getUserHistory = async () => {
    try {
      const res = await fetch("http://localhost:4000/orderHistory", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data, "hello data");
      console.log(data.orderHistory.items, "items here");
      setprevHistory(data.orderHistory.items);
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserHistory();
  }, []);

  const callUserName = async () => {
    try {
      const res = await fetch("/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const datas = await res.json();
      console.log(datas);
      setUserData(datas);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    callUserName();
  }, []);
  return (
    <div className="table-responsive">
    <div className="container">
      <div className="hero-section-data">
        <p className="intro-data">Thank You For Shopping </p>
        <form method="GET">
          <h2>{userData.name} <BsEmojiSmileFill style={{color: "green", fontSize: "30px"}}/></h2>
        </form>
      </div>
      </div>
      <div className="container  py-5">
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Sr.No</th>
              <th scope="col">Order ID</th>
              <th scope="col">Price</th>
              <th scope="col">Name</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {prevHistory.map((orderhistoryinfo, index) => (
              <tr>
                <th scope="row">{index}</th>
                <td>{orderhistoryinfo._id}</td>
                <td>{orderhistoryinfo.price / 100} /- </td>
                <td>{orderhistoryinfo.name}</td>
                <td>Process...</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderHistory;
