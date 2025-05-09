import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function SignUpPage() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
    profileImage: null,
  });
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [previewImage, setPreviewImage] = useState(null); // ht5zn el encoded image w ht3rdhaly lma a5tarha wna b3ml signup
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setValues({ ...values, profileImage: file });
    const reader = new FileReader(); //  reads files on the client-side (f el browser to show the selected image)
    reader.onloadend = () => setPreviewImage(reader.result);
    if (file) reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!agreeTerms) {
      alert("You must agree to the terms and conditions.");
      return;
    }

    if (!validatePassword(values.password)) {
      alert(
        "Password must be at least 8 characters long and include an uppercase letter, lowercase letter, number, and special character."
      );
      return;
    }

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("role", values.role);
    formData.append("profileImage", values.profileImage);

    try {
      const res = await axios.post("http://localhost:3000/signup", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      alert(res.data.message);
      const userRole = res.data.user?.role; // get role and return to home page basen on role

      if (userRole === "customer") {
        navigate("/customer/home");
      } else if (userRole === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/home"); 
      }
    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="row justify-content-center border rounded-5 p-3 bg-white shadow box-area"
        style={{ width: "100%", maxWidth: "500px" }}
      >
        <div className="col-12">
          <div className="row align-items-center text-center">
            <div className="header-text mb-4">
              <h2>Signup</h2>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control form-control-lg bg-light fs-6"
                  placeholder="Username"
                  onChange={(e) =>
                    setValues({ ...values, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control form-control-lg bg-light fs-6"
                  placeholder="Email"
                  onChange={(e) =>
                    setValues({ ...values, email: e.target.value })
                  }
                  required
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control form-control-lg bg-light fs-6"
                  placeholder="Password"
                  onChange={(e) =>
                    setValues({ ...values, password: e.target.value })
                  }
                  required
                />
              </div>

              <div className="input-group mb-3">
                <select
                  className="form-select"
                  onChange={(e) =>
                    setValues({ ...values, role: e.target.value })
                  }
                >
                  <option value="customer">Customer</option>
                  <option value="seller">Seller</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="input-group mb-3">
                <input
                  type="file"
                  accept="image/*"
                  className="form-control"
                  onChange={handleImageChange}
                />
              </div>
              {previewImage && (
                <div className="mb-3">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="rounded-circle"
                    width="100"
                    height="100"
                  />
                </div>
              )}

              <div className="input-group mb-3 d-flex justify-content-between">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="formCheck"
                    checked={agreeTerms}
                    onChange={() => setAgreeTerms(!agreeTerms)}
                  />
                  <label
                    htmlFor="formCheck"
                    className="form-check-label text-secondary"
                  >
                    <small>Agree to Terms and Conditions</small>
                  </label>
                </div>
              </div>
              <div className="input-group mb-3">
                <button
                  type="submit"
                  className="btn btn-lg btn-primary w-100 fs-6"
                >
                  SIGN UP
                </button>
              </div>
            </form>

            <div className="row">
              <small>
                Already have an account? <Link to="/login">Login</Link>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
