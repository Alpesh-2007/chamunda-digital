
import { useState } from 'react'

function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit(e) {
    e.preventDefault()

    const phone = '919724370748'

    const message = `Hello CHAMUNDA DIGITAL!

Name: ${form.name}
Email: ${form.email}
Phone: ${form.phone}
Message: ${form.message}`

    const whatsappURL = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`

    window.location.href = whatsappURL
  }

  return (
    <section className="contact-section section-padding">
      <div className="container">

        <div className="text-center section-heading">
          <p className="gold-text">GET IN TOUCH</p>
          <h2>CONTACT <span>US</span></h2>
        </div>

        <div className="row g-5">

          <div className="col-lg-5">
            <h3>CHAMUNDA DIGITAL</h3>
            <p>Let's create beautiful memories together.</p>

            <div className="contact-info">
              <h5>Phone</h5>
              <p>
                <a href="tel:+919724370748">
                  +91 9724370748
                </a>
              </p>

              <h5>Email</h5>
              <p>
                <a href="mailto:chamundadigital1204@gmail.com">
                  chamundadigital1204@gmail.com
                </a>
              </p>

              <h5>Address</h5>
              <p> Rajkot , Morbi </p>
            </div>
          </div>

          <div className="col-lg-7">
            <form className="contact-form" onSubmit={handleSubmit}>

              <input
                className="form-control"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
              />

              <input
                className="form-control"
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                required
              />

              <input
                className="form-control"
                type="tel"
                name="phone"
                placeholder="Your Phone"
                value={form.phone}
                onChange={handleChange}
                required
              />

              <textarea
                className="form-control"
                name="message"
                placeholder="Your Message"
                rows="5"
                value={form.message}
                onChange={handleChange}
                required
              />

              <button className="gold-btn" type="submit">
                SEND MESSAGE ON WHATSAPP
              </button>

            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
