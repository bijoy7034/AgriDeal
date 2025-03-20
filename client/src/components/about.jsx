import { useNavigate } from "react-router-dom";

const AboutForDealers = () => {
    const navigate = useNavigate()
    const handleSubmit = ()=>{
        navigate('/dealer/create')
    }
    return (
      <div className="container mt-4">
        <div className="card p-4 shadow-sm">
          <h4 className="fw-bold">Why Join Us as a Dealer?</h4>
          <ul className="list-group list-group-flush mt-2">
            <li className="list-group-item">📌 Post requests for agricultural products easily.</li>
            <li className="list-group-item">🌾 Connect directly with verified farmers.</li>
            <li className="list-group-item">💰 Get competitive pricing from multiple suppliers.</li>
            <li className="list-group-item">🚀 Streamline your procurement process efficiently.</li>
            <li className="list-group-item">📅 Set deadlines and quality requirements as per your needs.</li>
          </ul>
          <div className="mt-3">
            <button className="btn btn-primary btn-sm" onClick={handleSubmit}>Start Posting Requests</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default AboutForDealers;
  