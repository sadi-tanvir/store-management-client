import { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import UserProfile from "./components/Dashboard/manage-users/UserProfile";
import Users from "./pages/dashboard/manage-users/Users";
import Home from "./pages/home";
import Navbar from "./pages/Navbar";
import Stock from "./pages/stocks";
import CheckAuth from "./components/authentication/CheckAuth";
import RequireAuth from "./components/authentication/RequireAuth";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { useAppSelector, useAppDispatch } from './redux/hooks/hooks'
import OwnerProfile from "./pages/owner-profile/OwnerProfile"
import ProductCreation from "./pages/dashboard/manage-product-creation"
import ManageBrands from "./components/Dashboard/manage-brand/ManageBrands";

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
      if (localStorage.getItem('ownerInfo')) {
        dispatch({ type: 'setOwnerInfo', payload: JSON.parse(localStorage.getItem('ownerInfo') || '') });
        dispatch({ type: 'loginUser' });
        dispatch({ type: 'accountStatus', payload: JSON.parse(localStorage.getItem('accountStatus') || '') });
        dispatch({ type: 'userRole', payload: JSON.parse(localStorage.getItem('role') || '') });
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
  }, [])
  return (
    <div className={`${darkMode && 'dark'}`}>
      <Navbar />
      <Routes>
        <Route path="/" element={<RequireAuth> <Home /> </RequireAuth>} />
        <Route path="/dashboard" element={<RequireAuth> <Dashboard /> </RequireAuth>}>
          <Route index element={<Users />} />
          <Route path="manage-product-creation" element={<ProductCreation />} />
          <Route path="manage-brands" element={<ManageBrands />} />
        </Route>
        <Route path="/user/:id" element={<UserProfile />} />
        <Route path="/stocks" element={<RequireAuth><Stock /></RequireAuth>} />
        <Route path="/user-profile" element={<RequireAuth><OwnerProfile /></RequireAuth>} />
        <Route path="/login" element={<CheckAuth><Login /></CheckAuth>} />
        <Route path="/register" element={<CheckAuth><Register /></CheckAuth>} />
      </Routes>
    </div>
  );
}

export default App;
