import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { getFirestore, doc, updateDoc } from "firebase/firestore";

const Cart = () => {
  const { cartItems, removeItem, totalAmount, clearCart } = useContext(
    CartContext
  );

  const { userData } = useContext(Context);
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState(false); // State to track the address input field error

  const handleRemoveItem = (itemId) => {
    removeItem(itemId);
  };

  const navigate = useNavigate();

  const viewOrderPage = () => {
    navigate("/order-history-page");
  };

  const handlePlaceOrder = async (item) => {
    if (!address) {
      // If address is not provided, show the error message
      setAddressError(true);
      return;
    }

    try {
      const updatedProduct = {
        ...item,
        status: "pending",
        buyerName: userData?.name,
        buyerEmail: userData?.email,
        buyerPhone: userData?.phone,
        buyerAddress: address,
      };
      await updateProductInFirestore(item.id, updatedProduct);

      removeItem(item.id);
      toggleShow();
      viewOrderPage();

      // Additional code for order placement logic goes here
    } catch (error) {
      console.error("Error updating product status:", error);
    }
  };

  // Function to update a product in Firestore
  const updateProductInFirestore = async (productId, updatedProductData) => {
    const firestore = getFirestore();
    const productRef = doc(firestore, "products", productId);

    try {
      await updateDoc(productRef, updatedProductData);
      console.log(`Product ${productId} updated successfully.`);
    } catch (error) {
      console.error(`Error updating product ${productId}:`, error);
    }
  };

  const [topRightModal, setTopRightModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

  const toggleShow = (item) => {
    setSelectedItem(item);
    setTopRightModal(!topRightModal);
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
                    <h6 className="mb-3 h4">
                      <MDBBadge color="success" pill>
                        RM{item.price}
                      </MDBBadge>
                    </h6>
                  </MDBCardBody>
                  <MDBCardFooter>
                    <div className="d-flex justify-content-center align-items-center pb-1 mb-2">
                      <MDBBtn
                        color="danger"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        Remove
                      </MDBBtn>
                      <MDBBtn
                        color="primary"
                        onClick={() => toggleShow(item)}
                        style={{ marginLeft: "0.5rem" }}
                      >
                        Checkout
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
                <p>Name: {userData?.name}</p>
                <p>Email: {userData?.email}</p>
                <p>Phone: {userData?.phone}</p>
                <h1></h1>
                <form>
                  <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input
                      type="text"
                      className={`form-control ${
                        addressError && "is-invalid"
                      }`}
                      id="address"
                      style={{ marginBottom: "1rem" }}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                    {addressError && (
                      <div className="invalid-feedback">Address is required</div>
                    )}
                  </div>
                </form>
              </div>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn
                outline
                color="info"
                style={{ marginRight: "0.5rem" }}
                onClick={() => handlePlaceOrder(selectedItem)}
              >
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
