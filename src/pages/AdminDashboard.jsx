
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { fetchBookings } from '../redux/bookingSlice'

function AdminDashboard() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Redux Store માંથી Data મેળવવો
  const { bookings, loading, error } = useSelector(
    (state) => state.bookings
  )

  // Page Load થાય ત્યારે Bookings લાવવા
  useEffect(() => {
    dispatch(fetchBookings())
  }, [dispatch])

  const totalBookings = bookings.length

  const pendingBookings = bookings.filter(
    (booking) => booking.status === 'Pending'
  ).length

  const confirmedBookings = bookings.filter(
    (booking) => booking.status === 'Confirmed'
  ).length

  const cancelledBookings = bookings.filter(
    (booking) => booking.status === 'Cancelled'
  ).length

  return (
    <div className="admin-dashboard">

      <div className="dashboard-heading">
        <h2>Dashboard Overview</h2>
        <p>Welcome to CHAMUNDA DIGITAL Admin Panel</p>
      </div>

      {loading && <p>Loading bookings...</p>}

      {error && (
        <p className="text-danger">
          Error: {error}
        </p>
      )}

      <div className="dashboard-stats">

        <div className="dashboard-stat-card">
          <h5>Total Bookings</h5>
          <h2>{totalBookings}</h2>
        </div>

        <div className="dashboard-stat-card">
          <h5>Pending Bookings</h5>
          <h2>{pendingBookings}</h2>
        </div>

        <div className="dashboard-stat-card">
          <h5>Confirmed Bookings</h5>
          <h2>{confirmedBookings}</h2>
        </div>

        <div className="dashboard-stat-card">
          <h5>Cancelled Bookings</h5>
          <h2>{cancelledBookings}</h2>
        </div>

      </div>

      <div className="dashboard-actions">
        <h3>Quick Actions</h3>

        <div className="quick-action-buttons">
          <button
            onClick={() => navigate('/admin/bookings')}
          >
            Manage Bookings
          </button>

          <button
            onClick={() => navigate('/admin/gallery')}
          >
            Manage Gallery
          </button>
        </div>
      </div>

    </div>
  )
}

export default AdminDashboard
