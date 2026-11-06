
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation
} from 'react-router-dom'
import Register from "./pages/Register"

import Navbar from './components/Navbar'
import Footer from './components/Footer'
// import WhatsAppButton from './components/WhatsAppButton'
import AdminLayout from './components/AdminLayout'

// Social Media Icons
import {
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
  FaYoutube,
  FaEnvelope
} from 'react-icons/fa'

import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import Booking from './pages/Booking'

import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import Bookings from './pages/Bookings'
import AdminGallery from './pages/AdminGallery'

import './App.css'

// SOCIAL MEDIA COMPONENT
function SocialMedia() {
  return (
    <div className="social-media">

      <a href="https://www.instagram.com/chamunda_digital_official/"
        target="_blank"
        rel="noopener noreferrer"
        className="social-icon"
        aria-label="Instagram"
        title="Instagram"
      >
        <FaInstagram />
      </a>


      <a
        href="https://wa.me/919724370748?text=Hello%20Chamunda%20Digital"
        target="_blank"
        rel="noopener noreferrer"
        className="social-icon"
        title="WhatsApp"
      >
        <FaWhatsapp />
      </a>

      <a
        href="https://www.youtube.com/@Aakashe9"
        target="_blank"
        rel="noopener noreferrer"
        className="social-icon"
        aria-label="YouTube"
        title="YouTube"
      >
        <FaYoutube />
      </a>

      <a
        href="mailto:alpeshsarvaiya087@gmail.com"
        className="social-icon"
        aria-label="Email"
        title="Gmail"
      >
        <FaEnvelope />
      </a>

    </div>
  )
}

function AppContent() {
  const location = useLocation()
  const isAdminPage = location.pathname.startsWith('/admin')

  return (
    <>
      {!isAdminPage && <Navbar />}

      {/* SOCIAL MEDIA ICONS */}
      {!isAdminPage && <SocialMedia />}

      <Routes>

        {/* PUBLIC WEBSITE */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/booking" element={<Booking />} />

        {/* ADMIN LOGIN */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ADMIN PANEL */}
        <Route path="/admin" element={<AdminLayout />}>

          <Route index element={<Navigate to="dashboard" replace />} />

          <Route path="dashboard" element={<AdminDashboard />} />

          <Route path="bookings" element={<Bookings />} />

          <Route path="gallery" element={<AdminGallery />} />

        </Route>

        {/* UNKNOWN PAGE */}
        <Route path="/register" element={<Register />} />   
        <Route path="*" element={<Navigate to="/" replace />} />
           

      </Routes>

      {!isAdminPage && <Footer />}
      {/* {!isAdminPage && <WhatsAppButton />} */}

    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
