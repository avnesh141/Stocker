import React from "react";
import LandingHeader from "./Landingcomponents/Sections/LandingHeader";
import LandingServices from "./Landingcomponents/Sections/LandingServices";
import LandingBlog from "./Landingcomponents/Sections/LandingBlog";

export default function Landing() {
  return (
    <>
      <LandingHeader />
      <LandingServices />
      <LandingBlog />
    </>
  );
}


