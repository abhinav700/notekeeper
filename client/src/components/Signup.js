import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Signup = (props) => {
  let history = useHistory();
  const [credientials, setCerdientials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = credientials;
    const response = await fetch("https://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body:JSON.stringify({ name, email, password }),
      });
      const json = await response.json();
    console.log(json);

    if (json.success) {

      if (credientials.password !== credientials.cpassword) {
        props.showAlert("Passwords don't match", "danger");
      } 
      
      else {
        
        localStorage.setItem("token", json.authToken);
        history.push("/");
        props.showAlert("Account Created successfuly", "success");
      }
    } 
    
    
    else {
      props.showAlert("Invalid Credientials", "danger");
    }
  };
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  const handlePasswordClick = () => {
    setShowPassword(!showPassword);
  };
  const handleCPasswordClick = () => {
    setShowCPassword(!showCPassword);
  };

  const onChange = (e) => {
    setCerdientials({ ...credientials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            required
            name="name"
            onChange={onChange}
            type="text"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            required
            name="email"
            onChange={onChange}
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <div className="d-flex">
            <input
              required
              name="password"
              onChange={onChange}
              type={`${showPassword ? "text" : "password"}`}
              minLength={5}
              className="form-control Password"
              id="password"
            />
            <i
              onClick={handlePasswordClick}
              className={`fas fa-eye-slash hidePassword my-3 mx-2 ${
                showPassword ? "" : "d-none"
              }`}
            ></i>
            <i
              onClick={handlePasswordClick}
              className={`fas fa-eye showPassword my-3 mx-2 ${
                !showPassword ? "" : "d-none"
              }`}
            ></i>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <div className="d-flex">
            <input
              required
              name="cpassword"
              onChange={onChange}
              type={`${showCPassword ? "text" : "password"}`}
              minLength={5}
              className="form-control cPassword "
              id="cpassword"
            />
            <i
              onClick={handleCPasswordClick}
              className={`fas fa-eye-slash hideCPassword my-3 mx-2 ${
                showCPassword ? "" : "d-none"
              }`}
            ></i>
            <i
              onClick={handleCPasswordClick}
              className={`fas fa-eye showCPassword my-3 mx-2 ${
                !showCPassword ? "" : "d-none"
              }`}
            ></i>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default Signup;
