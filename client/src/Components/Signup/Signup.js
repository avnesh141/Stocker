import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Signup.css";
import jwtDecode from "jwt-decode";
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
    if (credential.password.length < 5) {
      toast.error("Password too short");
      return;
    }
    if (credential.password !== cpass) {
      toast.error("confirm password not matched");
      return;
    }
    toast.success("Wait Your Request is processing")
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
      navigate("/dashboard");
    } else {
      toast.error(json.error);
    }
  };


    /* global google */
  const handleCredentialResponse= async(cred)=>{
    const decoded=jwtDecode(cred.credential);
    console.log(decoded);
    const token=cred.credential;
     localStorage.setItem("token", token);
     
     const response = await fetch(`/api/auth/signg`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authtoken: JSON.stringify(localStorage.getItem("token")),
      },
    });
    const json=await response.json();
    console.log(response);
     setTimeout(() => {
      navigate("/trade");
     }, 1000);
     if(json.success)
     {
       toast.success("Registered successfully");
      }
      else
      {
        toast.error(json.error);
      }
  }
  

  useEffect(() => {
  
    google.accounts.id.initialize({
      client_id: '157819899931-vvlj8bckmcoicv6g05ljhmlmag87nni2.apps.googleusercontent.com',
      login_uri:"https://localhost:5000/api/auth/signg",
      use_fedcm_for_prompt:true,
      callback: handleCredentialResponse,
    });
    // google.accounts.id.prompt();
     
    google.accounts.id.renderButton(document.getElementById("signinDiv"), {
      theme: 'filled_blue',
      size: 'large',
    });
    
  }, []);

  return (
    <div id="signupbody">
      <div className="signup-container">
        <form>
          <h2 className="signUpHead">Sign Up</h2>
          <label htmlFor="name">Enter your name:</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="name"
            onChange={onchange}
          />
          <label htmlFor="number">Phone:</label>
          <input
            type="number"
            id="number"
            name="number"
            required
            placeholder="7895XXXXXX"
            onChange={onchange}
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="abc@gmail.com"
            required
            onChange={onchange}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            placeholder="******"
            onChange={onchange}
          />
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input
            type="password"
            id="confirm-password"
            name="confirmpassword"
            placeholder="must be same with password"
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
            <div  id='signinDiv' >Sign In</div>
        </form>
      </div>
    </div>
  );
};
export default Signup;
