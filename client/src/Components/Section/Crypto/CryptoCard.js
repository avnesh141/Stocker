import React, { useState } from "react";
import "./CryptoCard.css";
import { toast } from "react-toastify";

const ComapanyCard = (props) => {
  const openbuy = () => {
    if (
      document.getElementById(`${props.id}buy`).style.display === "inline-block"
    ) {
      document.getElementById(`${props.id}buy`).style.display = "none";
    } else {
      document.getElementById(`${props.id}buy`).style.display = "inline-block";
      document.getElementById(`${props.id}sell`).style.display = "none";
    }
  };
  const opensell = () => {
    if (
      document.getElementById(`${props.id}sell`).style.display ===
      "inline-block"
    ) {
      document.getElementById(`${props.id}sell`).style.display = "none";
    } else {
      document.getElementById(`${props.id}sell`).style.display = "inline-block";
      document.getElementById(`${props.id}buy`).style.display = "none";
    }
  };

  const [data, setdata] = useState({
    company: `${props.name}`,
    type: props.type,
    number: "",
    price: props.price,
  });

  const Clickhandlersell = async () => {
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
      company: `${props.name}`,
      type: props.type,
      number: 0,
      price: props.price,
    });
  };

  const Clickhandlerbuy = async () => {
    console.log(data);
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
    openbuy();
    setdata({
      company: `${props.name}`,
      type: props.type,
      number: 0,
      price: props.price,
    });
  };

  const confirmbuy = () => {
    if (window.confirm("Are You ready for transaction")) {
      Clickhandlerbuy();
    }
  };

  const confirmsell = () => {
    if (window.confirm("are u ready for transaction")) {
      Clickhandlersell();
    }
  };

  const onchange = (e) => {
    setdata({ ...data, [e.target.name]: [e.target.value] });
  };

  return (
    <div className="portList">
      <div className="portCard">
        <div className="portContainer">
          <div
            className="comName"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <h5>{props.name}</h5>
            <img src={props.imgurl} alt="" />
          </div>
          <div className="ltp">
            <h6>LTP ₹{props.price}</h6>
            <h6>
              ₹{props.change}({props.changepercent}%)
            </h6>
          </div>
          <button
            className="buy"
            onClick={(e) => {
              e.preventDefault();
              openbuy();
            }}
            disabled={!localStorage.getItem("token")}
          >
            Buy
          </button>
          <button
            className="sell"
            onClick={(e) => {
              e.preventDefault();
              opensell();
            }}
            disabled={!localStorage.getItem("token")}
          >
            Sell
          </button>
        </div>
        <div className="qtyifClickedbuy" id={`${props.id}buy`}>
          <p>
            Amount you want to buy:
            <input
              type="number"
              value={data.number}
              name="number"
              onChange={onchange}
              placeholder="Enter here Amount You want to Buy"
            />
          </p>
          <p>Net value = Qty X LTP</p>
          <button onClick={confirmbuy}>Confirm trans.</button>
        </div>
        <div className="qtyifClickedsell" id={`${props.id}sell`}>
          <p>
            Amount you want to sell:
            <input
              type="number"
              value={data.number}
              name="number"
              onChange={onchange}
              placeholder="Enter here Amount You want to Sell"
            />
          </p>
          <p>Net value = Qty X LTP</p>
          <button onClick={confirmsell}>Confirm trans.</button>
        </div>
      </div>
    </div>
  );
};
export default ComapanyCard;
