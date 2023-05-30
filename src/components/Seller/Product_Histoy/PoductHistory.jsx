import React, { useContext } from "react";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import SellerNavbar from "../Navbar/Navbar_Seller";
import { SellerProductContext } from "../SellerProductContext";

export default function ProductHistory() {
  const [products] = useContext(SellerProductContext);

  // Filter products with status "Sold"
  const soldProducts = products.filter((product) => product.status === "sold");

  return (
    <>
      <SellerNavbar />
      <h3 className="m-5">History of Selling</h3>
      <MDBTable align="middle" className="mt-5">
        <MDBTableHead>
          <tr>
            <th scope="col">Product details</th>
            <th scope="col">Price</th>
            <th scope="col">Status</th>
            
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {soldProducts.map((product) => (
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
                <p className="fw-normal mb-1">{product.status}</p>
              </td>
              
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
    </>
  );
}
