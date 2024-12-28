// import logo from './logo.svg';
import "./App.css";
import { Routes, Route, Router } from "react-router-dom";

import Navbar from "./components/Navbar";
import  Home  from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { useState } from "react";

function App() {
  const[alert,setAlert]=useState(null);

  const showAlert=(message,type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(()=>{
      setAlert(null);
    },1500);
  }

  return (
    <>
      <NoteState>
        <Navbar />
        <Alert  alert={alert}/>
        <div className="container">
          <Routes>
            <Route exact path={"/"} element={<Home showAlert={showAlert} />}></Route>
            <Route exact path={"/about"} element={<About />}></Route>
            <Route exact path={"/login"} element={<Login showAlert={showAlert}/>}></Route>
            <Route exact path={"/signup"} element={<Signup  showAlert={showAlert}/>}></Route>
          </Routes>
        </div>
      </NoteState>
    </>
  );
}
export default App;
