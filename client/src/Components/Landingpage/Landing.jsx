import React from "react";
import LandingHeader from "./Landingcomponents/Sections/LandingHeader";
import LandingServices from "./Landingcomponents/Sections/LandingServices";
import LandingBlog from "./Landingcomponents/Sections/LandingBlog";
import THREEDCarousal from "../Section/Crypto/THREEDCarousal";
import Loader from "../Loader";

export default function Landing() {
  return (
    <>
    {/* <THREEDCarousal/> */}
    {/* <Loader/> */}
      <LandingHeader />
      <LandingServices />
      <LandingBlog />
    </>
  );
}


