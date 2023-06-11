import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { SellerProductContext } from "./SellerProductContext";

import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import {
  MDBIcon,
  MDBInput,
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
} from "mdb-react-ui-kit";
import firebase from "../../firebase";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function SellerProducts() {
  const [products, setProducts] = useContext(SellerProductContext);
  const firestore = getFirestore();
  const db = collection(firestore, "products");

  function handleRemoveProduct(productId) {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const docRef = doc(db, productId);

      deleteDoc(docRef)
        .then(() => {
          const updatedProducts = products.filter(
            (product) => product.id !== productId
          );
          setProducts(updatedProducts);
          console.log("Product deleted successfully");
        })
        .catch((error) => {
          console.error("Error deleting product:", error);
        });
    }
  }

  const [editingProductId, setEditingProductId] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  function handleEditProduct(productId) {
    setEditingProductId(productId);
    setShowEditForm(true);
  }

  function handleCloseEditForm() {
    setShowEditForm(false);
  }

  //update
  const [updateProducts, setUpdateProducts] = useState(null);

  function handleUpdateProduct(updatedProduct) {
    const docRef = doc(db, updatedProduct.id);

    updateDoc(docRef, updatedProduct)
      .then(() => {
        const updatedProducts = products.map((product) => {
          if (product.id === updatedProduct.id) {
            return updatedProduct;
          }
          return product;
        });
        setProducts(updatedProducts);
        console.log("Product updated successfully");
      })
      .catch((error) => {
        console.error("Error updating product:", error);
        setUpdateProducts("Error updating product. Please try again.");
      });
  }

  if (!products) {
    return <>Error</>;
  }

  const unsoldProducts = products.filter(
    (product) => product.status === "unsold"
  );

  if (unsoldProducts.length === 0) {
    return (
      <div>
        <div
          className="container d-flex align-items-center"
          style={{ height: "80vh" }}
        >
          <div className="mx-auto text-center">
            <h1>
              <i className="far fa-frown-open fa-lg"></i>
            </h1>
            <h3>No Active Listings</h3>
            <p>Add More Product</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <MDBContainer fluid className="my-5 text-center">
      <h4 className="mt-4 mb-5">
        <strong>Your Unsold Products</strong>
      </h4>

      <MDBRow className="ms-5 me-5">
        {unsoldProducts.map((product) => (
          <MDBCol key={product.id} sm="6" md="4" lg="3" className="mb-4">
            <MDBCard>
             
                <MDBRipple
                  rippleColor="light"
                  rippleTag="div"
                  className="bg-image rounded hover-zoom"
                >
                  <MDBCardImage
                    src={product.image}
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
                    <h5 className="card-title mb-3">{product.name}</h5>
                  </a>
                  <a href="#!" className="text-reset">
                    <p>{product.description}</p>
                  </a>
                  <h6 className="mb-3 h4">
                    <MDBBadge color="success" pill>
                      RM{product.price}
                    </MDBBadge>
                  </h6>
                </MDBCardBody>
              
              <MDBCardFooter>
                <div className="d-flex justify-content-between align-items-center pb-1 mb-2">
                  <MDBIcon
                    icon="edit"
                    size="lg"
                    onClick={() => handleEditProduct(product.id)}
                  />

                  <MDBBtn
                    color="primary"
                    onClick={() => handleRemoveProduct(product.id)}
                  >
                    Remove
                  </MDBBtn>
                </div>
              </MDBCardFooter>
            </MDBCard>
          </MDBCol>
        ))}
      </MDBRow>

      {editingProductId && showEditForm && (
        <EditProductPopup
          product={unsoldProducts.find(
            (product) => product.id === editingProductId
          )}
          handleUpdateProduct={handleUpdateProduct}
          handleCloseEditForm={handleCloseEditForm}
          updateProducts={updateProducts} // Pass updateProducts as a prop
          setUpdateProducts={setUpdateProducts} // Pass setUpdateProducts as a prop
        />
      )}
    </MDBContainer>
  );
}

function EditProductPopup({
  product,
  handleUpdateProduct,
  handleCloseEditForm,
  updateProducts, // Add updateProducts as a prop
  setUpdateProducts, // Add setUpdateProducts as a prop
}) {
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateProduct(updatedProduct);
    handleCloseEditForm();
  };

  return (
    <MDBModal show onHide={handleCloseEditForm}>
      <MDBModalBody>
        <MDBContainer>
          <MDBRow>
            <MDBCol md="8" className="mx-auto">
              <form className="add-product-form" onSubmit={handleSubmit}>
                <br />
                <MDBInput
                  label="Product Name"
                  name="name"
                  value={updatedProduct.name}
                  onChange={handleChange}
                  required
                />
                <br />
                <MDBInput
                  label="Product Price"
                  name="price"
                  value={updatedProduct.price}
                  onChange={handleChange}
                  required
                />
                <br />
                <MDBInput
                  type="textarea"
                  label="Product Description"
                  maxLength={6000}
                  style={{
                    height: "100px",
                  }}
                  name="description"
                  value={updatedProduct.description}
                  onChange={handleChange}
                  required
                />
                <br />
                <MDBInput
                  type="textarea"
                  label="Product Category"
                  name="category"
                  value={updatedProduct.category}
                  onChange={handleChange}
                  required
                />
                <br />
                <MDBInput
                  label="Seller Name"
                  name="sellerName"
                  value={updatedProduct.sellerName}
                  onChange={handleChange}
                  required
                />
                <br />
                <MDBInput
                  type="textarea"
                  label="Seller Address"
                  name="sellerAddress"
                  value={updatedProduct.sellerAddress}
                  onChange={handleChange}
                  required
                />
                <br />
                <MDBInput
                  label="Seller Phone"
                  name="sellerPhone"
                  value={updatedProduct.sellerPhone}
                  onChange={handleChange}
                  required
                />
                <br />
                <MDBBtn color="primary" type="submit">
                  Update Product
                </MDBBtn>
                <br />
                <br />{" "}
                <MDBBtn color="secondary" onClick={handleCloseEditForm} block>
                  Cancel
                </MDBBtn>
              </form>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </MDBModalBody>
      {updateProducts !== null && (
        <Snackbar
          open={updateProducts !== null}
          autoHideDuration={6000}
          onClose={() => setUpdateProducts(null)}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MuiAlert onClose={() => setUpdateProducts(null)} severity="error">
            {updateProducts}
          </MuiAlert>
        </Snackbar>
      )}
    </MDBModal>
  );
}

export default SellerProducts;
