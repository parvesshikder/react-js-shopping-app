import React, { useState, useContext } from "react";
import {
  MDBIcon,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import { ProductContext } from "../Buyer/ProductContext";
import { AdminContext } from "./AdminContext"; 

export default function Admin() {
  const [iconsActive, setIconsActive] = useState("tab1");
  const products = useContext(ProductContext);
  const userData = useContext(AdminContext);


  const filteredProducts = products.filter(
    (product) => product.status === "sold"
  );

  const filtereduserDataBuyer = userData.filter(
    (user) => user.accountType === "Buyer"
  );

  const filtereduserDataSeller = userData.filter(
    (user) => user.accountType === "Seller"
  );

  const handleIconsClick = (value) => {
    if (value === iconsActive) {
      return;
    }

    setIconsActive(value);
  };

  return (
    <>
      <div className="justify-center m-5">
        <MDBTabs className="mb-3">
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleIconsClick("tab1")}
              active={iconsActive === "tab1"}
            >
              All Sold Items
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleIconsClick("tab2")}
              active={iconsActive === "tab2"}
            >
              Registered Buyer
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleIconsClick("tab3")}
              active={iconsActive === "tab3"}
            >
              Registered Seller
            </MDBTabsLink>
          </MDBTabsItem>
        </MDBTabs>

        <MDBTabsContent>
          <MDBTabsPane show={iconsActive === "tab1"}>
            <MDBTable align="middle" className="mt-5">
              <MDBTableHead>
                <tr>
                  <th scope="col">Product details</th>
                  <th scope="col">Buyer Name & Email</th>
                  <th scope="col">Seller Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Status</th>
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
                          <p className="text-muted mb-0">
                            {product.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="ms-3">
                        <p className="fw-bold mb-1">{product.buyerName}</p>
                        <p className="text-muted mb-0">{product.userEmail}</p>
                      </div>
                    </td>
                    <td>
                      <div className="ms-3">
                        <p className="fw-bold mb-1">{product.sellerName}</p>
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
          </MDBTabsPane>
          <MDBTabsPane show={iconsActive === "tab2"}>
            {filtereduserDataBuyer.length > 0 ? (
              <MDBTable align="middle" className="mt-5">
                
                <MDBTableBody>
                  {filtereduserDataBuyer.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <img
                            src={user.profilePictureURL}
                            alt=""
                            style={{ width: "45px", height: "45px" }}
                            className="rounded-circle"
                          />
                          <div className="ms-3">
                            <p className="fw-bold mb-1">{user.name}</p>
                            <p className="text-muted mb-0">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="ms-3">
                          <p className="fw-bold mb-1">{user.phone}</p>
                        </div>
                      </td>
                    </tr>
                  ))}
                </MDBTableBody>
              </MDBTable>
            ) : (
              <p>No registered buyers</p>
            )}
          </MDBTabsPane>
          <MDBTabsPane show={iconsActive === "tab3"}>
          {filtereduserDataBuyer.length > 0 ? (
              <MDBTable align="middle" className="mt-5">
                
                <MDBTableBody>
                  {filtereduserDataSeller.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <img
                            src={user.profilePictureURL}
                            alt=""
                            style={{ width: "45px", height: "45px" }}
                            className="rounded-circle"
                          />
                          <div className="ms-3">
                            <p className="fw-bold mb-1">{user.name}</p>
                            <p className="text-muted mb-0">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="ms-3">
                          <p className="fw-bold mb-1">{user.phone}</p>
                        </div>
                      </td>
                    </tr>
                  ))}
                </MDBTableBody>
              </MDBTable>
            ) : (
              <p>No registered seller</p>
            )}
          </MDBTabsPane>
        </MDBTabsContent>
      </div>
    </>
  );
}
