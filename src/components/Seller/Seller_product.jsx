import React from "react";
import { Link } from "react-router-dom";

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

function SellerProducts({ products }) {
    if (!products) {
        return <>Error</>;
      } else if (products.length == 0) {
        return (
          <div>
            <div
              className="container d-flex align-items-center"
              style={{ height: "80vh" }}
            >
              <div className="mx-auto text-center">
                <h1>
                  <i class="far fa-frown-open fa-lg"></i>
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
          <MDBCol md="12" lg="4" className="mb-4" key={props.id}>
            <Link to={`/products/${props.id}`}>
              <MDBCard>
                <MDBRipple
                  rippleColor="light"
                  rippleTag="div"
                  className="bg-image rounded hover-zoom"
                >
                  <MDBCardImage src={props.image} fluid className="w-100" />
                </MDBRipple>
                <MDBCardBody>
                  <a href="#!" className="text-reset">
                    <h5 className="card-title mb-3">{props.name}</h5>
                  </a>
                  <a href="#!" className="text-reset">
                    <p>{props.details}</p>
                  </a>
                  <h6 className="mb-3 h4">
                    <MDBBadge color="success" pill>
                      RM{props.price}
                    </MDBBadge>
                  </h6>
                </MDBCardBody>
                <MDBCardFooter>
                  <div className="d-flex justify-content-between align-items-center pb-1 mb-2">
                    <MDBBtn color="warning">Edit</MDBBtn>
                    <MDBBtn color="danger">Delete</MDBBtn>
                  </div>
                </MDBCardFooter>
              </MDBCard>
            </Link>
          </MDBCol>
        ))}
      </MDBRow>
    </MDBContainer>
  );
}

export default SellerProducts;
