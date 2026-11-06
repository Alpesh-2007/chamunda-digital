
import { NavLink, Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container">

        {/* Website Name */}
        <Link className="navbar-brand logo" to="/">
          <span className="brand-name">
            CHAMUNDA <span className="brand-highlight">DIGITAL</span>
          </span>
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler bg-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMenu"
          aria-controls="navbarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links */}
        <div className="collapse navbar-collapse" id="navbarMenu">
          <ul className="navbar-nav ms-auto align-items-lg-center">

            <li className="nav-item">
              <NavLink className="nav-link" to="/" end>
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/services">
                Services
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/gallery">
                Gallery
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">
                Contact
              </NavLink>
            </li>

            <li className="nav-item ms-lg-3">
              <NavLink className="book-btn" to="/booking">
                Book Now
              </NavLink>
            </li>

          </ul>
        </div>

      </div>
    </nav>
  )
}

export default Navbar
