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
            {/* <img src="http://nasa-images.com/wp-content/uploads/2011/05/392.jpg" /> */}
          </div>
          <div className="slide two">
            Current Price ₹{props.currentPrice}/-
            {/* <img src="https://images.unsplash.com/photo-1487235829740-e0ac5a286e1c" /> */}
          </div>
          <div className="slide three">Price Change ₹{props.priceChange}/-
            {/* <img src="https://images.unsplash.com/photo-1473813585561-ec87eac91e39" /> */}
          </div>
          <div className="slide four">
            Market Cap ₹{props.marketCap}/-
            {/* <img src="http://nasa-images.com/wp-content/uploads/2011/05/261.jpg" /> */}
          </div>
          <div className="slide five">
            Date Of Geneseis {props.date}
            {/* <img src="http://hdwallpaperfun.com/wp-content/uploads/2014/08/Outer-Space-Wallpaper-Background-HQ.jpg" /> */}
          </div>
          <div className="slide six">
            All Time High ₹{props.ath}/-
            {/* <img src="https://images.unsplash.com/photo-1479409286066-c0b2f4f4a332" /> */}
          </div>
          <div className="slide seven">
            All Time Low ₹{props.atl}/-
            {/* <img src="http://cdn.wonderfulengineering.com/wp-content/uploads/2014/04/space-wallpaper-4.jpg" /> */}
          </div>
          <div className="slide eight">
            Twitter Follower {props.twitter}
            {/* <img src="http://shareyourwallpapers.com/upload/wallpaper/3d-and-digital-art/3d-space/3d-space_f48db6ca.jpg" /> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default THREEDCarousal