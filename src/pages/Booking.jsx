
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { addBooking } from '../services/api'

const serviceOptions = [
  'Pre-Wedding Shoot',
  'Wedding Photography',
  'Drone Shooting',
  'Photography',
  'Vehicle Delivery Shoot',
  'Opening Shoot',
  'Videography',
  'Birthday Shoot',
  'Engagement Shoot',
  'Cinematography'
]

const initialBooking = {
  name: '',
  phone: '',
  service: '',
  date: '',
  location: '',
  message: ''
}

function Booking() {
  const [searchParams] = useSearchParams()

  // URL માંથી Service મેળવવી
  const serviceFromUrl = searchParams.get('service') || ''

  // માત્ર માન્ય Service જ Lock થશે
  const lockedService = serviceOptions.includes(serviceFromUrl)
    ? serviceFromUrl
    : ''

  const [booking, setBooking] = useState({
    ...initialBooking,
    service: lockedService
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  // URL માં Service બદલાય તો Form પણ Update થશે
  useEffect(() => {
    setBooking((previousBooking) => ({
      ...previousBooking,
      service: lockedService
    }))
  }, [lockedService])

  function handleChange(e) {
    const { name, value } = e.target

    // URL દ્વારા Service Lock હોય તો તેને બદલવા દેવી નહીં
    if (name === 'service' && lockedService) {
      return
    }

    setBooking((previousBooking) => ({
      ...previousBooking,
      [name]: value
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault()

    setLoading(true)
    setSuccess('')
    setError('')

    // URL ની Service ને પ્રાથમિકતા આપવી
    const finalBooking = {
      ...booking,
      service: lockedService || booking.service,
      status: 'Pending'
    }

    try {
      const response = await addBooking(finalBooking)

      setSuccess('Booking successfully saved!')

      // Submit પછી Form Reset થશે
      // પરંતુ Locked Service યથાવત્ રહેશે
      setBooking({
        ...initialBooking,
        service: lockedService
      })

      console.log('Saved Booking:', response.data)

    } catch (err) {
      setError('Booking save failed. Please try again.')
      console.error(err)

    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="booking-section section-padding">
      <div className="container">

        <div className="text-center section-heading">
          <p className="gold-text">RESERVE YOUR DATE</p>
          <h2>BOOK YOUR <span>SESSION</span></h2>
        </div>

        <div className="booking-box">

          {success && (
            <div className="alert alert-success">
              {success}
            </div>
          )}

          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="row g-4">

              {/* Customer Name */}
              <div className="col-md-6">
                <label>Your Name</label>

                <input
                  className="form-control"
                  name="name"
                  value={booking.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </div>

              {/* Phone Number */}
              <div className="col-md-6">
                <label>Phone Number</label>

                <input
                  className="form-control"
                  type="tel"
                  name="phone"
                  value={booking.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  required
                />
              </div>

              {/* Service Selection */}
              <div className="col-md-6">
                <label>Select Service</label>

                {lockedService ? (
                  <input
                    type="text"
                    className="form-control"
                    name="service"
                    value={lockedService}
                    readOnly
                  />
                ) : (
                  <select
                    className="form-select"
                    name="service"
                    value={booking.service}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Choose Service</option>

                    {serviceOptions.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Event Date */}
              <div className="col-md-6">
                <label>Event Date</label>

                <input
                  className="form-control"
                  type="date"
                  name="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={booking.date}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Event Location */}
              <div className="col-12">
                <label>Event Location</label>

                <input
                  className="form-control"
                  name="location"
                  value={booking.location}
                  onChange={handleChange}
                  placeholder="Enter location"
                  required
                />
              </div>

              {/* Additional Details */}
              <div className="col-12">
                <label>Additional Details</label>

                <textarea
                  className="form-control"
                  name="message"
                  rows="4"
                  value={booking.message}
                  onChange={handleChange}
                  placeholder="Your message"
                />
              </div>

              {/* Submit Button */}
              <div className="col-12 text-center">
                <button
                  type="submit"
                  className="gold-btn"
                  disabled={loading}
                >
                  {loading ? 'SAVING...' : 'SUBMIT BOOKING'}
                </button>
              </div>

            </div>
          </form>

        </div>
      </div>
    </section>
  )
}

export default Booking
