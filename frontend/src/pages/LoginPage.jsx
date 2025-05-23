import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try { // Send the data using an HTTP POST request to the backend
      const res = await axios.post('http://localhost:3000/login', {
        ...values,
        rememberMe,
      }, { withCredentials: true }); // allows cookies to be sent and stored in the browser
  
      navigate('/Home');
    } catch (err) {
      const msg = err.response?.data?.message || 'An unexpected error occurred.';
      alert(msg);
    }
  };  
  
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="row justify-content-center border rounded-5 p-3 bg-white shadow box-area" style={{ width: "100%", maxWidth: "500px" }}>
        <div className="col-12">
          <div className="row align-items-center text-center">
            <div className="header-text mb-4">
              <h2>Login</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <input type="email" className="form-control form-control-lg bg-light fs-6" placeholder="Email"
                  onChange={e => setValues({ ...values, email: e.target.value })}
                />
              </div>
              <div className="input-group mb-1">
                <input type="password" className="form-control form-control-lg bg-light fs-6" placeholder="Password"
                  onChange={e => setValues({ ...values, password: e.target.value })}
                />
              </div>
              <div className="input-group mb-5 d-flex justify-content-between">
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="formCheck" checked={rememberMe}
                    onChange={() => 
                      setRememberMe(!rememberMe)
                    }
                  />
                  <label htmlFor="formCheck" className="form-check-label text-secondary">
                    <small>Remember Me</small>
                  </label>
                </div>
                <div className="forgot">
                  <small><a href="#">Forgot Password?</a></small>
                </div>
              </div>
              <div className="input-group mb-3">
                <button type="submit" className="btn btn-lg btn-primary w-100 fs-6">Login</button>
              </div>
            </form>
            <div className="row">
              <small> Don't have an account?{" "} <Link to="/">Sign Up</Link> </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
