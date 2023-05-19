import React, { useContext } from "react";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import Navbar from "../Navbar/Navbar";
import { ProductContext } from "../ProductContext";
import Context from "../../signin_signup/Context";
import { updateDoc, doc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { MyOrderContext } from "./MyOrderContext";

export default function OrderHistory() {
  const products = useContext(ProductContext);
  const myproducts = useContext(MyOrderContext);
  const { userData } = useContext(Context);
  const firestore = getFirestore();

  // Filter products based on status and buyerName
  const filteredProducts = products.filter(
    (product) =>
      product.status === "pending" && product.buyerEmail === userData?.email
  );

  const filteredMyProducts = myproducts.filter(
    (product) =>
      (product.status === "sold" || product.status === "cancelled") &&
      product.buyerEmail === userData?.email
  );

  const cancelOrder = async (productId) => {
    try {
      // Update the status of the product to "cancelled" in Firebase Firestore
      await updateDoc(doc(firestore, "products", productId), {
        status: "unsold",
      });

      // Get the cancelled product details
      const cancelledProduct = products.find(
        (product) => product.id === productId
      );

      // Store the cancelled order in "myorders" collection
      await addDoc(collection(firestore, "myorders"), {
        ...cancelledProduct,
        status: "cancelled",
      });

      // Display a success message or perform any additional actions
      console.log("Order cancelled successfully!");
    } catch (error) {
      console.error("Error cancelling order:", error);
      // Display an error message or handle the error as needed
    }
  };

  const receivedOrder = async (productId) => {
    try {
      // Update the status of the product to "sold" in Firebase Firestore
      await updateDoc(doc(firestore, "products", productId), {
        status: "sold",
      });

      // Get the received product details
      const receivedProduct = products.find(
        (product) => product.id === productId
      );

      // Store the received order in "myorders" collection
      await addDoc(collection(firestore, "myorders"), {
        ...receivedProduct,
        status: "sold",
      });

      // Display a success message or perform any additional actions
      console.log("Order received successfully!");
    } catch (error) {
      console.error("Error receiving order:", error);
      // Display an error message or handle the error as needed
    }
  };

  return (
    <>
      <Navbar />
      <h3 className="m-5">Active Order</h3>
      <MDBTable align="middle" className="mt-5">
        <MDBTableHead>
          <tr>
            <th scope="col">Product details</th>
            <th scope="col">Price</th>
            <th scope="col">Seller Details</th>
            <th scope="col">Action</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td>
                <div className="d-flex align-items-center">
                  <img
                    src={product.image}
                    alt=""
                    style={{ width: "45px", height: "45px" }}
                    className="rounded-circle"
                  />
                  <div className="ms-3">
                    <p className="fw-bold mb-1">{product.name}</p>
                    <p className="text-muted mb-0">{product.description}</p>
                  </div>
                </div>
              </td>
              <td>
                <MDBBadge color="success" pill>
                  RM {product.price}
                </MDBBadge>
              </td>
              <td>
                <p className="fw-normal mb-1">{product.sellerName}</p>
                <p className="fw-normal mb-1">{product.sellerPhone}</p>
                <p className="fw-normal mb-1">{product.sellerAddress}</p>
              </td>
              <td>
                <MDBBtn
                  color="link"
                  rounded
                  size="sm"
                  onClick={() => cancelOrder(product.id)}
                >
                  Cancel
                </MDBBtn>
                <MDBBtn
                  color="link"
                  rounded
                  size="sm"
                  onClick={() => receivedOrder(product.id)}
                >
                  Received
                </MDBBtn>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>

      <br />

      <h3 className="m-5">Order History</h3>
      <MDBTable align="middle" className="mt-5">
        <MDBTableHead>
          <tr>
            <th scope="col">Product details</th>
            <th scope="col">Price</th>
            <th scope="col">Seller Details</th>
            <th scope="col">Status</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {filteredMyProducts.map((product) => (
            <tr key={product.id}>
              <td>
                <div className="d-flex align-items-center">
                  <img
                    src={product.image}
                    alt=""
                    style={{ width: "45px", height: "45px" }}
                    className="rounded-circle"
                  />
                  <div className="ms-3">
                    <p className="fw-bold mb-1">{product.name}</p>
                    <p className="text-muted mb-0">{product.description}</p>
                  </div>
                </div>
              </td>
              <td>
                <MDBBadge color="success" pill>
                  RM {product.price}
                </MDBBadge>
              </td>
              <td>
                <p className="fw-normal mb-1">
                  <p className="fw-normal mb-1">{product.sellerName}</p>
                  <p className="fw-normal mb-1">{product.sellerPhone}</p>
                  <p className="fw-normal mb-1">{product.sellerAddress}</p>
                </p>
              </td>
              <td>
                <MDBBtn color="link" rounded size="sm">
                  {product.status == "sold" ? "Completed" : "Cancelled"}
                </MDBBtn>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
    </>
  );
}
