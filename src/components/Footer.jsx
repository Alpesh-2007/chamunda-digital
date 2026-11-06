
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="footer-section">

      <div className="container">

        <div className="row g-4">

          <div className="col-lg-4">
            <h3 className="logo">
              CHAMUNDA <span>DIGITAL</span>
            </h3>

            <p>
              Capturing your beautiful moments and
              creating memories that last forever.
            </p>
          </div>

          <div className="col-lg-4">
            <h5>Quick Links</h5>

            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/booking">Booking</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="col-lg-4">
            <h5>Contact Information</h5>

            <p>Phone: +91 9724370748</p>
            <p>Email: aakashdegama857@gmail.com</p>
            <p>Location: Rajkot , Morbi</p>
          </div>

        </div>

        <hr />

        <p className="copyright">
          © {new Date().getFullYear()} CHAMUNDA DIGITAL.
          All Rights Reserved.
        </p>

      </div>
    </footer>
  )
}

export default Footer
