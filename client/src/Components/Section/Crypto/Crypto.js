import React, { useEffect, useState } from "react";
import CryptoCard from "./CryptoCard";
import "./Crypto.css";

const Crypto = () => {
  const [mBardata,setMbarData]=useState([]);
  const [cryptodata, setdata] = useState([]);
  const fetchdata = async () => {
    let url =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false";
    const data = await fetch(url);
    const parsedata = await data.json();
    setdata(parsedata.slice(0, 20));
    const ndata=parsedata.slice(0,6);
    setMbarData(ndata);
  };
  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div>
      
    <div className="cryptodiv">
      <div className="mbars">
      <div className="mbar">
       { mBardata.map((item,index)=>{
            return (
              <div className="movingitem">
                <ul  >
                 <img src={item.image} alt="" />
                  <li>{item.name}</li>
                  <li>₹ {item.current_price}</li>
                  <li>{item.price_change_24h.toFixed(2)}</li>
                  <li>({item.price_change_percentage_24h.toFixed(2)} %)</li>
                </ul>
                </div>
            )
        })}
      </div>
      <div className="mbar">
       { mBardata.map((item,index)=>{
            return (
              <div className="movingitem">
                <ul  >
                 <img src={item.image} alt="" />
                  <li>{item.name}</li>
                  <li>₹ {item.current_price}</li>
                  <li>{item.price_change_24h.toFixed(2)}</li>
                  <li>({item.price_change_percentage_24h.toFixed(2)} %)</li>
                </ul>
                </div>
            )
        })}
      </div>
      </div>
      <div classNameName="crypto" >
        {cryptodata.map((crypto, index) => {
          return (
            <div classNameName="cryptoCard">
              <CryptoCard
                id={index}
                coin_id={crypto.id}
                name={crypto.name}
                price={crypto.current_price}
                change={crypto.price_change_24h.toFixed(2)}
                changepercent={crypto.price_change_percentage_24h.toFixed(2)}
                imgurl={crypto.image}
                type="crypto"
              />
            </div>
          );
        })}
      </div>
    </div>
    </div>
  );
};
export default Crypto;
