import React, { useState } from 'react'
import './Section.css'
import Stocks from './Stocks/Stocks'
import MutualFunds from './MutualFunds/MutualFunds'
import Crypto from './Crypto/Crypto'
function Section() {

  const [active, setActive] = useState("0");

  const optionsClicked = (e) => {
    setActive(e.target.id);
    console.log(e.target.id);
    document.getElementById(e.target.id).classList.add('active-page')
    if(e.target.id==='0'){
      document.getElementById(e.target.id).classList.add('active-page')
      document.getElementById('1').classList.remove('active-page')
      document.getElementById('2').classList.remove('active-page')
    }
    else if(e.target.id==='1'){
      document.getElementById(e.target.id).classList.add('active-page')
      document.getElementById('0').classList.remove('active-page')
      document.getElementById('2').classList.remove('active-page')
    }

    else{
      document.getElementById(e.target.id).classList.add('active-page')
      document.getElementById('1').classList.remove('active-page')
      document.getElementById('0').classList.remove('active-page')
    }
  }
  return (
    <div className='scontainer'>
      
      <div class="parallax-1"></div>
      <div className='box'>
      <section className='section-container'>
        
        <h2 className='heading'>Want to Invest ?</h2>
        <div className='optionsList'>
          <h3 id="0" className='option active-page' onClick={optionsClicked} >Stocks</h3>
          <h3 id="1" className='option' onClick={optionsClicked}>Mutual Funds</h3>
          <h3 id="2" className='option' onClick={optionsClicked}>Crypto</h3>
        </div>
        
        {(active === "0") &&
          <Stocks />}
        {
          (active==="1")&& <MutualFunds />
        }
        {
          (active==="2")&&<Crypto />
        }
      </section>
      </div>
      
    </div>
  )
}

export default Section
