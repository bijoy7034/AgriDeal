import AboutForDealers from "../components/about";
import DealRequestForm from "./createRequest";
import Footer from "../components/footer";
import NavBar from "../components/navbar";
import RecentRequests from "../components/sectionDealer";
import { useEffect, useState } from "react";
import axios from "axios";

const Dealer = () => {
    const [deals, setDeals] = useState([])

    useEffect(()=>{
        const getDeals = async()=>{
            try{
                const response = await axios.get('http://127.0.0.1:8000/api/mydeals', {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('access_token')}`,
                        "Content-Type": "application/json",
                    }
                })
                setDeals(response.data.deals)
            }catch(err){
                console.log(err)
            }
        }
        getDeals()
    },[])

  return (
    <div className="dealer">
      <NavBar isFarmer={false} />
      <div className="row m-5">
        <div className="col-md-8">
          <RecentRequests requests={deals}/>
        </div>
        <div className="col-md-4">
          <AboutForDealers />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dealer;
