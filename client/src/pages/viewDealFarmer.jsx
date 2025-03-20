import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Added useNavigate
import NavBar from "../components/navbar";
import Footer from "../components/footer";

const ViewDealFarmer = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize navigate
  const [deal, setDeals] = useState({});

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/farmer/deal/${id}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("access_token"),
              "Content-Type": "application/json",
            },
          }
        );

        setDeals(response.data.deals);
      } catch (err) {
        console.error(err?.response?.data?.message || err.message);
      }
    };
    fetchDeals();
  }, [id]);

  const handleAccept = async () => {
    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/farmer/accept/${id}`,
        {}, // Added empty object for patch data
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data) {
        alert("Deal accepted");
        navigate('/farmer');
      }
    } catch (err) {
      alert("Accept request failed!!");
      console.error(err?.response?.data?.message || err.message);
    }
  };

  return (
    <>
      <NavBar isFarmer={true} />
      <br />
      <div className="container mt-5">
        <div className="card border-0 p-4">
          <h2 className="text-center fw-bold">{deal.title}</h2>
          <div>
            <span className="badge bg-primary">{deal.category}</span>
          </div>
          <hr />
          <div className="">
            <div className="col-md-8">
              <h5 className="fw-bold">Description</h5>
              <p className="text-muted">{deal.description}</p>
            </div>
            <div className="col-md-4">
              <h5 className="fw-bold">Deal Information</h5>
              <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between">
                  <span>Max Price:</span>{" "}
                  <b>
                    &#8377; {deal.max_price_per_unit} per {deal.unit}
                  </b>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Requested Quantity:</span>{" "}
                  <b>
                    {deal.requested_quantity} {deal.unit}
                  </b>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Quality Grade:</span>{" "}
                  <b>{deal.required_quality_grade || "N/A"}</b>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Location:</span> <b>{deal.location}</b>
                </li>
                <li className="list-group-item d-flex justify-content-between text-danger">
                  <span>Needed By:</span>{" "}
                  {deal.needed_by
                    ? new Date(deal.needed_by).toLocaleDateString()
                    : "N/A"}
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-4 text-center">
            <button
              className="btn btn-outline-primary mx-2"
              onClick={() => alert("Contact Dealer feature coming soon!")}
            >
              📞 Contact Dealer
            </button>
            <button
              className="btn btn-outline-success mx-2"
              disabled={deal.accepted}
              onClick={handleAccept}
            >
              {deal.accepted ? "🤝 Deal Accepted!" : "🤝 Accept Deal"}
            </button>

            <button
              className="btn btn-outline-secondary mx-2"
              onClick={() => navigate(-1)}
            >
              🔙 Back
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ViewDealFarmer;
