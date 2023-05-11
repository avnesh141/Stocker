import React, { useEffect, useState } from "react";
import "./Stocks.css";
import banknifty from "./Bank-nifty.jpg";
import nifty from "./nifty.png";
import sensex from "./sensex.webp"
import { Navigate, useNavigate } from "react-router-dom";
import { stocks } from "./USStockCompanies";
// import usCompanies from './USStockCompanies';
import { Link } from "react-router-dom";
function Stocks() {
  const navigate = useNavigate();
  // const cardClicked = (e) => {
  //     navigate('/stockpage')
  //     var sym = e.target.id;
  //     var x=stocks.find(item => item.symbol === sym)
  //     console.log(x);
  //     localStorage.setItem('selectedCard',JSON.stringify(x));
  // }

  let gainers = [...stocks].sort((a, b) => (a.changep < b.changep ? 1 : -1));
  let losers = [...stocks].sort((a, b) => (a.changep > b.changep ? 1 : -1));

  return (
    <div className="stocks-page">
      <div className="index-container">
        <h3>Index</h3>
        <div className="indexCards">
          <div className="indexCard">
            <div className="indexContainer">
              <img
                src={nifty}
                style={{ width: "40%", height: "70%", borderRadius: "10%" }}
                alt=""
              />
              <div className="indexDetails">
                <h5 className="indexHead" id="CNX100">
                  NIFTY50
                </h5>
                <div className="pricesbox">
                  <div className="prices">16969</div>
                  <div className="changes" style={{ color: "red" }}>
                    +40.59
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="indexCard">
            <div className="indexContainer">
              <img
                src={sensex}
                style={{ width: "40%", height: "70%", borderRadius: "10%" }}
                alt=""
              />
              <div className="indexDetails">
                <h5 className="indexHead" id="SENSEX">
                  SENSEX
                </h5>
                <div className="pricesbox">
                  <div className="prices">856565</div>
                  <div className="changes" style={{ color: "red" }}>
                    +50.2
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="indexCard">
            <div className="indexContainer">
              <img
                src={banknifty}
                style={{ width: "40%", height: "70%", borderRadius: "10%" }}
                alt=""
              />
              <div className="indexDetails">
                <h5 className="indexHead">BANKNIFTY</h5>
                <div className="pricesbox">
                  <div className="prices">87756</div>
                  <div className="changes" style={{ color: "red" }}>
                    -53.2
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr></hr>

      <div className="stocksContainer">
        <h3 className="heading">Stocks</h3>
        <div className="gainersList">
          {stocks.map((stock) => {
            return (
              <div className="gainersCard">
                <div className="gainersContainer">
                  <img
                    src={stock.image}
                    style={{ width: "20%", height: "40%" }}
                    alt=""
                  />
                  <div className="companyDetails">
                    <h5 id={stock.symbol} className="compName">
                      <Link className="compNameLink" to={`/${stock.symbol}`}>
                        {stock.name}
                      </Link>
                    </h5>
                    <h5 className="compPrice">{stock.price}</h5>
                    <h6 className="compChange">{stock.change}</h6>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* onClick={(e)=>cardClicked(e)} */}
      </div>
      <div class="parallax-2"></div>

      <hr></hr>

      <div className="stocksContainer">
        <h3 className="heading">Top Gainers</h3>
        <div className="gainersList">
          {gainers.map((stock) => {
            return (
              <div className="gainersCard">
                <div className="gainersContainer">
                  <img
                    src={stock.image}
                    style={{ width: "20%", height: "40%" }}
                    alt=""
                  />
                  <div className="companyDetails">
                    <h5 id={stock.symbol} className="compName">
                      <Link className="compNameLink" to={`/${stock.symbol}`}>
                        {stock.name}
                      </Link>
                    </h5>
                    <h5 className="compPrice">{stock.price}</h5>
                    <h6 className="compChange">{stock.changep}</h6>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* onClick={(e)=>cardClicked(e)} */}
      </div>
      <hr></hr>
      <div className="stocksContainer">
        <h3 className="heading">Top Losers</h3>
        <div className="gainersList">
          {losers.map((stock) => {
            return (
              <div className="gainersCard">
                <div className="gainersContainer">
                  <img
                    src={stock.image}
                    style={{ width: "20%", height: "40%" }}
                    alt=""
                  />
                  <div className="companyDetails">
                    <h5 id={stock.symbol} className="compName">
                      <Link className="compNameLink" to={`/${stock.symbol}`}>
                        {stock.name}
                      </Link>
                    </h5>
                    <h5 className="compPrice">{stock.price}</h5>
                    <h6 className="compChange">{stock.changep}</h6>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* onClick={(e)=>cardClicked(e)} */}
      <hr></hr>
    </div>
  );
}

export default Stocks;
