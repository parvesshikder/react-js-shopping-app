import React, { useContext, useEffect, useState } from "react";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import SellerNavbar from "../Navbar/Navbar_Seller";
import { SellerProductContext } from "../SellerProductContext";
import { updateDoc, doc, getFirestore } from "firebase/firestore";
import { NewOrderCountContext } from "./NewOrderCountContext";
import { onSnapshot, collection, query, where } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function NewOrders() {
  const [products, setProducts] = useContext(SellerProductContext);
  const [newOrderCount, setNewOrderCount] = useContext(NewOrderCountContext);
  const [userEmail] = useContext(SellerProductContext);
  const firestore = getFirestore();




  const markAsSold = async (productId) => {
    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        return { ...product, status: "sold" };
      }
      return product;
    });

    const productRef = doc(firestore, "products", productId);

    await updateDoc(productRef, { status: "sold" });

    setProducts(updatedProducts);
  };

  const pendingProducts = products.filter(
    (product) => product.status === "pending"
  );
  setNewOrderCount(pendingProducts.length);

  return (
    <>
      <SellerNavbar />
      <h3 className="m-5">New Orders</h3>
      <p>Total New Orders: {newOrderCount}</p>
      <MDBTable align="middle" className="mt-5">
        <MDBTableHead>
          <tr>
            <th scope="col">Product details</th>
            <th scope="col">Price</th>
            <th scope="col">Buyer Name</th>
            <th scope="col">Address & Contact Details</th>
            <th scope="col">Action</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {pendingProducts.map((product) => (
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
                  {product.price}
                </MDBBadge>
              </td>
              <td>
                <p className="fw-normal mb-1">{product.buyerName}</p>
              </td>
              <td>
                <MDBBtn color="link" rounded size="sm">
                  {product.buyerPhone}, {product.buyerAddress}
                </MDBBtn>
              </td>
              <td>
                <MDBBtn
                  color="link"
                  rounded
                  size="sm"
                  onClick={() => markAsSold(product.id)}
                >
                  Mark as Sold
                </MDBBtn>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
    </>
  );
}
