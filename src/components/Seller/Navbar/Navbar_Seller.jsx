import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";
import Context from "../../signin_signup/Context";
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
import { NewOrderCountContext } from "../New orders/NewOrderCountContext";

export default function SellerNavbar() {
  const [topRightModal, setTopRightModal] = useState(false);
  const { role, setRoleValue } = useContext(Context);
  const toggleShow = () => setTopRightModal(!topRightModal);
  const { userData } = useContext(Context);
  const [newOrderCount] = useContext(NewOrderCountContext);

  const navigate = useNavigate();

  {
    /* Go to new order page */
  }
  const neworders = () => {
    navigate("/new-orders");
  };

  {
    /* Go to order history page */
  }
  const viewProductHistory = () => {
    navigate("/product-history");
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

  {
    /* Go to buyer dashboard */
  }
  const addProduct = () => {
    navigate("/add-product");
  };


  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
      });
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
          <MDBNavbarItem className=" justify-content-stat ms-3">
          <h3>Seller Dashboard</h3>
          </MDBNavbarItem>

          {/* New Oade */}
          <MDBNavbarItem className=" navbar-collapse justify-content-end me-3">
            <MDBNavbarLink href="">
              <MDBBtn className="btn-success " onClick={neworders}>
                New Oders 
                <MDBBadge pill color="warning" className="ms-2">
                    <i>{newOrderCount}</i>
                  </MDBBadge>
              </MDBBtn>
            </MDBNavbarLink>
          </MDBNavbarItem>
        </MDBNavbarNav>

        <MDBBtn className="me-4 btn-warning " onClick={viewProductHistory}>
          History of Selling
        </MDBBtn>

        <MDBBtn className="me-4 btn-success " onClick={addProduct}>
          Add New Product
        </MDBBtn>

        {/* <MDBBtn onClick={buyerDashboard}>Switch to buyer</MDBBtn> */}

        {/* User Profile */}
        <button onClick={toggleShow} className="btn btn-link">
          <img
            style={{ width: 60, height: 60 }}
            className="square rounded-circle border border-3"
            src={userData?.profilePictureURL}
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
                  src={userData?.profilePictureURL}
                  alt="user"
                />
                <h2 className="mt-3">{userData?.name}</h2>
                <p className="mt-3">{userData?.email}</p>
                <p className="mt-3">{userData?.phone}</p>
                <p className="mt-3 fas fa-map-marker-alt"> {" "}{userData?.address}</p>
                <br />
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
