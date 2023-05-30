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

export default function App() {
  const [user, loading, error] = useAuthState(auth);
  const { role, setRoleValue } = useContext(Context);
  const navigate = useNavigate();
  useEffect(() => {
     if (role === "Seller") {
      <Navigate to="/seller-dashboard" replace />;
    } else {
      <Navigate to="/seller-dashboard" replace />;
    }
  }, [role]);

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
        <Route
          path="/"
          element={
            user && user.emailVerified ? (
              role === "Seller" ? (
                <SellerDashboard />
              ) : (
                <Dashboard />
              )
            ) : (
              <SignInSignUpPage />
            )
          }
        />

        <Route
          path="/buyer-dashboard"
          element={user ? <Dashboard user={user} /> : <Navigate to="/" />}
        />
        <Route
          path="/seller-dashboard"
          element={user ? <SellerDashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/order-history-page"
          element={user ? <OrderHistory /> : <Navigate to="/" />}
        />
        <Route
          path="/own-products"
          element={user ? <OwnProducts /> : <Navigate to="/" />}
        />
        <Route
          path="/product-history"
          element={user ? <ProductHistory /> : <Navigate to="/" />}
        />
        <Route
          path="/new-orders"
          element={user ? <NewOrders /> : <Navigate to="/" />}
        />
        <Route
          path="/product-cart"
          element={user ? <ProductCart /> : <Navigate to="/" />}
        />
        <Route
          path="/add-product"
          element={user ? <AddNewProduct /> : <Navigate to="/" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}
