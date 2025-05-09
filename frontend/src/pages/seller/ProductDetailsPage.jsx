import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate , useParams } from "react-router-dom";
import './styles/ProductDetailsPage.css';
const ProductDetailsPage = () => {
  const navigate = useNavigate(); // ✅ This line is needed
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [orderCount, setOrderCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleDeleteProduct = async () => {
  try {
    await axios.delete(`http://localhost:3000/api/products/${product._id}`, {
      withCredentials: true,
    });
    alert("Product deleted successfully!");
    navigate('/product-analytics'); // redirect to product - analytics page
  } catch (error) {
    console.error("Error deleting product:", error);
    alert("Failed to delete product.");
  }
};

const handleEditProduct = () => {
  navigate(`/edit-product/${product._id}`);
};



  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/api/products/${productId}`);
        setProduct(response.data.data.product);
        setOrderCount(response.data.data.orderCount);
      } catch (error) {
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>No product found</p>;

  return (
    <div className="product-details-container">
      <h1>{product.name}</h1>
      <p><strong>Description:</strong> {product.description}</p>
      <p><strong>Price:</strong> ${product.price}</p>
      <p><strong>Stock:</strong> {product.stock}</p>
      <p><strong>Category:</strong> {product.category?.name}</p>
      <p><strong>Status:</strong> {product.status}</p>
      <p><strong>Orders Containing This Product:</strong> {orderCount}</p>
      <div className="images">
        {product.images?.map((img, i) => (
          <img key={i} src={img} alt={`Product ${i}`} width={150} />
        ))}
      </div>
    <button onClick={handleEditProduct}>Edit Product</button>
    <button onClick={handleDeleteProduct}>Delete Product</button>
    <br />
    <aside
        type="button"
        className="back-button"
        onClick={() => navigate(`/product-analytics`)}
      >
        ← Back to Analytics
    </aside>   
    </div>
  );
};

export default ProductDetailsPage;
