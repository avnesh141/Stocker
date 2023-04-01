import React, { useEffect, useState } from "react";
import ComapanyCard from "./CryptoCard";
// import { stocks } from "./Stocks";

import "./Crypto.css";

const Crypto = () => {
  //   stocks.map((stock) => {
  //     console.log(stock);
  //   })
  const [cryptodata, setdata] = useState([]);
  const fetchdata = async () => {
    let url =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";
    const data = await fetch(url);
    const parsedata = await data.json();
    console.log(parsedata);
    setdata(parsedata.slice(0,20));
  };
  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div className="crypto">
      {cryptodata.map((crypto, index) => {
        return (
          <div className="cryptoCard">
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
  );
};
export default Crypto;
