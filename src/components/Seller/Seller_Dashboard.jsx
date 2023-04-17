import SellerNavbar from "./Navbar/Navbar_Seller";
import SellerProducts from "./Seller_product";

export default function SellerDashboard() {
    const products = [
        {
          id: 1,
          name: "Product 1",
          price: 10.99,
          details: "Product Details",
          image:
            "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/belt.webp",
        },
        {
          id: 2,
          name: "Product 2",
          price: 19.99,
          details: "Product Details",
          image:
            "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/belt.webp",
        },
    
        // add more products as needed
      ];
  return (
    <>
      <SellerNavbar />

      <SellerProducts products={products} />
    </>
  );
}
