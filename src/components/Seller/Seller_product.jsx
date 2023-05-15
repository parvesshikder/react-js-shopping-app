import React from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../Buyer/ProductContext"; 
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../Buyer/Cart/CardContext"; 


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
import { SellerProductContext } from "./SellerProductContext";

function SellerProducts() {
  const [products] = useContext(SellerProductContext);

  if (!products) {
    return <>Error</>;
  }


  if (products.length === 0) {
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

            <h3>No Products Available</h3>
          </div>
        </div>
      </div>
    );
  } 

  return (
    <MDBContainer fluid className="my-5 text-center">
      <h4 className="mt-4 mb-5">
        <strong>Your Products </strong>
      </h4>

  

      <MDBRow className="ms-5 me-5">
        {products.map((props) => (
          <MDBCol key={props.id} sm="6" md="4" lg="3" className="mb-4">
            <MDBCard>
              <Link to={`/products/${props.id}`}>
                <MDBRipple
                  rippleColor="light"
                  rippleTag="div"
                  className="bg-image rounded hover-zoom"
                >
                  <MDBCardImage
                    src={props.image}
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
                    <h5 className="card-title mb-3">{props.name}</h5>
                  </a>
                  <a href="#!" className="text-reset">
                    <p>{props.description}</p>
                  </a>
                  <h6 className="mb-3 h4">
                    <MDBBadge color="success" pill>
                      RM{props.price}
                    </MDBBadge>
                  </h6>
                </MDBCardBody>
              </Link>
              <MDBCardFooter>
                <div className="d-flex justify-content-between align-items-center pb-1 mb-2">
                  <MDBBtn
                    color="warning"
                    
                  >
                    edit
                  </MDBBtn>
                  <MDBBtn color="primary">Remove</MDBBtn>
                </div>
              </MDBCardFooter>
            </MDBCard>
          </MDBCol>
        ))}
      </MDBRow>
    </MDBContainer>
  );
}

export default SellerProducts;
