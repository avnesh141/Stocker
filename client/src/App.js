import React from "react";
import Login from "./Components/Login_page/Login_page";
import Signup from "./Components/Signup/Signup";
import Section from "./Components/Section/Section";
import Footer from "./Components/Footer/Footer";
import { BrowserRouter as Router, Navigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";

import Landing from "./Components/Landingpage/Landing"
import { Helmet } from "react-helmet";
import StockPage from "./Components/Section/Stocks/StockPage";
import DashBoard from "./Components/DashBoard/DashBoard";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import './App.css'
import News from "./Components/News/News";
import UpdateUser from "./Components/DashBoard/UpdateUser";
import CryptoPage from "./Components/Section/Crypto/CryptoPage";
import Profile from "./Components/DashBoard/Profile";


const App = () => {

  return (
    <>
       
      <Router>
      <Navbar />
        <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Khula:wght@400;600;800&display=swap" rel="stylesheet" />
      </Helmet>
      <ToastContainer />
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/trade" element={<Section />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/news" element={<News />} />
          <Route exact path="/stockpage" element={<StockPage />} />
          <Route exact path="/signup" element={<Signup />} />
          {/* <Route exact path="/mdashboard" element={<MainDashBoard />} /> */}
          <Route exact path="/dashboard" element={<DashBoard/>} />
          {/* <Route exact path="/aboutus" element={<AboutUs />} /> */}
          <Route exact path="/stockpage" element={<StockPage />} />
          {/* <Route exact path="/message" element={<Messages/>}/> */}
          <Route exact path="/profile" element={<Profile/>}/>
          <Route exact path="/:id" element={<StockPage />}/>
          <Route exact path="/cryptoPage/:id" element={<CryptoPage />}/>
          <Route exact path="/updateuser" element={<UpdateUser/>} />
          <Route exact path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;
