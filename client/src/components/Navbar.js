import React from "react";
import { useContext } from "react";
import { useState } from "react";
import noteContext from "../context/notes/noteContext";
import { Link } from "react-router-dom";
import { useLocation, useHistory } from "react-router-dom";

const Navbar = () => {
  let history = useHistory();
  const handleLogout = () => {
    localStorage.removeItem("token");

    history.push("/login");
  };
  let location = useLocation();
  React.useEffect(() => {
    console.log(location);
  }, [location]);



  //  Area where we write the code to deal with themes.
  const context = useContext(noteContext);
  let themeType = context;

  const [prevTheme, setPrevTheme] = useState("light");

  const adjustTheme = (theme) => {
    document.body.style.color = "black";
    themeType = theme;
    console.log(themeType);
    if (theme === "danger") {
      document.body.style.backgroundColor = "rgb(153 0 0)";
    } else if (theme === "light") {
      document.body.style.backgroundColor = "white";
    } else if (theme === "dark") {
      document.body.style.backgroundColor = "black";
      document.body.style.color = "white";
    } else if (theme === "primary") {
      document.body.style.backgroundColor = "#13315e";
      document.body.style.color = "black";
    } else if (theme == "warning") {
      document.body.style.backgroundColor = "rgb(211 211 92)";
      document.body.style.color = "black";
    } else if (theme == "success") {
      document.body.style.backgroundColor = "#114a11";
      document.body.style.color = "black";
    }

    let size = Array.from(document.getElementsByTagName("input")).length;
    let buttonsCount = Array.from(
      document.getElementsByTagName("button")
    ).length;
    let i = 0;
    //  for(i=0;i<size;i++)
    //  {
    //    Array.from(document.getElementsByTagName("input"))[i].classList.remove(`bg-${prevTheme}`)
    //    Array.from(document.getElementsByTagName("input"))[i].classList.add(`bg-${theme}`)
    //    if(theme==="dark")
    //    {

    //    Array.from(document.getElementsByTagName("button"))[i].classList.add(`text-light`)

    //    }
    //  }
    for (i = 0; i < buttonsCount; i++) {
      let buttonItem = Array.from(document.getElementsByTagName("button"))[i];

      if (!buttonItem.classList.contains("navItem")) {
        buttonItem.classList.remove(`bg-${prevTheme}`);
        buttonItem.classList.add(`bg-${theme}`);
        
        if(prevTheme=="light")
        {
          buttonItem.classList.remove("bg-secondary")
          buttonItem.classList.remove("bg-primary")
        }
            if(theme==="warning")
            {
              buttonItem.classList.remove(`bg-${theme}`);
              buttonItem.style.backgroundColor="  "
            }


            if (theme == "light") {
              buttonItem.classList.remove(`bg-light`);
              buttonItem.classList.add(`bg-primary`);

                  if (buttonItem.classList.contains("dropdown-toggle")) {
                    buttonItem.classList.remove(`bg-{primary}`);
                    buttonItem.classList.add(`bg-secondary`);
                  }
            }


            if (theme === "dark") {
            buttonItem.classList.add( `text-light` );
            }
      }
    }
    setPrevTheme(theme);
  };





  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/login">
          Notekeep
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>
              <div className="dropdown mx-2 " style={{width:"fitContent"}}>
                <button
                  className="btn btn-sm btn-secondary dropdown-toggle "
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  >
                  Themes
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                  style={{width:"fitContent"}}
                  >
                  <div className="row">
                    <button
                      type="button"
                      className="navItem btn-sm my-2 btn btn-primary"
                      onClick={() => adjustTheme("primary")}
                      style={{width:"81%",margin:"auto"}}
                    >
                      Blue
                    </button>
                  </div>

                  <div className="row">
                    <button
                      type="button"
                      className="navItem btn-sm my-2 btn btn-success"
                      onClick={() => adjustTheme("success")}
                      style={{width:"81%",margin:"auto"}}
                    >
                      Green
                    </button>
                  </div>

                  <div className="row">
                    <button
                      type="button"
                      className="navItem btn-sm my-2 btn btn-danger"
                      onClick={() => adjustTheme("danger")}
                      style={{width:"81%",margin:"auto"}}
                    >
                      Red
                    </button>
                  </div>
                  <div className="row">
                    <button
                      type="button"
                      className="navItem btn-sm my-2 btn btn-warning"
                      onClick={() => adjustTheme("warning")}
                      style={{width:"81%",margin:"auto"}}
                    >
                      Yellow
                    </button>
                  </div>

                  <div className="row">
                    <button
                      type="button"
                      className="navItem btn-sm my-2 btn btn-light"
                      onClick={() => adjustTheme("light")}
                      style={{width:"81%",margin:"auto"}}
                    >
                      Light
                    </button>
                  </div>
                  <div className="row">
                    <button
                      type="button"
                      className="navItem btn-sm my-2 btn btn-dark"
                      onClick={() => adjustTheme("dark")}
                      style={{width:"81%",margin:"auto"}}
                    >
                      Dark
                    </button>
                  </div>
                </ul>
              </div>
              {!localStorage.getItem("token") && location !== "/" ? (
            <form form className="d-flex">

              <Link
                className="btn btn-outline-primary mx-1"
                to="/login"
                role="button"
              >
                Login
              </Link>
              <Link
                className="btn btn-outline-primary mx-1"
                to="/signup"
                role="button"
              >
                Sign Up
              </Link>
            </form>
          ) : (
            <button onClick={handleLogout} className="navItem btn-sm btn btn-primary">
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
