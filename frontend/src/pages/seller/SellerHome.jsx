import React, { useState , useEffect } from 'react';
import axios from 'axios';
import { Link , useNavigate } from "react-router-dom";
import './styles/SellerHome.css';


function SellerHome() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
  });

  // 🔐 Protect route by checking role
  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const response = await axios.get('http://localhost:3000/me', {
          withCredentials: true,
        });
        const { role } = response.data;

        if (role !== 'seller') {
          alert('Access denied. You are not a seller.');
          navigate('/');
        }
      } catch (error) {
        console.error('Error checking user role:', error);
        alert('Something went wrong. Please login again.');
        navigate('/login');
      }
    };

    checkUserRole();
  }, [navigate]);


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
    <div className="container mt-5">
      <h2 className="text-center mb-4">Welcome, Seller</h2>

      <nav className="mb-4">
        <ul className="nav justify-content-center">
          <li className="nav-item">
            <Link className="nav-link" to="/product-analytics">View Analytics</Link>
          </li>
        </ul>
      </nav>

      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow p-4">
            <h4 className="mb-3 text-center">Add Product</h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Product Name</label>
                <input type="text" name="name" className="form-control" value={product.name} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <input type="text" name="description" className="form-control" value={product.description} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Price</label>
                <input type="number" name="price" className="form-control" value={product.price} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Stock</label>
                <input type="number" name="stock" className="form-control" value={product.stock} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Category</label>
                <input type="text" name="category" className="form-control" value={product.category} onChange={handleChange} required />
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-primary">Add Product</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerHome;
