import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../components/navbar";
import Footer from "../components/footer";

const ViewDealDealer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [deal, setDeal] = useState({});
  const [acceptedFarmer, setAcceptedFarmer] = useState(null);

  useEffect(() => {
    const fetchDeal = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/dealer/deal/view/${id}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("access_token"),
              "Content-Type": "application/json",
            },
          }
        );

        setDeal(response.data.deals);
        setAcceptedFarmer(response.data.deals.user_accepted[0] || null); // 🔹 Fix applied here
      } catch (err) {
        console.error("Error fetching deal:", err);
      }
    };

    fetchDeal();
  }, [id]);

  return (
    <>
      <NavBar isDealer={true} />
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

          <div>
          {acceptedFarmer ? (
            <>
              <h4 className="fw-bold text-success text-center">Accepted Farmer Details</h4>
              <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between">
                  <span>Name:</span> <b>{acceptedFarmer.name}</b>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Email:</span> <b>{acceptedFarmer.email}</b>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Phone:</span> <b>{acceptedFarmer.mobile || "N/A"}</b>
                </li>
              </ul>
            </>
          ) : (
            <h5 className="text-center text-danger mt-3">No farmer has accepted this deal yet.</h5>
          )}
          </div>

          <div className="mt-4 text-center">
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

export default ViewDealDealer;
