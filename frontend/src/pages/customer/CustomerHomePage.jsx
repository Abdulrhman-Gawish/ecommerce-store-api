import React, { useState, useEffect } from "react";
import axios from "axios";
import CategoryCard from "../../components/CategoryCard";
import "./style/homePage.css";

const CustomerHomePage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:5000/api/category", {
        withCredentials: true,
      });
      console.log("Fetched categories:", response.data);
      if (Array.isArray(response.data)) {
        setCategories(response.data);
      } else if (Array.isArray(response.data.categories)) {
        setCategories(response.data.categories);
      } else {
        setError("Invalid data format from server");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to fetch categories"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="fs-4 fw-semibold">Loading categories...</div>
      </div>
    );
  }

  if (error && categories.length === 0) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center vh-100">
        <div className="text-danger fs-4 mb-4">{error}</div>
        <button onClick={fetchCategories} className="btn btn-primary fw-bold">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h1 className="fs-2 fw-bold mb-4 text-center">Product Categories</h1>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {categories.map((category) => (
          <div className="col" key={category.id}>
            <CategoryCard category={category} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerHomePage;
