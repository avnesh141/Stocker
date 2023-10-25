import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import "./Signup.css";

const UpdateUser = () => {
  const navigate = useNavigate();
  const [cpass, spass] = useState(null);
const user=JSON.parse(localStorage.getItem("user"));

  const [credential, setcredential] = useState({
    name: user.name,
    number: user.number,
    email: user.email,
    password: "",
  });
  const onchangecnf = (e) => {
    let pass = e.target.value;
    spass(pass);
  };
  const onchange = (e) => {
    setcredential({ ...credential, [e.target.name]: e.target.value });
  };

  

const clickhandler= async()=>{
    toast.success("Wait Your Request is processing")
    const response = await fetch(`/api/auth/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authtoken: JSON.stringify(localStorage.getItem("token")),
        },
        body:JSON.stringify(credential)
      });
    const json=await response.json();
    // localStorage.removeItem("user");
    if (json.success) {
      user.name=credential.name;
      user.number=credential.number;
      localStorage.setItem("user",JSON.stringify(user));
        toast.success("Updated in successfully");
       navigate("/profile");
      }
      else
      {
     toast.error(json.error)
     }
}


  return (
    <div id="signupbody">
      <div className="signup-container">
        <form>
          <h2 className="signUpHead">Update details</h2>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={credential.name}
            required
            // placeholder="name"
            onChange={onchange}
          />
          <label htmlFor="number">Phone:</label>
          <input
            type="number"
            id="number"
            name="number"
            value={credential.number}
            required
            // placeholder="7895XXXXXX"
            onChange={onchange}
          />
          <label htmlFor="password">New Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            placeholder="******"
            onChange={onchange}
          />
          <input
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              clickhandler();
            }}
            value="Update"
          />
        </form>
      </div>
    </div>
  );
};
export default UpdateUser;
