import { useEffect, useState } from "react";
import Footer from "../components/footer";
import NavBar from "../components/navbar";
import axios from "axios";

const FarmerView = () => {
  const [farmers, setFarmers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/farmer/users", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
            "Content-Type": "application/json",
          },
        });
        setFarmers(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <>
      <NavBar isFarmer={true} />
      <br />
      <br />
      <br />
      <div className="container">
        <h4>Connect with Farmers</h4>
        <div className="d-flex overflow-auto">
          {farmers.map((farmer) => (
            <div key={farmer._id} className="card me-3" style={{ minWidth: "250px" }}>
              <div className="card-body">
                <h5 className="card-title">{farmer.name}</h5>
                <p className="card-text">📧 {farmer.email}</p>
                <p className="card-text">📞 {farmer.mobile}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="mt-5">
        <Footer />
      </div>
    </>
  );
};

export default FarmerView;
