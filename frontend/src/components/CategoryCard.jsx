import React from "react";

const CategoryCard = ({ category }) => {
  return (
    <div className="card h-100 border-0 shadow-sm hover-shadow overflow-hidden">
      <div style={{ height: "12rem", overflow: "hidden" }}>
        <img
          src={category.image}
          alt={category.name}
          className="card-img-top h-100 w-100"
          style={{ objectFit: "cover", borderRadius: 0 }}
        />
      </div>
      <div className="card-body">
        <h5 className="card-title">{category.name}</h5>
        <button className="btn btn-primary btn-sm mt-2">
          View Products
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;