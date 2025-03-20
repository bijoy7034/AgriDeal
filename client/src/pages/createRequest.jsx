import { useState } from "react";
import NavBar from "../components/navbar";
import Footer from "../components/footer";
import axios from "axios";


const DealRequestForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requested_quantity: "",
    unit: "",
    max_price_per_unit: "",
    category: "",
    required_quality_grade: "",
    needed_by: "",
    location: "",
  });



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const response = await axios.post("http://127.0.0.1:8000/api/dealer/deals", formData, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('access_token')}`,
          "Content-Type": "application/json",
      }
      })
      alert("Request Created")
    }catch(err){
      alert("Request not created!!")
    }
  };

  return (
    <>
      <NavBar />
      <br /><br />
      <div className="container mt-4">
        <div className="row">
          {/* Form Section */}
          <div className="col-md-8">
            <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm">
              <h4 className="fw-bold">Create Deal Request</h4>
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="Enter deal request title"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  placeholder="Enter description..."
                ></textarea>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Requested Quantity</label>
                  <input
                    type="number"
                    className="form-control"
                    name="requested_quantity"
                    value={formData.requested_quantity}
                    onChange={handleChange}
                    required
                    min="1"
                    placeholder="Quantity"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Unit</label>
                  <input
                    type="text"
                    className="form-control"
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                    required
                    placeholder="e.g., kg, ton, liters"
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Max Price Per Unit</label>
                  <input
                    type="number"
                    className="form-control"
                    name="max_price_per_unit"
                    value={formData.max_price_per_unit}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    placeholder="Enter max price per unit"
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Category</label>
                  <input
                    type="text"
                    className="form-control"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="e.g., Grains, Fruits"
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Required Quality Grade</label>
                  <input
                    type="text"
                    className="form-control"
                    name="required_quality_grade"
                    value={formData.required_quality_grade}
                    onChange={handleChange}
                    placeholder="e.g., Premium, Standard"
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Needed By</label>
                  <input
                    type="date"
                    className="form-control"
                    name="needed_by"
                    value={formData.needed_by}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  className="form-control"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  placeholder="Enter location"
                />
              </div>

              <button type="submit" className="btn btn-primary">Submit Request</button>
            </form>
          </div>

          {/* Info Section */}
          <div className="col-md-4">
            <div className="border p-4 rounded shadow-sm bg-light">
              <h5 className="fw-bold">How to Fill This Form?</h5>
              <ul className="list-unstyled">
                <li>📌 <strong>Title:</strong> Give a short name to your request.</li>
                <li>📝 <strong>Description:</strong> Mention any specific details about your needs.</li>
                <li>⚖️ <strong>Requested Quantity:</strong> Enter how much you need in the specified unit.</li>
                <li>💰 <strong>Max Price Per Unit:</strong> Set the highest price you're willing to pay.</li>
                <li>🏷️ <strong>Category:</strong> Mention the type of product (e.g., grains, dairy).</li>
                <li>⭐ <strong>Quality Grade:</strong> If you have a preference, specify it.</li>
                <li>📅 <strong>Needed By:</strong> Pick a deadline for receiving the product.</li>
                <li>📍 <strong>Location:</strong> Enter where the product is needed.</li>
              </ul>
              <p className="text-muted">Ensure accurate details to get the best offers from farmers!</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DealRequestForm;
