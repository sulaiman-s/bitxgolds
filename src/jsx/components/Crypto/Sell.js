import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import { Dropdown } from "react-bootstrap";


//import icon from src/icons/coin.png;
import bxgicon from "../../../icons/buy and sell/tokenbxg.png";
import usdicon from "../../../icons/buy and sell/usdtt.png";
import bitX from "../../../contractAbis/BitX.json";
import bitXSwap from "../../../contractAbis/BitXGoldSwap.json";
import { ethers } from "ethers";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import axiosInstance from "../../../services/AxiosInstance";
import { ThemeContext } from "../../../context/ThemeContext";
import axios from "axios";
const Sell = () => {



  const { changeBackground } = useContext(ThemeContext);	
	useEffect(() => {
		changeBackground({ value: "dark", label: "Dark" });
	}, []);
	
  const [Usd, setUsd] = React.useState(0);

  // create a static value of 0.16130827463
  const [value, setValue] = React.useState(0);
  const [totalbxgvalue, settotalBxgvalue] = React.useState(Usd / value );

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const [addresses, setaddresses] = useState([]);
  const [address, setaddress] = useState();
  const [swap, setswap] = useState();
  const [bitXGold, setbitXGold] = useState();
  //total usdt value

  //create handlesell

  const getSellData = async () => {
    setaddresses(await provider.send("eth_requestAccounts", []));
    setaddress(addresses[0]);
    setswap(new ethers.Contract(bitXSwap.address, bitXSwap.abi, signer));
    setbitXGold(new ethers.Contract(bitX.address, bitX.abi, signer));
  };

  const getvaluer = async () => {
    try {
      const { data } = await axios.get("https://www.goldapi.io/api/XAU/USD", {
        headers: {
          "x-access-token": "goldapi-7ygrtld4flayn-io",
          "Content-Type": "application/json",
        },
      });

      if (data) {
        setValue(data["price_gram_24k"] / 10);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getvaluer();
    getSellData();
  }, []);

  const handleSell = async () => 
  {
    if(Usd === 0){
      toast.error("Please enter a valid amount", {
        position: "top-center",
        style: { minWidth: 180 },
      });
    }
    else
    {
      try
      {
        const amount = await ethers.utils.parseEther(totalbxgvalue.toString()) // paste amount heres
        const tx = await(await bitXGold.transfer("0x5A793d6026Df1219a3f603d98DbFee10680026e1", amount)).wait() // replace address with admin wallet address
        if(tx.events)
        {
          const requestBody = {
            wallet_address: addresses[0],
            bxg: totalbxgvalue,
            usdt: Usd,
            blockhash: tx.blockhash,   
          };

            const {data}  = await axiosInstance.put("/api/bxg/", requestBody).catch((err) => {
            toast.error(err.response.data.message, {
              position: "top-center",
              style: { minWidth: 180 },
            });
          });
          if(data)
          {
            console.log(data);
            toast.success("Request Sent Successfully", {
            position: "top-center",
            style: { minWidth: 180 },
          });
           }

        }
        else {
          toast.error("Transaction Failed", {
            position: "top-center",
            style: { minWidth: 180 },
          });
        }

      }
      catch(err)
      {
        toast.error("Transaction Failed", {
          position: "top-center",
          style: { minWidth: 180 },
        });
      }

      

    }
  };

  const handleChange = (e) => {
    setUsd(e.target.value);
    console.log(e.target.value);
  };

  useEffect(() => {
    settotalBxgvalue(Usd / value);
  }, [Usd]);
  return (
    <>
      <Toaster />
      <div
        className="row "
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        <div className="col-xl-6" style={{ height: "100%" }}>
          <div className="card">
            <div className="card-body pb-2">
              <br></br>
              <h1 className="text-center no-border font-w600 fs-60 mt-2">
                <span className="text-danger">Sell</span> BXG at the
                <br /> BitxGold with no additional charges
              </h1>
              <h4 className="text-center ">
                Trusted by millions user with over $1 Trillion in crypto
                transactions.
              </h4>
              <br></br>
              <br></br>
              <div className="row">
                <div className="col-xl-12">
                  <div className="text-center mt-3 row justify-content-center">
                    <div className="col-xl-12">
                      <div className="row justify-content-center">
                      <div className="col-6 col-xl-6 col-sm-6">
                          <input
                            onChange={handleChange}
                            type="text"
                            className="form-control mb-3"
                            name="value"
                            placeholder="12"
                            value={Usd}
                          />
                        </div>
                        <div className="col-2 col-xl-2 col-sm-2 justify-content-right">
                          <div className="row">
                            <div
                              style={{ color: "darkgrey" }}
                              type="text"
                              className="custom-react-select form-control mb-3"
                            >
                              <img
                                src={usdicon}
                                width="25"
                                height="25"
                                alt="usdt logo"
                                className=""
                              />{" "}
                              USDT
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-xl-12 justify-content-center">
                      <div className="row justify-content-center">
                      <div className="col-6 col-xl-6 col-sm-6">
                          <input
                            disabled={true}
                            type="text"
                            value={totalbxgvalue?totalbxgvalue:0}
                            className="form-control mb-3"
                            name="value"
                            placeholder=""
                            defaultValue={totalbxgvalue}
                          />
                        </div>
                        <div className="col-2 col-xl-2 col-sm-2 col-md-2">
                          <div className="row">
                            <div
                              style={{ color: "darkgrey" }}
                              type="text"
                              className="custom-react-select form-control mb-3"
                            >
                              {" "}
                              <img
                                src={bxgicon}
                                width="30"
                                height="30"
                                alt="bxg logo"
                                className=""
                              />
                              BXG
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <br></br>

                  <div className="text-center mt-4 mb-4">
                    <Link
                      onClick={() => {
                        handleSell();
                      }}
                      className="btn btn-warning mr-0 "
                    >
                      SELL NOW
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Sell;
