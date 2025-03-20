import { Navigate, useNavigate, useParams } from "react-router-dom";

const DealCard = ({ deal }) => {

  const {id }= useParams()
  const navigate = useNavigate()

  const handleView =()=>{
    navigate(`/farmer/deal/view/${deal._id}`)
  }

  return (
    <div className="card border-1 p-2" style={{ width: "23rem", height: "23rem",  borderRadius: "10px" }}>
      <div className="card-body">
        <h5 className="card-title fw-bold">{deal.title.length > 20 ? deal.title.substring(0, 25) + "..." : deal.title}</h5>
        <span className="badge bg-primary mb-2">{deal.category}</span>
        <br />
        <small className="card-text text-muted">{deal.description.substring(0, 65)}...</small>
        <br /><br />

        <ul className="list-unstyled mb-3">
          <li className="d-flex justify-content-between">
            <small>Max Price:</small> <b><span>&#8377;</span> {deal.max_price_per_unit} per {deal.unit}</b>
          </li>
          <li className="d-flex justify-content-between">
            <small>Requested Quantity:</small> <b>{deal.requested_quantity} {deal.unit}</b>
          </li>
          <li className="d-flex justify-content-between">
            <small>Quality Grade:</small> <b>{deal.required_quality_grade || "N/A"}</b>
          </li>
          <li className="d-flex justify-content-between">
            <small>Location:</small> <b>{deal.location}</b>
          </li>
          <li className="text-danger">
            <small>Needed By:</small> {deal.needed_by ? new Date(deal.needed_by).toLocaleDateString() : "N/A"}
          </li>
        </ul>

        <div className="d-flex gap-2">
          <button className="btn btn-success btn-sm" onClick={handleView}>
            View Request
          </button>
          <a href="#" className="btn btn-outline-secondary btn-sm">
            Contact Dealer
          </a>
        </div>
      </div>
    </div>
  );
};

export default DealCard;
