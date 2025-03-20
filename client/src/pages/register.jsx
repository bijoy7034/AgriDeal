import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const Signup = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "farmer",
    mobile: "",
  });

  const [isloading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/auth/create",
        formData
      );
      console.log(response.data);
      setLoading(false)
      navigate('/')
    } catch (err) {
      setLoading(false)
      alert("Account creation failed")
    }
  };

  return (
    <div className="login d-flex justify-content-center m-5">
      {isloading ? (
        <>
          <center>
          <div class="spinner-border" role="status">
            <span class="sr-only text-success"></span>
          </div>
          </center>
        </>
      ) : (
        <form className="mt-3" onSubmit={handleSubmit}>
          <h2 className="text-success text-center">Sign Up</h2>
          <div className="mb-2">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              onChange={handleChange}
              value={formData.name}
              type="text"
              name="name"
              className="form-control"
              id="name"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              onChange={handleChange}
              value={formData.email}
              name="email"
              type="email"
              className="form-control"
              id="email"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="mobile" className="form-label">
              Mobile
            </label>
            <input
              onChange={handleChange}
              value={formData.mobile}
              className="form-control"
              name="mobile"
              type="number"
              id="mobile"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="role" className="form-label">
              Role
            </label>
            <select
              className="form-select"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="farmer">Farmer</option>
              <option value="supplier">Supplier</option>
            </select>
          </div>
          <div className="d-grid my-4">
            <button type="submit" className="btn btn-success btn-block">
              Sign Up
            </button>
            <center className="mt-5">
              Already have an account? <Link to="/">Login</Link>
            </center>
          </div>
        </form>
      )}
    </div>
  );
};

export default Signup;
