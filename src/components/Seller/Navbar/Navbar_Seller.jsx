import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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

export default function SellerNavbar() {
  const [topRightModal, setTopRightModal] = useState(false);

  const toggleShow = () => setTopRightModal(!topRightModal);

  const navigate = useNavigate();

  {
    /* Go to order history page */
  }
  const viewOrderPage = () => {
    navigate("/order-history-page");
  };

  {
    /* Go to seller dashboard */
  }
  const sellerDashboard = () => {
    navigate("/seller-dashboard");
  };


  {
    /* Go to buyer dashboard */
  }
  const buyerDashboard = () => {
    navigate("/buyer-dashboard");
  };

  return (
    <MDBNavbar expand="lg" light bgColor="light">
      <MDBContainer fluid className="ms-5 me-5">
        {/* Logo */}
        <button className="image-button" onClick={sellerDashboard}>
          <img
            style={{ width: 100, height: 60 }}
            src={logo}
            alt="utm online shop"
          />
        </button>

        

        <MDBNavbarNav>
        <MDBNavbarItem className="collapse navbar-collapse justify-content-stat ms-3">
            <MDBNavbarLink href="#">
            <h3>Selle Dashboard</h3>
            </MDBNavbarLink>
          </MDBNavbarItem>


          {/* New Oade */}
          <MDBNavbarItem className="collapse navbar-collapse justify-content-end me-3">
            <MDBNavbarLink href="#">
            <MDBBtn className="btn-success " onClick={sellerDashboard}>New Oders</MDBBtn>
            </MDBNavbarLink>
          </MDBNavbarItem>
        </MDBNavbarNav>

        <MDBBtn className="me-4 btn-warning " onClick={viewOrderPage}>History of Selling</MDBBtn>


        
        <MDBBtn onClick={buyerDashboard}>Become a buyer</MDBBtn>

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
                
              </div>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn outline color="info" onClick={toggleShow}>
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
