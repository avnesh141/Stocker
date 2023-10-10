import React, { useEffect, useState } from 'react';
import './Login_page.css';
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import jwtDecode from 'jwt-decode';

const Login_page = () => {

  const navigate = useNavigate();
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
  if(json.success)
  {
    console.log(response);
    setTimeout(() => {
      navigate("/trade");
    }, 1000);
    toast.success("Logged in successfully");
  }
  else
  {
    toast.error(json.error);
  }
}



 const [credential, setcredential] = useState({
   email: "",
   password: "",
 });
 const onchange = (e) => {
   setcredential({ ...credential, [e.target.name]: e.target.value });
 };
    const clickhandler = async () => {
        // console.log("first");
        if(credential.password.length<5)
        {
          toast.error("Invalid password");
          return;
        }
        toast.success("Wait Your Request is processing")
        const response = await fetch(`/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credential),
        });
    // console.log("first");
     const json = await response.json();
    //  console.log(json);
      if (json.success) {
        toast.success("Logged in successfully");
        // console.log(typeof json.authtoken);
     localStorage.setItem("token", json.authtoken);
     navigate("/trade");
      }
      else
   {
     toast.error(json.error)
     }
 };


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
    <div id="loginbody">
      <div className="login-page">
        <div className="form">
          <div className="login">
            <div className="login-header">
              <h3>LOGIN</h3>
              <p>Please enter your credentials to login.</p>
            </div>
          </div>
          <form className="login-form">
            <input type="email" name="email" placeholder="username" onChange={onchange} />
            <input type="password"  name="password" placeholder="password" onChange={onchange} />
            <button onClick={(e) => {
              e.preventDefault();
              clickhandler();
            }} >login</button>
          </form>
            <div  id='signinDiv' >Sign In</div>
            <p className="message">
              Not registered? <Link to="/signup">Create an account</Link>
            </p>
        </div>
      </div>
    </div>
  );
}

export default Login_page