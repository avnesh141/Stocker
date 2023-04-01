import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const [cpass, spass] = useState(null);
  const [credential, setcredential] = useState({
    name: "",
    number: "",
    email: "",
    password: "",
  });
  const onchangecnf = (e) => {
    let pass = e.target.value;
    spass(pass);
  };
  const onchange = (e) => {
    setcredential({ ...credential, [e.target.name]: e.target.value });
  };

  const clickhandler = async () => {
    if (credential.number.length < 10) {
      toast.error("Invalid phone Number");
      return;
    }
    if (credential.password !== cpass) {
      toast.error("confirm password not matched");
      return;
    }
    const response = await fetch(`/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credential),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      toast.success("Registered SuccessFully");
      localStorage.setItem("token", json.authtoken);
      console.log(json);
      navigate("/dashboard");
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <div id="signupbody">
      <div className="signup-container">
        <form>
          <h2 className="signUpHead">Sign Up</ h2>
          <label htmlFor="name">Enter your name:</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            onChange={onchange}
          />
          <label htmlFor="number">Phone:</label>
          <input
            type="number"
            id="number"
            name="number"
            required
            onChange={onchange}
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            onChange={onchange}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            onChange={onchange}
          />
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input
            type="password"
            id="confirm-password"
            name="confirmpassword"
            required
            onChange={onchangecnf}
          />
          <input
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              clickhandler();
            }}
            value="SignUp"
          />
        </form>
      </div>
    </div>
  );
};
export default Signup;
