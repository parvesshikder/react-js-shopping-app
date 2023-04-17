import { useParams } from "react-router-dom";
import Navbar from "./Navbar/Navbar";

function ProductDetails({ products }) {
  const { productId } = useParams();

  // find the selected product by ID
  const product = products.find((p) => p.id === parseInt(productId));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <Navbar />
      <div className="mx-auto">
        <h3>{product.name}</h3>
        <p>{product.price}</p>
        <img class="img-thumbnail" src={product.image} alt={product.name} />
        <p>{product.description}</p>
        {/* display more product details as needed */}
      </div>
    </>
  );
}

export default ProductDetails;
