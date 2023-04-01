import React from "react";
import styled from "styled-components";
// Components
import TestimonialSlider from "../Elements/TestimonialSlider";

export default function Blog() {
  return (
    <Wrapper id="land-blog">
      <div className="whiteBg">
        <div className="land-container">
        </div>
      </div>
      <div className="lightBg" style={{ padding: '50px 0' }}>
        <div className="land-container">
          <HeaderInfo>
            <h1 className="font40 extraBold">About the team</h1>
            <p className="font13">
              This is team 'Debug Entity' contesting for Devbits,2k23 ,came up with a trading platform.
              <br />
              
            </p>
          </HeaderInfo>
          <TestimonialSlider />
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
  padding-top: 20px;
`;
const HeaderInfo = styled.div`
  margin-bottom: 30px;
  @media (max-width: 860px) {
    text-align: center;
  }
`;