import React, { useEffect, useState } from "react";
import Chart from "./Chart";
import "./StockPage.css";
// import axios from "axios";
import { stocks } from "../../DashBoard/StocksData";
import { useParams } from "react-router";
import { toast } from "react-toastify";
function StockPage() {
  const { id } = useParams();
  const [compData, setCompData] = useState({});

  setTimeout(() => {
  // const funcst = () => {
    setCompData(stocks.find((item) => item.symbol === id));

    let pcchange = document.getElementById("pc-change");
    let pchange = document.getElementById("p-change");
    console.log(parseInt(compData.changep));
    if (pcchange) {
      if (parseFloat(compData.changep) >= 0) {
        pcchange.style.color = "green";
        pchange.style.color = "green";
      } else {
        pcchange.style.color = "red";
        pchange.style.color = "red";
      }
    }
  // }
  // useEffect(() => {
  //   funcst();
  // }, [])
  
  }, 0);

  const [data, setdata] = useState({
    company: compData.name,
    type: "stock",
    number: 0,
    price: compData.price,
  });

  const openbuy = () => {
    if (document.getElementById("buydiv").style.display === "inline-block") {
      document.getElementById("buydiv").style.display = "none";
    } else {
      document.getElementById("buydiv").style.display = "inline-block";
      document.getElementById("selldiv").style.display = "none";
    }
  };
  const opensell = () => {
    if (document.getElementById("selldiv").style.display === "inline-block") {
      document.getElementById("selldiv").style.display = "none";
    } else {
      document.getElementById("selldiv").style.display = "inline-block";
      document.getElementById("buydiv").style.display = "none";
    }
  };

  const Clickhandlersell = async () => {
    // console.log(data);
    const response = await fetch(`/api/invest/sell`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authtoken: JSON.stringify(localStorage.getItem("token")),
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    toast.success(json.message);
    opensell();
    setdata({
      company: compData.name,
      type: "stock",
      number: 0,
      price: compData.price,
    });
  };

  const Clickhandlerbuy = async () => {
    // console.log(data);
    const response = await fetch(`/api/invest/buy`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authtoken: JSON.stringify(localStorage.getItem("token")),
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    toast.success(json.message);
    console.log(response);
    openbuy();
    setdata({
      company: compData.name,
      type: "stock",
      number: 0,
      price: compData.price,
    });
  };

  const confirmbuy = () => {
    if (window.confirm("Are You ready for transaction")) {
      Clickhandlerbuy();
    }
  };

  // console.log(data);
  const confirmsell = () => {
    if (window.confirm("Are You ready for transaction")) {
      Clickhandlersell();
    }
  };

  const onchange = (e) => {
    setdata({
      company: compData.name,
      type: "stock",
      number: e.target.value,
      price: compData.price,
    });
  };

  return (
    <div className="stock-page-container">
      <div className="stock-page-box">
        <div className="stock-icon">
          <img src="https://assets-netstorage.groww.in/stock-assets/logos/NSE.png"></img>
        </div>
        {localStorage.getItem("token") &&
          <div className="button-div">
            <h1 className="compHead">{compData["name"]}</h1>
            <button
              className="buy-btn"
              onClick={(e) => {
                // e.preventDefault();
                openbuy();
              }}
            >
              Buy
            </button>
            <button
              className="sell-btn"
              onClick={(e) => {
                e.preventDefault();
                opensell();
              }}
            >
              Sell
            </button>
          </div>}
        <div className="buyselldiv">
          <div className="qtyifClickedbuy buysell" id="buydiv">
            <p>
              Amount you want to buy:
              <input
                placeholder="Enter here number of shares you want to Buy"
                type="number"
                value={data.number}
                name="number"
                onChange={onchange}
              />
            </p>
            <p>Net value ={data.number * compData.price}</p>
            <button onClick={confirmbuy}>Confirm trans.</button>
          </div>
          <div className="qtyifClickedsell buysell" id="selldiv">
            <p>
              Amount you want to sell:
              <input
                placeholder="Enter here number of shares you want to Sell"
                type="number"
                value={data.number}
                name="number"
                onChange={onchange}
              />
            </p>
            <p>Net value ={data.number * compData.price}</p>
            <button onClick={confirmsell}>Confirm trans.</button>
          </div>
        </div>
        <div className="stock-prices">
          <h2 className="stock-price">{compData["price"]}</h2>
          <p className="stock-change positive">
            <div id="pc-change">{compData["change"]}</div>
            <div id="p-change">({compData["changep"]})</div>
          </p>
        </div>
        <div className="stock-chart">
          <Chart name={id} />
        </div>
      </div>
    </div>
  );
}

export default StockPage;
