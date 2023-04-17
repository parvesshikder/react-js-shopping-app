import React from "react";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import Navbar from "../Buyer/Navbar/Navbar";

export default function OrderHistory() {
  return (
    <>
      <Navbar />
      <MDBTable align="middle" className="mt-5">
        <MDBTableHead>
          <tr>
            <th scope="col">Product details</th>
            <th scope="col">Price</th>
            <th scope="col">Seller Name</th>
            <th scope="col">Action</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          <tr>
            <td>
              <div className="d-flex align-items-center">
                <img
                  src="https://img.freepik.com/free-psd/skincare-glass-bottle-mockup-psd-with-box-beauty-product-packaging_53876-115103.jpg"
                  alt=""
                  style={{ width: "45px", height: "45px" }}
                  className="rounded-circle"
                />
                <div className="ms-3">
                  <p className="fw-bold mb-1">Harbar Skin Care</p>
                  <p className="text-muted mb-0">Best Harbal Sincare Producr</p>
                </div>
              </div>
            </td>
            <td>
              <MDBBadge color="success" pill>
                RM150
              </MDBBadge>
            </td>
            <td>
              <p className="fw-normal mb-1">Aiman</p>
              
            </td>
            
            <td>
              <MDBBtn color="link" rounded size="sm">
                Delete
              </MDBBtn>
            </td>
          </tr>
          
        </MDBTableBody>
      </MDBTable>
    </>
  );
}
