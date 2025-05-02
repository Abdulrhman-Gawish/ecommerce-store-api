import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditProductPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });

useEffect(() => {
  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/products/${productId}`, {
        withCredentials: true,
      });
      console.log("Response data:", response.data); // Inspect the full response

      // Destructure from the correct path (response.data.data.product)
      const { name, description, price, stock } = response.data.data.product;
      setFormData({ name, description, price, stock });
    } catch (err) {
      console.error("Error fetching product:", err);
      alert("Failed to fetch product.");
    }
  };

  fetchProduct();
}, [productId]);


  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    await axios.patch(`http://localhost:3000/api/products/${productId}`, formData, {
    withCredentials: true,
    });

      alert("Product updated!");
      navigate(`/product-details/${productId}`);
    } catch (err) {
      alert("Error updating product.");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
      <input name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
      <input name="price" value={formData.price} onChange={handleChange} placeholder="Price" />
      <input name="stock" value={formData.stock} onChange={handleChange} placeholder="Stock" />
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditProductPage;
