import React, { useContext,useState } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "./ProductContext";
import Navbar from "./Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";



import {
  MDBIcon,
} from "mdb-react-ui-kit";
import { CartContext } from "./Cart/CartContext";

function ProductDetails() {
  const { productId } = useParams();
  const products = useContext(ProductContext);
  const { addItem, cartItems, removeItem, totalAmount } =
    useContext(CartContext);

    const navigate = useNavigate();
  const viewCartPage = () => {
    navigate("/product-cart");
  };

  // Find the product with the matching ID
  const product = products.find((product) => product.id === productId);


  // Find the three products with similar categories
  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== productId && p.status === 'unsold').slice(0, 3);


  if (!product) {
    return <div>Loading...</div>; // or display an error message
  }

  return (
    <>
      <Navbar />

      <div className="row justify-content-center mb-3 mt-5">
        <div className="col-md-12 col-xl-10">
          <div className="card shadow-0 border rounded-3">
            <div className="card-body">
              <div className="row">
                <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                  <div className="bg-image hover-zoom ripple rounded ripple-surface">
                    <img
                      src={product.image}
                      className="w-100"
                      alt="Product"
                    />
                    <a href="#!">
                      <div className="hover-overlay">
                        <div className="mask" style={{ backgroundColor: "rgba(253, 253, 253, 0.15)" }}></div>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="col-md-6 col-lg-6 col-xl-6">
                  <h5>{product.name}</h5>
                  
                  <div className="mt-1 mb-0 text-muted small">
                    <span>{product.sellerName}</span>
                    <span className="text-primary"> • </span>
                    <span>{product.userEmail}</span>
                    
                  </div>
                  <div className="mb-2 text-muted small">
                    <span>{product.sellerAddress}</span>
                    <span className="text-primary"> • </span>
                    <span>{product.sellerPhone}</span>
                    
                  </div>
                  <p className="text-truncate mb-4 mb-md-0">
                    {product.description}
                  </p>
                </div>
                <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                  <div className="d-flex flex-row align-items-center mb-1">
                    <h4 className="mb-1 me-1">RM{product.price}</h4>
                    
                  </div>
                  <h6 className="text-success">{product.status}</h6>
                  <div className="d-flex flex-column mt-4">
                  
                    <button className="btn btn-primary btn-sm" type="button" onClick={() => {
                        addItem({ ...product });
                        viewCartPage();
                      }}>Buy Now</button>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

       {/* Display related products */}
       <div className="row justify-content-center mb-3 mt-5">
        <div className="col-md-12 col-xl-10">
          <h4 className="mb-4">Similar Products</h4>
          <div className="row">
            {relatedProducts.map((relatedProduct) => (
              <div className="col-md-4 mb-4" key={relatedProduct.id}>
                <div className="card shadow-sm border rounded-3 h-100">
                  <div className="bg-image hover-zoom ripple rounded ripple-surface">
                    <Link to={`/products/${relatedProduct.id}`}>
                      <img src={relatedProduct.image} className="w-100" alt={relatedProduct.name} />
                      <div className="hover-overlay">
                        <div className="mask" style={{ backgroundColor: "rgba(253, 253, 253, 0.15)" }}></div>
                      </div>
                    </Link>
                  </div>
                  <div className="card-body">
                    <h6 className="card-title mb-3">{relatedProduct.name}</h6>
                    <div className="d-flex flex-row align-items-center mb-1">
                      <h6 className="mb-0 me-1">RM{relatedProduct.price}</h6>
                    </div>
                    <button className="btn btn-primary btn-sm" type="button" onClick={() => {
                        addItem({ ...relatedProduct });
                        viewCartPage();
                      }}>Buy Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
