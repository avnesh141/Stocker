import React, { useEffect, useState } from "react";
import "./CryptoCard.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const CryptoCard = (props) => {
  // console.log(props);
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
    symbol:props.coin_id
  });

  const Clickhandlersell = async () => {
    toast.success("Wait while request is processing");
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
      symbol:props.coin_id
    });
  };

  const Clickhandlerbuy = async () => {
    // console.log(data);
    toast.success("Wait while request is processing");
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
      symbol:props.coin_id,
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
          >
            <Link to={`/cryptoPage/${props.coin_id}`}>
            {props.name}
            </Link>
          </div>
            <img src={props.imgurl} alt="" />
          <div className="ltp">
            <h6>LTP ₹{props.price}</h6>
            <h6 className="changes" style={{"color":`${props.change>0?'green':'red'}`}}>
              ₹ {props.change} ({props.changepercent} %)
            </h6>
          </div>
          <button
          // style={{"background"}}
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
          <p>Net value ={data.price*data.number} </p>
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
          <p>Net value ={data.price*data.number}</p>
          <button onClick={confirmsell}>Confirm trans.</button>
        </div>
      </div>
    </div>
  );
};
export default CryptoCard;
