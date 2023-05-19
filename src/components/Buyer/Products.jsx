import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Product.css";
import { CartContext } from "./Cart/CartContext";
import { ProductContext } from "./ProductContext";
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

function Products() {
  const [query, setQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const products = useContext(ProductContext); // Move useContext here
  const { addItem, cartItems, removeItem, totalAmount } =
    useContext(CartContext);
  const navigate = useNavigate();
  const viewCartPage = () => {
    navigate("/product-cart");
  };

  if (!products) {
    return <>Error</>;
  }

  const filteredProducts = products.filter(
    (product) =>
      product.status === "unsold" &&
      product.name.toLowerCase().includes(query.toLowerCase())
  );
  const sortedProducts = filteredProducts.sort((a, b) =>
    sortOrder === "asc" ? a.price - b.price : b.price - a.price
  );

  if (products.length === 0) {
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
  } else if (filteredProducts.length === 0) {
    return (
      <div className="text-center">
        <h4 className="mt-4 mb-5">
          <strong>Available Products</strong>
        </h4>

        <div className="col-md-8 mx-auto w-25 mt-4 mb-5">
          <div className="input-group">
            <input
              type="search"
              className="form-control rounded"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="search-addon"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
        <div
          className="container d-flex align-items-center"
          style={{ height: "40vh" }}
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
        <strong>Available Products</strong>
      </h4>

      <div className="col-md-8 mx-auto w-25 mt-4 mb-5">
        <div className="input-group">
          <input
            type="search"
            className="form-control rounded"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="search-addon"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <br />

        <button
          className="btn btn-secondary mb-2"
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        >
          Sort by price {sortOrder === "asc" ? "high to low" : "low to high"}
        </button>
      </div>

      <MDBRow className="ms-5 me-5">
        {filteredProducts.map((product) => {
          const isInCart = cartItems.some((item) => item.id === product.id);

          return (
            <MDBCol key={product.id} sm="6" md="4" lg="3" className="mb-4">
              <MDBCard>
                <Link to={`/products/${product.id}`}>
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
                </Link>
                <MDBCardFooter>
                  <div className="d-flex justify-content-between align-items-center pb-1 mb-2">
                    {!isInCart ? (
                      <MDBBtn
                        color="warning"
                        onClick={() => {
                          addItem({ ...product });
                        }}
                      >
                        Add to Cart
                      </MDBBtn>
                    ) : (
                      <MDBBtn
                        color="danger"
                        onClick={() => {
                          removeItem(product.id);
                        }}
                      >
                        Remove from Cart
                      </MDBBtn>
                    )}

                    <MDBBtn
                      color="primary"
                      onClick={() => {
                        addItem({ ...product });
                        viewCartPage();
                      }}
                    >
                      Buy now
                    </MDBBtn>
                  </div>
                </MDBCardFooter>
              </MDBCard>
            </MDBCol>
          );
        })}
      </MDBRow>
    </MDBContainer>
  );
}

export default Products;
