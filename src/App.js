import * as React from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
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

export default function App() {
  const products = [
    {
      id: 1,
      name: "Belt",
      price: 10.99,
      details: "Product Details",
      image:
        "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/belt.webp",
    },
    {
      id: 2,
      name: "Shoes",
      price: 19.99,
      details: "Product Details",
      image:
        "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/belt.webp",
    },

    // add more products as needed
  ];

  const [user, loading, error] = useAuthState(auth);

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
            user ? <Navigate to="/buyer-dashboard" /> : <SignInSignUpPage />
          }
        />
        <Route
          path="/buyer-dashboard"
          element={
            user ? (
              <Dashboard products={products} user={user} />
            ) : (
              <Navigate to="/" />
            )
          }
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
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}
