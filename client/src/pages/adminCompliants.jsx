import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/footer";

export default function AdminComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/");
  };

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await axios.get("http://localhost:8000/api/complaints", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setComplaints(response.data);
      } catch (error) {
        setError(error.response?.data?.detail || "Failed to fetch complaints");
      }
    };
    fetchComplaints();
  }, []);

  return (
    <><nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
          <div className="container">
              <Link className="navbar-brand text-success fw-bold" to="/admin">
                  Agri-Deals - Admin
              </Link>
              <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNav"
                  aria-controls="navbarNav"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
              >
                  <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav ms-auto">
                      <li className="nav-item">
                          <Link className="nav-link active" aria-current="page" to="/admin">
                              Home
                          </Link>
                      </li>
                      <li className="nav-item">
                          <Link className="nav-link active" aria-current="page" to="/admin/complaints">
                              Complaints
                          </Link>
                      </li>
                      <li className="nav-item d-flex align-items-center">
                          <button
                              className="btn btn-danger btn-sm mx-3"
                              onClick={handleLogout}
                          >
                              Logout
                          </button>
                      </li>
                  </ul>
              </div>
          </div>
      </nav><div className="container mt-5">
        <br />
              <h4>All Complaints</h4>
              {error && <div className="alert alert-danger">{error}</div>}
              <table className="table table-striped">
                  <thead>
                      <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Subject</th>
                          <th>Description</th>
                      </tr>
                  </thead>
                  <tbody>
                      {complaints.map((complaint, index) => (
                          <tr key={index}>
                              <td>{complaint.name}</td>
                              <td>{complaint.email}</td>
                              <td>{complaint.subject}</td>
                              <td>{complaint.description}</td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
          <br /><br /><br /><br /><br /><br />
          <Footer/>
          </>
  );
}
