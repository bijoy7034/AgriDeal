import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/footer';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [filterRole, setFilterRole] = useState('all');
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/");
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/all/users", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
            "Content-Type": "application/json",
          },
        });
        setUsers(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = filterRole === 'all' ? users : users.filter(user => user.role === filterRole);

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
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
      </nav>

      <div className="container mt-5 pt-5">
        <h2>All Users</h2>

        <div className="mb-3">
          <div className='w-50'>
          <label className="form-label">Filter by Role:</label>
          <select className="form-select" value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
            <option value="all">All</option>
            <option value="farmer">Farmer</option>
            <option value="dealer">Dealer</option>
          </select>
          </div>
        </div>

        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <br /><br /><br /><br /><br /><br />

      <Footer/>
    </div>
  );
}