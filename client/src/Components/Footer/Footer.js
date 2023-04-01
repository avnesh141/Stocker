import React from 'react';
import './Footer.css';
import Facebook from './facebook.png'
import Twitter from './twitter.png'
import Insta from './insta.png'
import Youtube from './youtube.png'
import Linkedin from './linkedin.png'

function App() {
    return (
      <div>
        <footer id="Footer">
          <div className="footer-container">
            <div className="left-col">
              <div className="social-media">
                <a href="https://www.facebook.com/" target="_blank">
                  <img src={Facebook} alt="facebook" />
                </a>
                <a href="https://www.twitter.com/" target="_blank">
                  <img src={Twitter} alt="twitter" />
                </a>
                <a href="https://www.instagram.com/" target="_blank">
                  <img src={Insta} alt="insta" />
                </a>
                <a href="https://www.youtube.com/" target="_blank">
                  <img src={Youtube} alt="youtube" />
                </a>
                <a href="https://www.linkedin.com/" target="_blank">
                  <img src={Linkedin} alt="linkedin" />
                </a>
              </div>
              <p className="rights-text">
                © 2023 Created By Team <b>Debug Entity</b> All Rights Reserved.
              </p>
            </div>
            {/* <div id="map"> */}
            {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14431.981038962364!2d82.9825485!3d25.2707449!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e33ef9b1f7cdd%3A0x7555db6d623dc140!2sIndian%20Institute%20of%20Technology%20(BHU)%20Varanasi!5e0!3m2!1sen!2sin!4v1679940431209!5m2!1sen!2sin" width="40" height="30" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div> */}
            <div className="right-col">
              <h1>Contact Us</h1>
              <div className="border"></div>
              <p className="contactus">9876543210</p>
              <p className="contactus">IIT BHU, VARANASI,221005</p>
              <p className="contactus">E-mail:abc@gmail.com</p>
            </div>
          </div>
        </footer>
      </div>
    );
}

export default App;
