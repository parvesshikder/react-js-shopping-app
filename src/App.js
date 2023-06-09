import * as React from "react";
import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import SignInSignUpPage from "./components/signin_signup/SignInSignUpPage";
import Dashboard from "./components/Buyer/Dashboard";
import OrderHistory from "./components/Buyer/Order_History/Order_history";
import ProductDetails from "./components/Buyer/Product_details";
import SellerDashboard from "./components/Seller/Seller_Dashboard";
import OwnProducts from "./components/Seller/Seller_product";
import ProductHistory from "./components/Seller/Product_Histoy/PoductHistory";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import CircularProgress from "@mui/material/CircularProgress";
import NewOrders from "./components/Seller/New orders/New_orders";
import Context from "./components/signin_signup/Context";
import { useState, createContext, useContext, useEffect } from "react";
import Cart from "./components/Buyer/Cart/Cart";
import ProductCart from "./components/Buyer/Cart/ProductCard";
import AddProduct from "./components/Seller/Add Product/AddProduct";
import AddNewProduct from "./components/Seller/Add Product/AddNewProduct";
import AdminDashboard from "./components/Admin/Admin_Dashboard";

export default function App() {
  const [user, loading, error] = useAuthState(auth);
  const { role, setRoleValue, emailVerified } = useContext(Context);
  const navigate = useNavigate();

  console.log(emailVerified);


  if (loading) {
    return (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "100vh" }}
      >
        <CircularProgress color="success" />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignInSignUpPage />} />

        <Route path="/buyer-dashboard" element={<Dashboard user={user} />} />
        <Route path="/seller-dashboard" element={<SellerDashboard />} />
        <Route path="/order-history-page" element={<OrderHistory />} />
        <Route path="/own-products" element={<OwnProducts />} />
        <Route path="/product-history" element={<ProductHistory />} />
        <Route path="/new-orders" element={<NewOrders />} />
        <Route path="/product-cart" element={<ProductCart />} />
        <Route path="/add-product" element={<AddNewProduct />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/product-details/:productId" element={<ProductDetails />} />
      </Routes>
    </div>
  );
}
