
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import React, {  useState } from "react";
import "./Navbar.css";
const Navbar = () => {

  const [click, sclick] = useState(false);
  const navigate = useNavigate();
  const onclick = () => {
    console.log("clicke");
    localStorage.removeItem("token");
    navigate('/login')
  };
  const [searchResults, setSearchResults] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [active, setActive] = useState(0);
  var comp = [];
  const searchHandle = (e) => {
    sclick(true);
    if(e.target.value === ''){
      setCompanies([]);
    }
    var search = e.target.value;
    // if (userData) {
    //   axios
    //     .get(
    //       `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${search}&apikey=QHQFTL0K4L4CTGWG`
    //     )
    //     .then((res) => {
    //       console.log(res);
    //       emptyArray = res.data.bestMatches;
    //       setSearchResults(res.data.bestMatches);
    //     });
    //    //show autocomplete box

    // } else {
    //   searchWrapper.classList.remove("active"); //hide autocomplete box
    // }
    
    axios
      .get(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${search}&apikey=QHQFTL0K4L4CTGWG`
      )
      .then((res) => {
        console.log(res);
        setSearchResults(res.data.bestMatches);
        if(searchResults.length!==0){
          searchResults.forEach(element => {
            comp.push({name : element['2. name'], symbol : element['1. symbol']})
          });}
           setCompanies(comp);
           comp = []
           if(e.target.length===0){
            document.getElementById('sugg').classList.add('display-none');
            document.getElementById('sugg').classList.remove('display-flex');

            setActive(0);
          }
          else{document.getElementById('sugg').classList.add('display-flex');
          document.getElementById('sugg').classList.remove('display-none');
            setActive(1);
          }
           if(active){
            document.getElementById('sugg').classList.add('active-search');
          }
          else{
            document.getElementById('sugg').classList.remove('active-search');
          }
          console.log(companies)
      });
      
      console.log(searchResults);
      
      // setTimeout(()=>{
      //   if(e.target.value !=='') {
      //     document.getElementById('sugg').removeChild(div);
      //     searchResults.map((data)=>{
      //       var div= document.createElement('div');
      //       div.innerHTML = data.name;
      //       document.getElementById('sugg').appendChild(div);
      //     })
      //   }
      // },500)
    console.log(companies);
    if (!search)
    {
      sclick(false);
      }
  };
  // useEffect(() => {
  //  setTimeout(() => {
  //    sclick(false);
  //  }, 3000);
  // })

  const showStockPage = (e) => {
    console.log('clicked')
    var key = e.target.key;
    localStorage.setItem('selectedCard',key)
    navigate('/stockpage')
  }
  return (
    <div>
      <nav className="nav-pc">
        <div className="logoAndOptions">
          <div id="main_logo_andname">
            <Link to="/">
              <svg
                id="logo-37"
                width="42"
                height="38"
                viewBox="0 0 42 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {" "}
                <path
                  d="M5.74661 28.7259C7.28678 29.8002 9.78389 29.8002 11.3241 28.7259C12.8642 27.6516 12.8642 25.9098 11.3241 24.8355C9.78389 23.7612 7.28678 23.7612 5.74661 24.8355C4.20644 25.9098 4.20644 27.6516 5.74661 28.7259Z"
                  className="ccustom"
                  fill="#25CAAC"
                ></path>{" "}
                <path
                  d="M21.7322 14.1371C24.0425 15.7485 27.7881 15.7485 30.0984 14.1371C32.4086 12.5256 32.4086 9.91298 30.0984 8.30155C27.7881 6.69011 24.0425 6.69011 21.7322 8.30155C19.422 9.91298 19.422 12.5256 21.7322 14.1371Z"
                  className="ccustom"
                  fill="#25CAAC"
                ></path>{" "}
                <path
                  d="M13.2464 21.4315C15.1716 22.7743 18.293 22.7743 20.2182 21.4315C22.1434 20.0886 22.1434 17.9114 20.2182 16.5685C18.293 15.2257 15.1716 15.2257 13.2464 16.5685C11.3212 17.9114 11.3212 20.0886 13.2464 21.4315Z"
                  className="ccustom"
                  fill="#25CAAC"
                ></path>{" "}
                <path
                  d="M0.866345 20.4589C2.02147 21.2646 3.8943 21.2646 5.04943 20.4589C6.20455 19.6532 6.20455 18.3469 5.04943 17.5411C3.8943 16.7354 2.02147 16.7354 0.866345 17.5411C-0.288782 18.3469 -0.288781 19.6532 0.866345 20.4589Z"
                  className="ccustom"
                  fill="#25CAAC"
                ></path>{" "}
                <path
                  d="M13.2464 5.87008C15.1716 7.21294 18.293 7.21294 20.2182 5.87008C22.1434 4.52722 22.1434 2.35001 20.2182 1.00715C18.293 -0.335715 15.1716 -0.335716 13.2464 1.00715C11.3212 2.35001 11.3212 4.52722 13.2464 5.87008Z"
                  className="ccustom"
                  fill="#25CAAC"
                ></path>{" "}
                <path
                  d="M5.74661 13.1645C7.28678 14.2388 9.78389 14.2388 11.3241 13.1645C12.8642 12.0902 12.8642 10.3484 11.3241 9.27415C9.78389 8.19986 7.28678 8.19986 5.74661 9.27415C4.20644 10.3484 4.20645 12.0902 5.74661 13.1645Z"
                  className="ccustom"
                  fill="#25CAAC"
                ></path>{" "}
                <path
                  d="M13.2464 36.9929C15.1716 38.3357 18.293 38.3357 20.2182 36.9929C22.1434 35.65 22.1434 33.4728 20.2182 32.1299C18.293 30.7871 15.1716 30.7871 13.2464 32.1299C11.3212 33.4728 11.3212 35.65 13.2464 36.9929Z"
                  className="ccustom"
                  fill="#25CAAC"
                ></path>{" "}
                <path
                  d="M31.9011 21.9178C34.2114 23.5292 37.9571 23.5292 40.2673 21.9178C42.5776 20.3064 42.5776 17.6937 40.2673 16.0823C37.9571 14.4708 34.2114 14.4708 31.9011 16.0823C29.5909 17.6937 29.5909 20.3064 31.9011 21.9178Z"
                  className="ccustom"
                  fill="#25CAAC"
                ></path>{" "}
                <path
                  d="M21.7322 29.6984C24.0425 31.3099 27.7881 31.3099 30.0984 29.6984C32.4086 28.087 32.4086 25.4744 30.0984 23.8629C27.7881 22.2515 24.0425 22.2515 21.7322 23.8629C19.422 25.4744 19.422 28.087 21.7322 29.6984Z"
                  className="ccustom"
                  fill="#25CAAC"
                ></path>{" "}
              </svg>
            </Link>
            <span id="companyname">Stocker</span>
          </div>
          <div id="nav_list_div">
            <ul id="nav_list">
              <li>
                <Link className="nav_items" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="nav_items" to="/trade">
                  Trade
                </Link>
              </li>
              <li>
                <Link className="nav_items" to="/aboutus">
                  About Us
                </Link>
              </li>
              <li>
                {localStorage.getItem("token") && (
                  <Link className="nav_items" to="/dashboard">
                 DashBoard
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
        <div className="searchAndBtns">
          <div className="searchAndResults">
            <input
              id="searchbox"
              type="text"
              placeholder="Search for stocks..."
              onKeyUp={(e) => searchHandle(e)}
            />
          </div>
          {!localStorage.getItem("token") && (
            <div id="login">
              <Link to="/login">Login</Link>
            </div>
          )}
          {!localStorage.getItem("token") && (
            <div id="signup">
              <Link to="/signup">Signup</Link>
            </div>
          )}
          {localStorage.getItem("token") && (
            <button
              id="logout"
              type="button"
              onClick={onclick}
              className="buttonn"
            >
              Logout
            </button>
            // <div id="logout">
            //   <Link to="/login" onClick={onclick}>
            //     LogOut
            //   </Link>
            // </div>
          )}
        </div>
      </nav>
      {
    click &&
        <div id='sugg' class="autocom-box">
              {
                  companies.length!==0 ?
                  companies.map((company)=>{
                    return <div key={company.symbol} className="stock-name" onClick={(e)=>showStockPage(e)}>{company.symbol}</div>
                  }):<div style={{display:'none'}}>
                  </div>
                
              }
            </div>
                }
    </div>
  );
}

export default Navbar;
{/* <div>{company.symbol}</div> */}