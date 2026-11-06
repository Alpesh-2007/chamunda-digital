
import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {
  fetchBookings,
  changeBookingStatus,
  removeBooking
} from '../redux/bookingSlice'

function Bookings() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { bookings, loading, error } = useSelector(
    (state) => state.bookings
  )

  const [search, setSearch] = useState('')

  useEffect(() => {
    dispatch(fetchBookings())
  }, [dispatch])

  // Search Filter
  const filteredBookings = useMemo(() => {
    const searchText = search.toLowerCase()

    return bookings.filter((booking) => {
      const customerName =
        booking.name || booking.customerName || booking.customer || ''

      const phone = booking.phone || ''
      const service = booking.service || ''

      return (
        customerName.toLowerCase().includes(searchText) ||
        phone.toString().includes(searchText) ||
        service.toLowerCase().includes(searchText)
      )
    })
  }, [bookings, search])

  // Status Update
  const handleStatusChange = (id, status) => {
    dispatch(changeBookingStatus({ id, status }))
  }

  // Delete Booking
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this booking?'
    )

    if (confirmDelete) {
      dispatch(removeBooking(id))
    }
  }

  return (
    <div className="admin-dashboard">

      <div className="booking-heading">
        <h2>Manage Bookings</h2>
        <p>View, search and manage customer bookings.</p>
      </div>

      <div className="booking-stats">
        <h4>Total Bookings: {bookings.length}</h4>
      </div>

      <div className="booking-table-box">

        <input
          type="text"
          className="booking-search"
          placeholder="Search by customer, phone or service..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {loading && <p>Loading bookings...</p>}

        {error && (
          <p className="text-danger">
            Error: {error}
          </p>
        )}

        {!loading && (
          <div className="table-responsive">
            <table className="table table-dark table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Customer</th>
                  <th>Phone</th>
                  <th>Service</th>
                  <th>Date</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredBookings.map((booking, index) => {
                  const customerName =
                    booking.name ||
                    booking.customerName ||
                    booking.customer ||
                    'N/A'

                  return (
                    <tr key={booking.id}>
                      <td>{index + 1}</td>

                      <td>{customerName}</td>

                      <td>{booking.phone || 'N/A'}</td>

                      <td>{booking.service || 'N/A'}</td>

                      <td>{booking.date || 'N/A'}</td>

                      <td>{booking.location || 'N/A'}</td>

                      <td>
                        <select
                          className="status-select"
                          value={booking.status || 'Pending'}
                          onChange={(e) =>
                            handleStatusChange(
                              booking.id,
                              e.target.value
                            )
                          }
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>

                      <td>
                        <button
                          className="delete-button"
                          onClick={() => handleDelete(booking.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                })}

                {filteredBookings.length === 0 && (
                  <tr>
                    <td colSpan="8" className="text-center">
                      No bookings found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

      </div>

      <button
        className="back-button"
        onClick={() => navigate('/admin/dashboard')}
      >
        Back to Dashboard
      </button>

    </div>
  )
}

export default Bookings
