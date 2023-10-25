import React, { useEffect, useState } from 'react'
import CandlestickChart from './Chart'
import { useNavigate, useParams } from 'react-router-dom'
import "./CryptoPage.css"
import THREEDCarousal from './THREEDCarousal';
import { toast } from "react-toastify";

function CryptoPage() {
 const {id}=useParams();
const navigate=useNavigate();
 const [coindata,setCoinData]=useState();
 const [data, setdata] = useState({
   company: "",
   type: "crypto",
   symbol: "",
   number: 0,
   price: 0,
 });
const url=`https://api.coingecko.com/api/v3/coins/${id}`
const func= async ()=>{
    const cdata=await fetch(url);
    const json=await cdata.json();
    setCoinData(json);
    // console.log(json);
    setdata({
      company: coindata.name,
      type: "crypto",
      symbol: coindata.id,
      number: 0,
      price: coindata.market_data.current_price.inr,
    });
    // console.log(json.description.en.replace(/<a[^>]*>(.*?)<\/a>/g, '$1'));

}



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
    company: coindata.name,
    type: "crypto",
    symbol: coindata.id,
    number: 0,
    price: coindata.market_data.current_price.inr,
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
  // console.log(response);
  openbuy();
  setdata({
    company: coindata.name,
    type: "crypto",
    symbol: coindata.id,
    number: 0,
    price: coindata.market_data.current_price.inr,
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
    company: coindata.name,
    type: "crypto",
    symbol: coindata.id,
    number: e.target.value,
    price: coindata.market_data.current_price.inr,
  });
};
// console.log(data.number);



useEffect(() => {
 func();
},[])

  return (
    <div>
        {
        coindata &&
        <>
        <div className='cryPageHead'>
        <h1 className='cryPageHeadName' >{coindata.name}</h1>
        <img src={coindata.image.large}/>
        </div>
        <THREEDCarousal currentPrice={coindata.market_data.current_price.inr} date={coindata.genesis_date} rank={coindata.market_cap_rank}
         priceChange={coindata.market_data.price_change_24h_in_currency.inr.toFixed(2)} marketCap={coindata.market_data.market_cap.inr} atl={coindata.market_data.atl.inr}
         ath={coindata.market_data.ath.inr} twitter={coindata.community_data.twitter_followers}/>
        <div className='CryPageDesc'>
          <h2>About {coindata.name}</h2>
        <p>{coindata.description.en.replace(/<a[^>]*>(.*?)<\/a>/g, '$1')}</p>
        </div>
        <div className="button-div cryButtons">
        {localStorage.getItem("token") && <button
            className="buy-btn"
            onClick={(e) => {
              // e.preventDefault();
              openbuy();
            }}
            >
            Buy
          </button>}
          {!localStorage.getItem("token") && <button
            className="login-redirect"
            onClick={(e) => {
              // e.preventDefault();
              navigate("/login");
            }}
            >
            Login to Buy Or Sell
          </button>}
          {localStorage.getItem("token") &&
            <button
            className="sell-btn"
            onClick={(e) => {
              e.preventDefault();
              opensell();
            }}
            >
              Sell
            </button>}
          </div>
          
        <div className="buyselldiv   cryButtons">
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
            <p>Net value = ₹ {(data.number * coindata.market_data.current_price.inr).toFixed(2)}</p>
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
            <p>Net value = ₹ {(data.number * coindata.market_data.current_price.inr).toFixed(2)}</p>
            <button onClick={confirmsell}>Confirm trans.</button>
          </div>
        </div>
        <div className='cryPageChart'>
        <CandlestickChart name={id}/>
        </div>
        </>
}
    </div>
  )
}

export default CryptoPage