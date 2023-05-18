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

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

ReactDOM.render(
  <React.StrictMode>
    <ProductProvider>
      <SellerProductProvider>
        <CartProvider>
          <ContextProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ContextProvider>
        </CartProvider>
      </SellerProductProvider>
    </ProductProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
