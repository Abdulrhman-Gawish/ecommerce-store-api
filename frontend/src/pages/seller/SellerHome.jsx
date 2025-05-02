import React, { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
//import './/styles/SellerHome.css'; // Import the CSS for this component


function SellerHome() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
  });

  // Handle input changes for product fields
  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  // Handle product form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/products", // 👈 your backend URL
        product,
        {
          withCredentials: true, // 👈 Send cookies with request
        }
      );
      alert("Product added successfully");
      setProduct({ name: "", description: "", price: "", stock: "", category: "" }); // Reset form fields
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product");
    }
  };

  return (
    <div className="home-page">
      <h1>Welcome, Seller</h1>
      <nav>
        <ul>
          <li>
            <Link to="/product-analytics">View Analytics</Link>
          </li>
        </ul>
      </nav>

      {/* Add Product Form */}
      <div className="add-product">
        <h2>Add Product</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Description:
            <input
              type="text"
              name="description"
              value={product.description}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Price:
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Stock:
            <input
              type="number"
              name="stock"
              value={product.stock}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Category:
            <input
              type="text"
              name="category"
              value={product.category}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Add Product</button>
        </form>
      </div>
    </div>
  );
}

export default SellerHome;
