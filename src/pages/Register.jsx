
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Password Match Check
    if (formData.password !== formData.confirmPassword) {
      alert("Password and Confirm Password do not match!");
      return;
    }

    // Password Length Check
    if (formData.password.length < 8) {
      alert("Password must be at least 8 characters!");
      return;
    }

    // Save Registration Status
    localStorage.setItem("registrationCompleted", "true");

    // Registration Success Popup
    alert(
      "Registration Successful! Welcome to CHAMUNDA DIGITAL."
    );

    // Go to Home Page
    navigate("/", { replace: true });
  };

  return (
    <div className="container py-5">
      <div
        className="card mx-auto p-4"
        style={{
          maxWidth: "500px",
          backgroundColor: "#111",
          color: "#fff",
          border: "1px solid #c9a44c",
          borderRadius: "12px",
        }}
      >
        <h2
          className="text-center mb-2"
          style={{ color: "#c9a44c" }}
        >
          Create Account
        </h2>

        <p className="text-center text-secondary mb-4">
          Register to CHAMUNDA DIGITAL
        </p>

        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Mobile Number */}
          <div className="mb-3">
            <label className="form-label">Mobile Number</label>
            <input
              type="tel"
              name="phone"
              className="form-control"
              placeholder="Enter your mobile number"
              value={formData.phone}
              onChange={handleChange}
              pattern="[0-9]{10}"
              maxLength={10}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Create password"
              value={formData.password}
              onChange={handleChange}
              minLength={8}
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              className="form-control"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              minLength={8}
              required
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="btn w-100 fw-bold"
            style={{
              backgroundColor: "#c9a44c",
              color: "#000",
            }}
          >
            REGISTER
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
