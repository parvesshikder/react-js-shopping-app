import React, { useContext, useState, useEffect } from "react";
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
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter,
  MDBModalDialog,
  MDBModalContent,
} from "mdb-react-ui-kit";
import Context from "../../signin_signup/Context";

const Cart = () => {
  const { cartItems, removeItem, totalAmount } = useContext(CartContext);

  const { userData } = useContext(Context);

  const handleRemoveItem = (itemId) => {
    removeItem(itemId);
  };

  const [topRightModal, setTopRightModal] = useState(false);
  const [userDetails, setUserDetails] = useState({});

  const toggleShow = () => setTopRightModal(!topRightModal);
  

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
        {cartItems.length > 0 && (
          <div className="text-center mt-4">
            <MDBBtn color="primary" onClick={toggleShow}>
              Checkout
            </MDBBtn>

            <br />
            <br />
          </div>
        )}
      </MDBContainer>

      <MDBModal
        animationDirection="right"
        show={topRightModal}
        tabIndex="-1"
        setShow={setTopRightModal}
      >
        <MDBModalDialog position="top-right" side>
          <MDBModalContent>
            <MDBModalHeader className="bg-primary text-white">
              <h3 className="text-center mx-auto">Checkout</h3>
            </MDBModalHeader>

            <MDBModalBody>
              <div className="text-start col">
                <p>Name: {userData.name}</p>
                <p>Email: {userData.email}</p>
                <p>Phone: {userData.phone}</p>
                <form>
                  <div className="form-group">
                    <label htmlFor="phoneNumber">
                      Additional Contact Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="phoneNumber"
                      style={{ marginBottom: "1rem" }}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      style={{ marginBottom: "1rem" }}
                    />
                  </div>
                </form>
              </div>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn outline color="info" style={{ marginRight: "0.5rem" }}>
                Place Order
              </MDBBtn>
              <MDBBtn outline color="info" onClick={toggleShow}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
};

export default Cart;
