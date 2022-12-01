import { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import UserProfile from "./components/Dashboard/manage-users/UserProfile";
import Users from "./pages/dashboard/manage-users/Users";
import Home from "./pages/home";
import Navbar from "./pages/Navbar";
import Stock from "./pages/stocks/Stock";
import CheckAuth from "./components/authentication/CheckAuth";
import RequireAuth from "./components/authentication/RequireAuth";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { useAppSelector, useAppDispatch } from './redux/hooks/hooks'
import OwnerProfile from "./pages/owner-profile/OwnerProfile"
import ProductCreation from "./pages/dashboard/manage-product-creation"
import ManageBrands from "./pages/dashboard/manage-brands/ManageBrands";
import ManageProducts from "./pages/dashboard/mange-products/ManageProducts";
import ManageCategories from "./pages/dashboard/manage-categories/ManageCategories";
import ManageSuppliers from "./pages/dashboard/mange-suppliers/ManageSuppliers";
import Cart from "./components/cart/Cart";
import ManageStock from "./pages/dashboard/manage-stock/ManageStock";
import CheckOut from "./pages/checkout/CheckOut";
import ManageOrders from "./pages/dashboard/manage-orders/ManageOrders";
import OwnerOrders from "./pages/owner-orders/OwnerOrders";
import OwnerBatches from "./pages/owner-batches/OwnerBatches";
import OwnerIndividualBatchDetails from "./pages/owner-batches/OwnerIndividualBatchDetails";
import IndividualBatchDetails from "./pages/dashboard/manage-Batches/batch-details/IndividualBatchDetails";
import CreateBatchForm from "./pages/dashboard/manage-Batches/create-batch-form/CreateBatchForm";
import DashboardHome from "./pages/dashboard/dashboard-home/DashboardHome";
import StockSummary from "./pages/stocks/stock-summary/StockSummary";
import MedicinesStock from "./pages/stocks/medicine-stock/MedicinesStock";
import BroilerFeedStock from "./pages/stocks/broiler-feed/BroilerFeedStock";
import LayerFeedStock from "./pages/stocks/layer-feed/LayerFeedStock";
import Footer from "./pages/Footer/Footer";

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

      // reload cart data
      if (localStorage.getItem('cart')) {
        dispatch({ type: 'reloadCart', payload: JSON.parse(localStorage.getItem('cart') || '') });
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
      <Cart />

      <Routes>
        <Route path="/" element={<RequireAuth> <Home /> </RequireAuth>} />
        <Route path="/dashboard" element={<RequireAuth> <Dashboard /> </RequireAuth>}>
          <Route index element={<DashboardHome />} />
          <Route path="manage-users" element={<Users />} />
          <Route path="manage-orders" element={<ManageOrders />} />
          <Route path="manage-stocks" element={<ManageStock />} />
          <Route path="manage-product-creation" element={<ProductCreation />} />
          <Route path="manage-brands" element={<ManageBrands />} />
          <Route path="manage-products" element={<ManageProducts />} />
          <Route path="manage-categories" element={<ManageCategories />} />
          <Route path="manage-suppliers" element={<ManageSuppliers />} />
        </Route>
        <Route path="/order/checkout" element={<RequireAuth><CheckOut /></RequireAuth>} />
        <Route path="/user/:id" element={<UserProfile />} />
        <Route path="/create-batch-form/:id" element={<CreateBatchForm />} />
        <Route path="/individual-batch-details/:batchDetail" element={<IndividualBatchDetails />} />
        <Route path="/stocks" element={<Stock />}>
          <Route index element={<StockSummary />} />
          <Route path="medicine-stock" element={<MedicinesStock />} />
          <Route path="broiler-feed-stock" element={<BroilerFeedStock />} />
          <Route path="layer-feed-stock" element={<LayerFeedStock />} />
        </Route>
        <Route path="/owner-profile" element={<RequireAuth><OwnerProfile /></RequireAuth>} />
        <Route path="/owner-batches" element={<RequireAuth><OwnerBatches /></RequireAuth>} />
        <Route path="/owner-batches/:batchDetail" element={<OwnerIndividualBatchDetails />} />
        <Route path="/owner-orders" element={<RequireAuth><OwnerOrders /></RequireAuth>} />
        <Route path="/login" element={<CheckAuth><Login /></CheckAuth>} />
        <Route path="/register" element={<CheckAuth><Register /></CheckAuth>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
