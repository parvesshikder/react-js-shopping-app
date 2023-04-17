import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {  signOut } from "firebase/auth";
import {auth} from "../../../firebase"
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

  const toggleShow = () => setTopRightModal(!topRightModal);

  const navigate = useNavigate();

  const viewOrderPage = () => {
    navigate("/order-history-page");
  };

  const buyerDashboard = () => {
    navigate("/buyer-dashboard");
  };

  const sellerDashboard = () => {
    navigate("/seller-dashboard");
  };

  const handleLogout = () => {               
    signOut(auth).then(() => {
    // Sign-out successful.
        navigate("/");
        console.log("Signed out successfully")
    }).catch((error) => {
    // An error happened.
    });
}

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
            <MDBNavbarLink href="#">
              <MDBBadge pill color="danger">
                !
              </MDBBadge>
              <span>
                <MDBIcon fas icon="shopping-cart"></MDBIcon>
              </span>
            </MDBNavbarLink>
          </MDBNavbarItem>
        </MDBNavbarNav>
        

        <MDBBtn onClick={sellerDashboard}>Become a Seller</MDBBtn>

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
                <h2 className="mt-3">User Name</h2>
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
