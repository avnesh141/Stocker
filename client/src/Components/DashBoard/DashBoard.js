import React, { useEffect, useState } from "react";
import ComapanyCard from "./ComapanyCard";
import "./Dashboard.css";
import { Link, json, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Transaction from "./Transaction";
import Loader from "../Loader";

function Dashboard() {
const[ch,setch]=useState(false);
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
    const currUser = localStorage.getItem("user");
    if (currUser != undefined) {
      setuser(JSON.parse(currUser))
      return;
    }
    const response = await fetch(`/api/auth/getuser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authtoken: JSON.stringify(localStorage.getItem("token")),
      },
    });
    console.log(response);
    const newuser = await response.json();
    newuser.date = newuser.date.slice(0, 10);
    setuser(newuser);
    localStorage.setItem("user", JSON.stringify(newuser));
    if (!json.success) {
      toast.error(json.error);
    }
  };

  const navigate = useNavigate();
  const onclickwallet = () => {
    navigate("/wallet");
  }

  const onmouseover = () => {
    document.getElementById('dropdown').style.display = "block";
  }
  const onmouseleave = () => {
    document.getElementById('dropdown').style.display = "none";
  }
  useEffect(() => {
    boughtfunc();
    funcuser();
    setTimeout(() => {
      setch(true);
    }, 2000);
  }, []);

  return (
    <>
    { ch==true &&
    <div className="Dashboard-page">
      <div className="topportContainer">
        <h2
          style={{
            color: "#43bc43",
          }}
        >
          {" "}
          Hello! {user.name}
        </h2>
        <div className="profNwall">
          {/* <div className="transact"> */}
          <img
            onMouseOver={onmouseover}
            onMouseLeave={onmouseleave}
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50px",
              backgroundPosition: "center",
            }}
            src={user.picture}
            alt=""
          />
          <div id="dropdown"
            onMouseOver={onmouseover}
            onMouseLeave={onmouseleave}>
            <div className="up-arrow"></div>
            <div className="drop-entity"><Link to="/profile">Go To Profile</Link></div>

          </div>
          <div style={{ textAlign: "justify" }}>
            <h4
              style={{
                color: "#43bc43",
                margin: "10px",
              }}
            >
              Your Balance: ₹ {user.amount}/-
            </h4>
            <h4
              style={{
                color: "#43bc43",
                margin: "10px",
              }}
            >
              Amount Invested: ₹ {invest}/-
            </h4>
          </div>
        </div>

        <div className="boughtStocks">
          <h3 style={{ color: "rgb(12, 177, 177)" }}>Stocks</h3>
          {boughtst.length ? (
            boughtst.map((stock, key) => {
              return (
                <ComapanyCard
                  company={stock.company}
                  number={stock.number}
                  price={stock.price}
                  type={stock.type}
                  symbol={stock.symbol}
                  id={stock._id}
                  key={key}
                />
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
                <ComapanyCard
                  company={stock.company}
                  number={stock.number}
                  price={stock.price}
                  type={stock.type}
                  symbol={stock.symbol}
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
      <div className="Transactions">
        <h1>Your Recent Transactions</h1>
        <Transaction />
      </div>
    </div>}
    {
      ch==false &&
      <Loader/>
    }
    </>
  );
}
export default Dashboard;