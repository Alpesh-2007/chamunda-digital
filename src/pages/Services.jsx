
import { Link } from 'react-router-dom'

const services = [
  {
    title: "Pre-Wedding Shoot",
    description: "Creative pre-wedding photography and cinematic films to capture your love story.",
    icon: "❤️"
  },
  {
    title: "Wedding Photography",
    description: "Beautiful wedding moments captured forever with professional photography.",
    icon: "📸"
  },
  {
    title: "Drone Shooting",
    description: "Amazing aerial shots and cinematic drone videos for special occasions.",
    icon: "🚁"
  },
  {
    title: "Photography",
    description: "Professional portrait, family, candid and event photography.",
    icon: "📷"
  },
  {
    title: "Vehicle Delivery Shoot",
    description: "Special photos and cinematic videos for your new car and bike delivery.",
    icon: "🚘"
  },
  {
    title: "Opening Shoot",
    description: "Professional photo and video coverage for shop, showroom and business openings.",
    icon: "🎉"
  },
  {
    title: "Videography",
    description: "High-quality cinematic videos for events, celebrations and special moments.",
    icon: "🎥"
  },
  {
    title: "Birthday Shoot",
    description: "Capture birthday celebrations, cake cutting and unforgettable party moments.",
    icon: "🎂"
  },
  {
    title: "Engagement Shoot",
    description: "Beautiful engagement photography and cinematic films to preserve your special day.",
    icon: "💍"
  },
  {
  title: "Cinematography",
  description: "Professional cinematic videography to capture your special moments with beautiful storytelling.",
  icon: "🎥"
}
]

function Services() {
  return (
    <section className="services-section section-padding">
      <div className="container">

        <div className="text-center section-heading">
          <p className="gold-text">WHAT WE OFFER</p>
          <h2>OUR <span>SERVICES</span></h2>
          <p className="services-subtitle">
            We capture your precious moments with creativity,
            passion and professional photography.
          </p>
        </div>

        <div className="row g-4">
          {services.map((service, index) => (
            <div className="col-md-6 col-lg-4" key={index}>
              <div className="service-card">

                <div className="service-icon">
                  {service.icon}
                </div>

                <h4>{service.title}</h4>

                <p>{service.description}</p>

                <Link
                  to={`/booking?service=${encodeURIComponent(service.title)}`}
                  className="service-link"
                >
                  Book Now <span>→</span>
                </Link>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Services
