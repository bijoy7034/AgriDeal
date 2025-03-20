import { useEffect, useState } from "react";
import NavBar from "../components/navbar";
import axios from "axios";
import DealCard from "../components/card";
import Footer from "../components/footer";

const Farmer_Dash = () => {
    const [deals, setDeals] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); 
    const [selectedCategory, setSelectedCategory] = useState(""); 
    const [categories, setCategories] = useState([]); 

    useEffect(() => {
        const fetchDeals = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/deals/all", {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                        'Content-Type': 'application/json',
                    }
                });
                setDeals(response.data.deals);
                
                const uniqueCategories = [...new Set(response.data.deals.map(deal => deal.category))];
                setCategories(uniqueCategories);
            } catch (err) {
                console.log(err);
            }
        };
        fetchDeals();
    }, []);

    const filteredDeals = deals.filter(deal => 
        deal.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        (selectedCategory ? deal.category === selectedCategory : true)
    );

    return (
        <div className="farmer">
            <NavBar isFarmer={true} />
            
            <div className="container p-3 mt-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="mt-3">Top Deals for You</h5>

                    <div className="d-flex gap-2">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Search deals..." 
                            value={searchTerm} 
                            onChange={(e) => setSearchTerm(e.target.value)} 
                        />

                        <select 
                            className="form-select" 
                            value={selectedCategory} 
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="">All Categories</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="row">
                    {filteredDeals.length > 0 ? (
                        filteredDeals.map((deal, index) => (
                            <div key={index} className="col-md-4 mb-3">
                                <DealCard deal={deal} />
                            </div>
                        ))
                    ) : (
                       <>
                       <br />
                        <p className="text-center text-muted m-5">No deals found.</p>
                       </>
                    )}
                </div>
            </div>
            <br /><br /><br />

            <Footer />
        </div>
    );
};

export default Farmer_Dash;
