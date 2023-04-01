import React, { useState } from 'react'
import "./Companycard.css"
import { toast } from 'react-toastify';

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


const [data,setdata]=useState({company:`${props.company}`,type:props.type,number:"",price:props.price})

  const Clickhandlersell = async() => {
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
        company: `${props.company}`,
        type: props.type,
        number: 0,
        price: props.price,
      }
    );
  }

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
        company: `${props.company}`,
        type: props.type,
        number: 0,
        price: props.price,
      });
    };

  const confirmbuy = () => {
    if (window.confirm("Are You ready for transaction"))
    {
      Clickhandlerbuy();
    }
}

  const confirmsell = () => {
    if (window.confirm("Are You ready for transaction"))
    {
      Clickhandlersell();
    }
}




  const onchange = (e) => {
    setdata({...data, [e.target.name]: [e.target.value]})
  }

  

  return (
    <div className="portList">
      <div className="portCard">
        <div className="portContainer">
          <div className="comName">
            <h5>{props.company}</h5>
            <h6>NET QTY {props.number}</h6>
          </div>
          <div className="ltp">
            <h6>LTP ₹{props.price}</h6>
            <h6>P&L ₹13.20</h6>
          </div>
          <div
            className="buy"
            onClick={(e) => {
              e.preventDefault();
              openbuy();
            }}
          >
            Buy
          </div>
          <div
            className="sell"
            onClick={(e) => {
              e.preventDefault();
              opensell();
            }}
          >
            Sell
          </div>
        </div>
        <div className="qtyifClickedbuy buysell" id={`${props.id}buy`}>
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
          <p>Net value ={data.number * props.price}</p>
          <button onClick={confirmbuy}>Confirm trans.</button>
        </div>
        <div className="qtyifClickedsell buysell" id={`${props.id}sell`}>
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
          <p>Net value = {data.number * props.price}</p>
          <button onClick={confirmsell}>Confirm trans.</button>
        </div>
      </div>
    </div>
  );
}
export default ComapanyCard