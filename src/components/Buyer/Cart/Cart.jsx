import React, { useContext } from "react";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import { CartContext } from "./CartContext";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBBadge,
  MDBBtn,
  MDBRipple,
  MDBCardFooter,
} from "mdb-react-ui-kit";

const Cart = () => {
  const { cartItems, removeItem, totalAmount } = useContext(CartContext);

  const handleRemoveItem = (itemId) => {
    removeItem(itemId);
  };

  return (
    <div>
      <h3 className="text-center mt-5 mb-5">Shopping Cart</h3>
      <MDBContainer>
        <MDBRow className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 text-center ">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <MDBCol key={item.id}>
                <MDBCard>
                  <Link to={`/products/${item.id}`}>
                    <MDBRipple
                      rippleColor="light"
                      rippleTag="div"
                      className="bg-image rounded hover-zoom"
                    >
                      <MDBCardImage
                        src={item.image}
                        fluid
                        className="w-100"
                        style={{
                          width: "100%",
                          height: "250px",
                          objectFit: "cover",
                        }}
                      />
                    </MDBRipple>
                    <MDBCardBody>
                      <a href="#!" className="text-reset">
                        <h5 className="card-title mb-3">{item.name}</h5>
                      </a>
                      <a href="#!" className="text-reset">
                        <p>{item.description}</p>
                      </a>
                      <h6 className="mb-3 h4">
                        <MDBBadge color="success" pill>
                          RM{item.price}
                        </MDBBadge>
                      </h6>
                    </MDBCardBody>
                  </Link>
                  <MDBCardFooter>
                    <div className="d-flex justify-content-center align-items-center pb-1 mb-2">
                      <MDBBtn
                        color="danger"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        Remove
                      </MDBBtn>
                    </div>
                  </MDBCardFooter>
                </MDBCard>
                
              </MDBCol>
              
            ))
          ) : (
            <p>Your cart is empty</p>
          )}
        </MDBRow>

        
      </MDBContainer>

      
    </div>
  );
};

export default Cart;
