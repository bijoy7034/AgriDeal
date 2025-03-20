import { useNavigate } from "react-router-dom";

const RecentRequests = ({ requests }) => {
  const navigate = useNavigate();

  return (
    <div className="container mt-4">
      <h4 className="fw-bold">Recent Requests</h4>
      <div className="list-group">
        {requests && requests.length > 0 ? (
          requests.map((request, index) => (
            <div
              key={index}
              className="list-group-item list-group-item-action"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/dealer/deal/view/${request._id}`)}
            >
              <div className="d-flex justify-content-between">
                <h6 className="mb-1 fw-bold">{request.title}</h6>
                <small className="text-muted">
                  {new Date(request.needed_by).toLocaleDateString()}
                </small>
              </div>
              <p className="mb-1 text-muted">{request.description}</p>
              <small>
                {request.requested_quantity} {request.unit} | Max Price: ₹
                {request.max_price_per_unit} per {request.unit}
              </small>
            </div>
          ))
        ) : (
          <p className="text-muted">No recent requests available.</p>
        )}
      </div>
    </div>
  );
};

export default RecentRequests;
