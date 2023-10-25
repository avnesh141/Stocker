import React from 'react'
import "./Profile.css"
import { Link } from 'react-router-dom';

function Profile() {
  const user=JSON.parse(localStorage.getItem("user"));
  return (
    <div className='mainProfile'>
        <h1>Welcome {user.name}</h1>
        <img src={user.picture}/>
        <div className='profileDetails'>
          <div className='entity-row'>
            <div>Name</div>
            <div>{user.name}</div>
          </div>
          <div className='entity-row'>
            <div>Name</div>
            <div>{user.email}</div>
          </div>
          <div className='entity-row'>
            <div>Phone</div>
            <div>{user.number}</div>
          </div>
          <div className='entity-row'>
            <div>Account Created On</div>
            <div>{user.date}</div>
          </div>
          <div className='entity-row'>
            <div>Amount In Account</div>
            <div>₹ {user.amount}</div>
          </div>
          <div className='entity-row'>
            <div>Account Status </div>
            <div>Active</div>
          </div>
          <div className='entity-row'>
            <div>Sign Up Bonus</div>
            <div>₹ 1000000/-</div>
          </div>
          <div className='entity-row'>
            <div>WithDrawable Amount</div>
            <div>₹ {user.amount-5000>0?user.amount-5000:0}</div>
          </div>
        </div>
        <div className='update-button'>
          <Link to="/updateuser">
         Update Details
          </Link>
        </div>
    </div>
  )
}

export default Profile