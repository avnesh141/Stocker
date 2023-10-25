import React from 'react'
import "./ThreeDCarousal.css"

function THREEDCarousal(props) {
  console.log(props.date);
  return (
    <div>
      <div className="carousel_wrapper">
        <div className="carousel">
          <div className="slide one">
            Market Cap Rank {props.rank}
          </div>
          <div className="slide two">
            Current Price ₹{props.currentPrice}/-
          </div>
          <div className="slide three">Price Change ₹{props.priceChange}/-
          </div>
          <div className="slide four">
            Market Cap ₹{props.marketCap}/-
          </div>
          <div className="slide five">
            Date Of Geneseis {props.date}
          </div>
          <div className="slide six">
            All Time High ₹{props.ath}/-
          </div>
          <div className="slide seven">
            All Time Low ₹{props.atl}/-
          </div>
          <div className="slide eight">
            Twitter Follower {props.twitter}
          </div>
        </div>
      </div>
    </div>
  )
}

export default THREEDCarousal