const Footer = () => {
    return (
      <footer className="text-center text-lg-start bg-body-tertiary text-muted mt-5">
        {/* Social Media Section */}
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          {/* Left Side */}
          <div className="me-5 d-none d-lg-block">
            <span>Get connected with us on social networks:</span>
          </div>
  
          {/* Right Side */}
          <div>
            <a href="#" className="me-4 text-reset">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="me-4 text-reset">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="me-4 text-reset">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="me-4 text-reset">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </section>
  
        {/* Links Section */}
        <section>
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              {/* About Us */}
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  <i className="fas fa-leaf me-3"></i> AgriDeals
                </h6>
                <p>
                  Connecting farmers and suppliers for the best agricultural deals. High-quality
                  products at competitive prices.
                </p>
              </div>
  
              {/* Categories */}
              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Categories</h6>
                <p><a href="#" className="text-reset">Grains</a></p>
                <p><a href="#" className="text-reset">Fertilizers</a></p>
                <p><a href="#" className="text-reset">Dairy Products</a></p>
                <p><a href="#" className="text-reset">Machinery</a></p>
              </div>
  
              {/* Useful Links */}
              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Useful Links</h6>
                <p><a href="#" className="text-reset">Deals</a></p>
                <p><a href="#" className="text-reset">Suppliers</a></p>
                <p><a href="#" className="text-reset">Farmers</a></p>
                <p><a href="#" className="text-reset">Help Center</a></p>
              </div>
  
              {/* Contact Information */}
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p><i className="fas fa-map-marker-alt me-3"></i> 123 Green Field, Agriculture City</p>
                <p><i className="fas fa-envelope me-3"></i> support@agrideals.com</p>
                <p><i className="fas fa-phone me-3"></i> +1 234 567 890</p>
                <p><i className="fas fa-print me-3"></i> +1 234 567 891</p>
              </div>
            </div>
          </div>
        </section>
  
        {/* Copyright */}
        <div className="text-center p-4" style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}>
          © {new Date().getFullYear()} AgriDeals. All rights reserved.
        </div>
      </footer>
    );
  };
  
  export default Footer;
  