import { useState } from "react"
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Navbar from "./components/navbar/Navbar";
import Login from "./components/user-authentication/Login/Login";
import Register from "./components/user-authentication/Register/Register";
import { useAppSelector, useAppDispatch } from './redux/hooks/hooks'


function App() {
  const { dark } = useAppSelector(state => state.globalReducer);
  return (
    <div className={`${dark && 'dark'}`}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
