import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); // 👈 Get the current path

  // Check if the current route is public (signup/login)
  const isPublicRoute = ['/', '/login'].includes(location.pathname);

  useEffect(() => {
    const checkUserRole = async () => {
      if (isPublicRoute) return; // ⛔ Skip if on signup/login

      try {
        const response = await axios.get('http://localhost:3000/me', {
          withCredentials: true,
        });
        const { role } = response.data;
        setUserRole(role);

        if (!role) {
          alert('Unable to determine user role. Please login.');
          navigate('/login');
        }
      } catch (error) {
        console.error('Error checking user role:', error);
        alert('Something went wrong. Please login again.');
        navigate('/login');
      }
    };

    checkUserRole();
  }, [navigate, location.pathname, isPublicRoute]);

const renderNavLinks = () => {
  if (userRole === 'customer') {
    return (
      <li className="nav-item">
        <Link className="nav-link" to="/home">Home</Link>
      </li>
    );
  } else if (userRole === 'seller') {
    return (
      <li className="nav-item">
        <Link className="nav-link" to="/seller-home">Seller Home</Link>
      </li>
    );
  } else if (userRole === 'admin') {
    return (
      <li className="nav-item">
        <Link className="nav-link" to="/admin-home">Admin Home</Link>
      </li>
    );
  } else {
    // Show disabled Home link if no role
    return (
      <li className="nav-item">
        <span className="nav-link disabled" aria-disabled="true" style={{ color: 'gray', cursor: 'not-allowed' }}>
          Home
        </span>
      </li>
    );
  }
};

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">MyApp</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>
            {renderNavLinks()}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
