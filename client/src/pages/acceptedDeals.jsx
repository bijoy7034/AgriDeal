import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "../components/navbar";
import Footer from "../components/footer";
import './css/style.css'

const AcceptedDeals = () => {
  const [deals, setDeals] = useState([]);
  const [selectedDeal, setSelectedDeal] = useState(null);

  useEffect(() => {
    const fetchAcceptedDeals = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/farmer/deals/accepted",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("access_token"),
              "Content-Type": "application/json",
            },
          }
        );
        setDeals(response.data.deals);
      } catch (err) {
        console.error("Error fetching accepted deals:", err);
      }
    };

    fetchAcceptedDeals();
  }, []);

  return (
    <><NavBar isFarmer={true} /><div className="container mt-4">
        <br />
          <h4 className="fw-bold mt-5">Accepted Deals</h4>
          <div className="list-group">
              {deals.length > 0 ? (
                  deals.map((deal, index) => (
                      <button
                          key={index}
                          className="list-group-item list-group-item-action"
                          onClick={() => setSelectedDeal(deal)}
                      >
                          <div className="d-flex justify-content-between">
                              <h6 className="mb-1 fw-bold">{deal.title}</h6>
                              <small className="text-muted">
                                  {new Date(deal.needed_by).toLocaleDateString()}
                              </small>
                          </div>
                          <p className="mb-1 text-muted">{deal.description}</p>
                          <small>
                              {deal.requested_quantity} {deal.unit} | Max Price: ₹
                              {deal.max_price_per_unit} per {deal.unit}
                          </small>
                      </button>
                  ))
              ) : (
                  <p className="text-muted">No accepted deals available.</p>
              )}
          </div>

          {/* Custom Modal */}
          {selectedDeal && (
              <div className="custom-modal">
                  <div className="custom-modal-content">
                      <span className="close-btn" onClick={() => setSelectedDeal(null)}>
                          &times;
                      </span>
                      <h3>{selectedDeal.title}</h3>
                      <ul className="list-group">
                          <li className="list-group-item">
                              <strong>Description:</strong> {selectedDeal.description}
                          </li>
                          <li className="list-group-item">
                              <strong>Quantity:</strong> {selectedDeal.requested_quantity}{" "}
                              {selectedDeal.unit}
                          </li>
                          <li className="list-group-item">
                              <strong>Max Price:</strong> ₹{selectedDeal.max_price_per_unit}{" "}
                              per {selectedDeal.unit}
                          </li>
                          <li className="list-group-item">
                              <strong>Location:</strong> {selectedDeal.location}
                          </li>
                          <li className="list-group-item text-danger">
                              <strong>Needed By:</strong>{" "}
                              {new Date(selectedDeal.needed_by).toLocaleDateString()}
                          </li>
                      </ul>
                  </div>
              </div>
          )}
      </div>
      <br /><br /><br /><br /><br /><br /><br />
      <Footer/>
      </>
  );
};

export default AcceptedDeals;
