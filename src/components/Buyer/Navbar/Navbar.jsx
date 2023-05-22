import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";
import Context from "../../signin_signup/Context";
import { CartContext } from "../Cart/CartContext";
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBadge,
} from "mdb-react-ui-kit";

import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";

import logo from "../../../assets/logo.png";
import userAvater from "../../../assets/user.webp";

export default function Navbar() {
  const [topRightModal, setTopRightModal] = useState(false);
  
  const { userData } = useContext(Context);
  const { cartItems } = useContext(CartContext);
  const toggleShow = () => setTopRightModal(!topRightModal);

  const navigate = useNavigate();

  const viewOrderPage = () => {
    navigate("/order-history-page");
  };
 
  const buyerDashboard = () => {
    navigate("/buyer-dashboard");
  };

  const cart = () => {
    navigate("/product-cart");
  };

  const sellerDashboard = () => {
    navigate("/seller-dashboard");
  };

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <MDBNavbar expand="lg" light bgColor="light">
      <MDBContainer fluid className="ms-5 me-5">
        {/* Logo */}
        <button className="image-button" onClick={buyerDashboard}>
          <img
            style={{ width: 100, height: 60 }}
            src={logo}
            alt="utm online shop"
          />
        </button>

        <MDBNavbarNav>
          {/* Shopping Card */}
          <MDBNavbarItem className="collapse navbar-collapse justify-content-end me-3">
            <MDBNavbarLink
              href="#"
              className="d-flex justify-content-end align-items-center"
            >
              <span>
                <MDBBtn onClick={() => cart()}>
                  <MDBIcon fas icon="shopping-cart"></MDBIcon>
                  <MDBBadge pill color="success" className="ms-2">
                    <i>{cartItems.length}</i>
                  </MDBBadge>
                </MDBBtn>
              </span>
            </MDBNavbarLink>
          </MDBNavbarItem>
        </MDBNavbarNav>

        {/* <MDBBtn onClick={sellerDashboard}>Switch to Seller</MDBBtn> */}

        {/* User Profile */}
        <button onClick={toggleShow} className="btn btn-link">
          <img
            style={{ width: 60, height: 60 }}
            className="square rounded-circle border border-3"
            src={userAvater}
            alt="user"
          />
        </button>
      </MDBContainer>

      {/* User Profile button click */}
      <MDBModal
        animationDirection="right"
        show={topRightModal}
        tabIndex="-1"
        setShow={setTopRightModal}
      >
        <MDBModalDialog position="top-right" side>
          <MDBModalContent>
            <MDBModalHeader className=" text-white">
              <MDBBtn
                color="none"
                className="btn-close btn-close-lite"
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div className="text-center col">
                <img
                  style={{ width: 60, height: 60 }}
                  className="square rounded-circle border border-3"
                  src={userAvater}
                  alt="user"
                />
                <h2 className="mt-3">{userData?.name}</h2>
                <p className="mt-3">{userData?.email}</p>
                <p className="mt-3">{userData?.phone}</p>
                <MDBBtn onClick={viewOrderPage}>Order history</MDBBtn>
              </div>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn outline color="info" onClick={handleLogout}>
                Log Out
              </MDBBtn>
              {/* <MDBBtn outline color="info" onClick={toggleShow}>
                Close
              </MDBBtn> */}
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </MDBNavbar>
  );
}
