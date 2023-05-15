import React, { useContext } from "react";
import { CartContext } from "./CardContext";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
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
  const { cartitem, removeItem, clearCart } = useContext(CartContext);

  const handleRemoveItem = (itemId) => {
    removeItem(itemId);
  };

  return (
    <div>
      <h3 className="text-center mt-5 mb-5">Shopping Cart</h3>
      <MDBContainer>
        <MDBRow className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 text-center ">
          {cartitem.length > 0 ? (
            cartitem.map((item) => (
              <MDBCol key={item.id}>
                <MDBCard>
                  <Link to={`/products/${item.product.id}`}>
                    <MDBRipple
                      rippleColor="light"
                      rippleTag="div"
                      className="bg-image rounded hover-zoom"
                    >
                      <MDBCardImage
                        src={item.product.image}
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
                        <h5 className="card-title mb-3">{item.product.name}</h5>
                      </a>
                      <a href="#!" className="text-reset">
                        <p>{item.product.description}</p>
                      </a>
                      <h6 className="mb-3 h4">
                        <MDBBadge color="success" pill>
                          RM{item.product.price}
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
