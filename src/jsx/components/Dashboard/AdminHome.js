import React, { useContext, useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
//import {NavLink} from 'react-router-dom';
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import { Button, Dropdown, Form, Modal, Nav, Tab } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
//Import Components
import { ThemeContext } from "../../../context/ThemeContext";
import BalanceCardSlider from "./Dashboard/BalanceCardSlider";
//import MorrisDonught from './Dashboard/MorrisDonught';
import OrderForm from "./Dashboard/OrderForm";
//import ServerStatusBar from './Dashboard/ServerStatusBar';
import { LtcIcon, BtcIcon, XtzIcon, EthIcon } from "./SvgIcon";
import OrderTab from "../Trading/Future/OrderTab";
import TradeTab from "../Trading/Future/TradeTab";
//images
import coin from "./../../../images/coin.png";
import metaverse from "./../../../images/metaverse.png";
import axiosInstance from "../../../services/AxiosInstance";
import { ethers } from "ethers";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { useRef } from "react";



const tableData = [
  { price: "19972.43", Size: "0.0488", total: "6.8312" },
  { price: "20972.43", Size: "0.0588", total: "5.8312" },
  { price: "16572.43", Size: "0.0488", total: "7.8312" },
  { price: "20972.43", Size: "0.0114", total: "8.1212" },
  { price: "19972.43", Size: "0.0216", total: "6.9852" },
  { price: "20972.43", Size: "0.0325", total: "3.1232" },
  { price: "19972.43", Size: "0.0434", total: "4.8122" },
  { price: "20972.43", Size: "0.0543", total: "5.6542" },
  { price: "19972.43", Size: "0.0651", total: "4.1232" },
  { price: "20972.43", Size: "0.0762", total: "2.1232" },
];

const AdminHome = () => {
  const [requests, setRequests] = useState([]);
  const [data, setData] = useState([]);
  const sort = 6;
  const activePag = useRef(0);
  const [test, settest] = useState(0);

  // Active data
  const chageData = (frist, sec) => {
    console.log(data.length);
    for (var i = 0; i < data.length; ++i) {
      if (i >= frist && i < sec) {
        data[i].classList.remove("d-none");
      } else {
        data[i].classList.add("d-none");
      }
    }
  };

  // Active pagginarion
  activePag.current === 0 && chageData(0, sort);
  // paggination
  let paggination = Array(
    Math.ceil(requests.filter((item) => item.type === "pending").length / sort)
  )
    .fill()
    .map((_, i) => i + 1);

  // Active paggination & chage data
  const onClick = (i) => {
    activePag.current = i;
    chageData(activePag.current * sort, (activePag.current + 1) * sort);
    settest(i);
  };
  // use effect
  useEffect(() => {
    setData(document.querySelectorAll("#future_wrapper tbody tr"));
    console.log(data.length);
  }, [test]);

  const FetchData = async () => {
    setLoader(true);
    try {
      const requestBody = {
        wallet_address: state.auth.auth.walletaddress,
      };
      const { data } = await axiosInstance.get("/api/bxghistory/getall");

      setRequests(data);

      if (!data.wallet_address) {
        toast.error("Network Error Try Again Later", {
          style: { minWidth: 180 },
          position: "top-center",
        });
      } else {
        //setActiveData(pendingrequests);
        setLoader(false);
      }
    } catch (err) {
      toast.error("Network Error Try Again Later", {
        style: { minWidth: 180 },
        position: "top-center",
      });
    }
  };

  useEffect(() => {
    FetchData();
  }, []);

  const AcceptRequest = async (id) => {
    console.log("hello world");
    setLoader(true);
    try {
      const requestBody = {
        blockhash: "blockhash",
        type: "sell_accepted",
      };
      const response = await axiosInstance
        .put("/api/bxg/" + id, requestBody)
        .catch((error) => {
          console.log(error);
        });

      console.log(response);
      if (response) {
        toast.success("Request Approved");
        setLoader(false);
        FetchData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const RejectRequest = async (id) => {
    console.log("hello world");
    setLoader(true);
    try {
      const requestBody = {
        blockhash: "blockhash",
        type: "sell_rejected",
      };
      const response = await axiosInstance
        .put("/api/bxg/" + id, requestBody)
        .catch((error) => {
          console.log(error);
        });

      console.log(response);
      if (response) {
        toast.success("Request Approved");
        setLoader(false);
        FetchData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [loader, setLoader] = useState(false);
  const [isreferred, setisreferred] = useState(false);
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const [addresses, setaddresses] = useState([]);
  const [fetch, setfetch] = useState(false);
  const [bxgavailable, setbxgavailable] = useState(0);
  const [bxgstacked, setbxgstacked] = useState(0);
  const [referralBonus, setreferralBonus] = useState(0);
  const [totalEarning, settotalEarning] = useState(0);

  const state = useSelector((state) => state);

  const [referalAddress, setreferalAddress] = useState("");

  const getBonus = async () => {
    console.log(referalAddress);
    const requestBody = {
      wallet_address: state.auth.auth.walletaddress,
      refer_code: referalAddress,
    };
    const { data } = await axiosInstance
      .post("/api/refer", requestBody)
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: "top-center",
        });
      });

    console.log(data);

    if (data === "Refered Successfully.") {
      toast.success(data);
      setisreferred(true);
      handleClose();
    } else {
      toast.error(data.message);
    }
  };

  const { changeBackground } = useContext(ThemeContext);
  useEffect(() => {
    changeBackground({ value: "dark", label: "Dark" });
  }, []);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <Tab.Container defaultActiveKey="All">
                <div className="card-header border-0 pb-2 flex-wrap">
                  <h4 className="heading">Sell Requests</h4>
                  <>
                    <Nav className="order nav nav-tabs">
                      <Nav.Link as="button" eventKey="All" type="button">
                        Pending Requests
                      </Nav.Link>
                      <Nav.Link as="button" eventKey="Order" type="button">
                        Accepted Requests
                      </Nav.Link>
                      <Nav.Link as="button" eventKey="Trade" type="button">
                        Rejected Requests
                      </Nav.Link>
                    </Nav>
                  </>
                </div>
                <div className="card-body pt-0 pb-0">
                  <Tab.Content>
                    <Tab.Pane eventKey="All">
                      <div className="table-responsive dataTabletrade ">
                        <div
                          id="future_wrapper"
                          className="dataTables_wrapper no-footer">
                          <table
                            id="example"
                            className="table display dataTable no-footer"
                            style={{ minWidth: "845px" }}>
                            <thead>
                              <tr>
                                <th>ID</th>
                                <th>Wallet Address</th>
                                {/* <th>Block Hash</th> */}
                                <th>BXG </th>
                                <th>USDT</th>
                                <th>Date</th>
                                <th className="text-end">Approval</th>
                              </tr>
                            </thead>
                            <tbody>
                              {}
                              {requests
                                ?.filter((item) => item.type === "pending")
                                .map((item, index) => (
                                  <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.wallet_address}</td>
                                    {/* <td>{item.blockhash}</td> */}
                                    <td>{item.bxg}</td>
                                    <td>{item.usdt}</td>
                                    <td>{item.createdAt}</td>
                                    <td className="text-end">
                                      <Link
                                        onClick={() => {
                                          AcceptRequest(item.id);
                                        }}
                                        className="btn btn-success mr-0 btn-sm">
                                        Accept
                                      </Link>

                                      <Link
                                        onClick={() => {
                                          RejectRequest(item.id);
                                        }}
                                        className="btn btn-warning mr-0 mx-2 btn-sm">
                                        Reject
                                      </Link>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                          <div className="d-sm-flex text-center justify-content-between align-items-center mt-3 mb-3">
                            {requests.filter((item) => item.type === "pending")
                              ?.length > 0 ? (
                              <div className="dataTables_info">
                                Showing {activePag.current * sort + 1} to{" "}
                                {requests.filter(
                                  (item) => item.type === "pending"
                                ).length >
                                (activePag.current + 1) * sort
                                  ? (activePag.current + 1) * sort
                                  : requests.filter(
                                      (item) => item.type === "pending"
                                    ).length}{" "}
                                of{" "}
                                {
                                  requests.filter(
                                    (item) => item.type === "pending"
                                  ).length
                                }{" "}
                                entries
                              </div>
                            ) : (
                              <div className="dataTables_info">
                                No Results Found
                              </div>
                            )}
                            <div
                              className="dataTables_paginate paging_simple_numbers mb-0"
                              id="application-tbl1_paginate">
                              <Link
                                className="paginate_button previous "
                                to="/admindashboard"
                                onClick={() =>
                                  activePag.current > 0 &&
                                  onClick(activePag.current - 1)
                                }>
                                <i className="fa fa-angle-double-left"></i>
                              </Link>
                              <span>
                                {paggination.map((number, i) => (
                                  <Link
                                    key={i}
                                    to="/admindashboard"
                                    className={`paginate_button  ${
                                      activePag.current === i ? "current" : ""
                                    } `}
                                    onClick={() => onClick(i)}>
                                    {number}
                                  </Link>
                                ))}
                              </span>

                              <Link
                                className="paginate_button next"
                                to="/admindashboard"
                                onClick={() =>
                                  activePag.current + 1 < paggination.length &&
                                  onClick(activePag.current + 1)
                                }>
                                <i className="fa fa-angle-double-right"></i>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="Order">
                      <OrderTab
                        //pass accepted requests data in props

                        acceptedData={requests.filter(
                          (item) => item.type === "sell_accepted"
                        )}
                      />
                    </Tab.Pane>
                    <Tab.Pane eventKey="Trade">
                      <TradeTab
                        rejectedData={requests.filter(
                          (item) => item.type === "sell_rejected"
                        )}
                      />
                    </Tab.Pane>
                  </Tab.Content>
                </div>
              </Tab.Container>
            </div>
          </div>
        </div>
      }
    </>
  );
};
export default AdminHome;
