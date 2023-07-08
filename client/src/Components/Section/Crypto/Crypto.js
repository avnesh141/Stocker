import React, { useEffect, useState } from "react";
import ComapanyCard from "./CryptoCard";
// import { stocks } from "./Stocks";
import "./Crypto.css";

const Crypto = () => {
  //   stocks.map((stock) => {
  //     console.log(stock);
  //   })
  const [mBardata,setMbarData]=useState([]);
  const [cryptodata, setdata] = useState([]);
  const fetchdata = async () => {
    let url =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";
    const data = await fetch(url);
    const parsedata = await data.json();
    console.log(parsedata);
    setdata(parsedata.slice(0, 20));
    console.log(cryptodata);
    const mdata=[
      {
        "name":parsedata[0].name,
        "price":parsedata[0].current_price,
        "logo":parsedata[0].image,
        "change":parsedata[0].price_change_24h.toFixed(2),
        "changep":parsedata[0].price_change_percentage_24h.toFixed(2),
      },
      {
        "name":parsedata[1].name,
        "price":parsedata[1].current_price.toFixed(3),
        "logo":parsedata[1].image,
        "change":parsedata[1].price_change_24h.toFixed(3),
        "changep":parsedata[1].price_change_percentage_24h.toFixed(2),
      },
      {
        "name":parsedata[2].name,
        "price":parsedata[2].current_price,
        "logo":parsedata[2].image,
        "change":parsedata[2].price_change_24h.toFixed(3),
        "changep":parsedata[2].price_change_percentage_24h.toFixed(2),
      },
      {
        "name":parsedata[3].name,
        "price":parsedata[3].current_price,
        "logo":parsedata[3].image,
        "change":parsedata[3].price_change_24h.toFixed(3),
        "changep":parsedata[3].price_change_percentage_24h.toFixed(2),
      },
      {
        "name":parsedata[4].name,
        "price":parsedata[4].current_price,
        "logo":parsedata[4].image,
        "change":parsedata[4].price_change_24h.toFixed(3),
        "changep":parsedata[4].price_change_percentage_24h.toFixed(2),
      },
      {
        "name":parsedata[5].name,
        "price":parsedata[5].current_price,
        "logo":parsedata[5].image,
        "change":parsedata[5].price_change_24h.toFixed(3),
        "changep":parsedata[5].price_change_percentage_24h.toFixed(2),
      }
    ]
    setMbarData(mdata);
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
                 <img src={item.logo} alt="" />
                  <li>{item.name}</li>
                  <li>₹ {item.price}</li>
                  <li>{item.change}</li>
                  <li>({item.changep}%)</li>
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
                 <img src={item.logo} alt="" />
                  <li>{item.name}</li>
                  <li>₹ {item.price}</li>
                  <li>{item.change}</li>
                  <li>({item.changep}%)</li>
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
              <ComapanyCard
                id={index}
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
