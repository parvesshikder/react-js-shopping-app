import * as React from "react";
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import App from "./App";
import { ProductProvider } from "./components/Buyer/ProductContext";
import { ContextProvider } from "./components/signin_signup/Context";
import { CartProvider } from "./components/Buyer/Cart/CartContext";
import { SellerProductProvider } from "./components/Seller/SellerProductContext";
import {  MyOrderProvider } from "./components/Buyer/Order_History/MyOrderContext";
import { NewOrderCountProvider } from "./components/Seller/New orders/NewOrderCountContext";
import { AdminProvider } from "./components/Admin/AdminContext"; 

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

ReactDOM.render(
  <React.StrictMode>
    <AdminProvider>
    <ProductProvider>
      <SellerProductProvider>
        <CartProvider>
          <ContextProvider>
            <MyOrderProvider>
              <NewOrderCountProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
            </NewOrderCountProvider>
            </MyOrderProvider>
          </ContextProvider>
        </CartProvider>
      </SellerProductProvider>
    </ProductProvider>
    </AdminProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
