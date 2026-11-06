
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation
} from 'react-router-dom'

import Register from './pages/Register'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AdminLayout from './components/AdminLayout'

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

function AppContent() {
  const location = useLocation()
  const isAdminPage = location.pathname.startsWith('/admin')

  return (
    <>
      {!isAdminPage && <Navbar />}

      <Routes>

        {/* PUBLIC WEBSITE */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/booking" element={<Booking />} />

        {/* REGISTRATION */}
        <Route path="/register" element={<Register />} />

        {/* ADMIN LOGIN */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ADMIN PANEL */}
        <Route path="/admin" element={<AdminLayout />}>

          <Route
            index
            element={<Navigate to="dashboard" replace />}
          />

          <Route
            path="dashboard"
            element={<AdminDashboard />}
          />

          <Route
            path="bookings"
            element={<Bookings />}
          />

          <Route
            path="gallery"
            element={<AdminGallery />}
          />

        </Route>

        {/* UNKNOWN PAGE */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>

      {!isAdminPage && <Footer />}
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
