import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import noteContext from "../context/notes/noteContext";


const Login = (props) => {
  //  Area where we write the code to deal with themes.
  const context=useContext(noteContext)
  let theme=context
  let setTheme=context
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordClick = () => {
    setShowPassword(!showPassword);
  };
  const [credientials, setCerdientials] = useState({
    password: "",
    email: "",
  });
  let history = useHistory();

  const onChange = (e) => {
    setCerdientials({ ...credientials, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("https://notekeeper-backend.onrender.com/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email: credientials.email,
        password: credientials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      history.push("/");
      alert("Login Successful", "success");
    } else {
      alert("invalid credientials", "Danger");
    }
  };
  return (
    <>
      <h2 className="my-4">Login to access your notes</h2>
      <form onSubmit={handleSubmit}  autoComplete="off">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          
          <input
            onChange={onChange}
            type="email"
            className={`bg-${theme} form-control`}
            name="email"
            id="email"
            value={credientials.email}
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <div className="d-flex">
            <input
              required
              name="password"
              onChange={onChange}
              type={`${showPassword ? "text" : "password"}`}
              minLength={5}
              className={`bg-${theme} form-control Password`}
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
       
        <button
          type="submit"
          className="btn btn-primary"
          disabled={credientials.password.length < 5}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default Login;
