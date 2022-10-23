import { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Users from "./components/Dashboard/manage-users/components/Users";
import Home from "./components/home/Home";
import Navbar from "./components/navbar/Navbar";
import Stock from "./components/products/Stock/Stock";
import CheckAuth from "./components/user-authentication/authentication/CheckAuth";
import RequireAuth from "./components/user-authentication/authentication/RequireAuth";
import Login from "./components/user-authentication/Login/Login";
import Register from "./components/user-authentication/Register/Register";
import { useAppSelector, useAppDispatch } from './redux/hooks/hooks'

function App() {
  // redux
  const dispatch = useAppDispatch()

  const { darkMode } = useAppSelector(state => state.globalReducer);
  const { accessToken } = useAppSelector(state => state.authReducer);

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      // dispatch accessToken
      dispatch({ type: 'accessToken', payload: JSON.parse(localStorage.getItem('accessToken') || '') });
      // dispatch user information
      if (localStorage.getItem('userInfo')) {
        dispatch({ type: 'setUserInfo', payload: JSON.parse(localStorage.getItem('userInfo') || '') });
        dispatch({ type: 'loginUser' });
      }
      // dispatch user role type access
      if (localStorage.getItem('role')) {
        if (JSON.parse(localStorage.getItem('role') as string) === 'admin') {
          dispatch({ type: 'accessAdmin' });
        } else if (JSON.parse(localStorage.getItem('role') as string) === 'manager') {
          dispatch({ type: 'accessManager' });
        } else if (JSON.parse(localStorage.getItem('role') as string) === 'user') {
          dispatch({ type: 'accessUser' });
        }
      }

      // dispatch darkMode setting
      if (localStorage.getItem('darkMode')) {
        dispatch({ type: 'setDarkMode', payload: JSON.parse(localStorage.getItem('darkMode') || '') });
      }
    }
    console.log(accessToken);

  }, [])
  return (
    <div className={`${darkMode && 'dark'}`}>
      <Navbar />
      <Routes>
        <Route path="/" element={<RequireAuth> <Home /> </RequireAuth>} />
        <Route path="/dashboard" element={<RequireAuth> <Dashboard /> </RequireAuth>}>
          <Route index element={<Users />} />
        </Route>
        <Route path="/stocks" element={<RequireAuth><Stock /></RequireAuth>} />
        <Route path="/users" element={<Users />} />
        <Route path="/login" element={<CheckAuth><Login /></CheckAuth>} />
        <Route path="/register" element={<CheckAuth><Register /></CheckAuth>} />
      </Routes>
    </div>
  );
}

export default App;
