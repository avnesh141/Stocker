import React, { useEffect, useState } from "react";
import ComapanyCard from "./ComapanyCard";
import "./Dashboard.css";
import photo from "./photo.jpg"
import {useNavigate } from "react-router-dom";

function Dashboard() {
  const [boughtst, setboughtst] = useState([]);
  const [boughtcr, setboughtcr] = useState([]);
  const [invest, setinvest] = useState(0);
  const boughtfunc = async () => {
    const response = await fetch(`/api/invest/get`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authtoken: JSON.stringify(localStorage.getItem("token")),
      },
    });
    let parsedata = await response.json();
    let finaldata = Object.values(parsedata.stocks);
    let value = 0;
    finaldata.forEach((element) => {
      value += element.price * element.number;
    });
    setinvest(value);
    let newboughtst = finaldata.filter((stock) => {
      return stock.type === "stock";
    });
    setboughtst(newboughtst);
    let newboughtcr = finaldata.filter((stock) => {
      return stock.type === "crypto";
    });
    setboughtcr(newboughtcr);
  };

  const [user, setuser] = useState({});
  const funcuser = async () => {
    const response = await fetch(`/api/auth/getuser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authtoken: JSON.stringify(localStorage.getItem("token")),
      },
    });
    const newuser = await response.json();
    setuser(newuser);
    console.log(user);
  };

  const navigate = useNavigate();
  const onclickwallet = () => {
    navigate("/wallet");
}




  useEffect(() => {
    boughtfunc();
    funcuser();
  },[]);

  return (
    <div className="Dashboard-page">
      <div className="topportContainer">
        <div className="profNwall">
          <img
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50px",
              backgroundPosition: "center",
            }}
            src={photo}
            alt=""
          />
          <h4
            style={{
              color: "#43bc43",
              margin: "10px",
            }}
          >
            Your Balance: ₹ {user.amount}/-
          </h4>
        </div>
        <h2
          style={{
            color: "#43bc43",
          }}
        >
          {" "}
          Hello! {user.name}
        </h2>

        {/* <div>
          <h3>Amount:{user.amount}</h3>
        </div> */}
        {/* <div>
          <h3>Invested:{invest}</h3>
        </div> */}
        <div className="boughtStocks">
          <h3 style={{ color: "rgb(12, 177, 177)" }}>Stocks</h3>
          {boughtst.length ? (
            boughtst.map((stock, key) => {
              return (
                // stock.type === "stock" && (
                <ComapanyCard
                  company={stock.company}
                  number={stock.number}
                  price={stock.price}
                  type={stock.type}
                  id={stock._id}
                  key={key}
                />
                // )
              );
            })
          ) : (
            <h4>Your bought-Stocks Come Here</h4>
          )}
        </div>
        <div className="boughtCrypto">
          <h3 style={{ color: "rgb(12, 177, 177)" }}>Crypto</h3>
          {boughtcr.length ? (
            boughtcr.map((stock, key) => {
              return (
                // stock.type==="crypto" &&
                <ComapanyCard
                  company={stock.company}
                  number={stock.number}
                  price={stock.price}
                  type={stock.type}
                  id={stock._id}
                  key={key}
                />
              );
            })
          ) : (
            <h4>Your bought-Crypto Come Here</h4>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
