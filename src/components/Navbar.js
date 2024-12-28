import React,{useEffect} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom"
import { removeToken } from "./Notes";




const Navbar = () => {
  const navigate = useNavigate()
  let location=useLocation();
  useEffect(()=>{
    console.log(location.pathname);
  },[location])
  
  const  logoutHandler = () => {
    removeToken()
    navigate('/login')
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">Navbar </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/"?"active":""}`}to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">About</Link>
            </li>
          </ul>
           {!localStorage.getItem('token')?<form className="d-flex">
            <Link className="btn btn-primary mx-2" to='/login'role="button">Login </Link>
            <Link className="btn btn-primary mx-2" to='/signup'role="button">Signup </Link>
          </form>:<button className="btn btn-primary" onClick={logoutHandler}>Logout</button>}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
