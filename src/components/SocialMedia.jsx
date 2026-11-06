
import {
  FaInstagram,
  FaWhatsapp,
  FaYoutube,
  FaEnvelope
} from 'react-icons/fa'

function SocialMedia() {
  return (
    <div className="social-media">

      {/* Instagram */}
      <a
        href="https://www.instagram.com/chamunda_digital_official/"
        target="_blank"
        rel="noopener noreferrer"
        className="social-icon instagram"
        aria-label="Instagram"
        title="Instagram"
      >
        <FaInstagram />
      </a>

      {/* WhatsApp */}
      <a
        href="https://wa.me/919724370748?text=Hello%20Chamunda%20Digital"
        target="_blank"
        rel="noopener noreferrer"
        className="social-icon whatsapp"
        aria-label="WhatsApp"
        title="WhatsApp"
      >
        <FaWhatsapp />
      </a>

      {/* YouTube */}
      <a
        href="https://www.youtube.com/@Aakashe9"
        target="_blank"
        rel="noopener noreferrer"
        className="social-icon youtube"
        aria-label="YouTube"
        title="YouTube"
      >
        <FaYoutube />
      </a>

      {/* Email */}
      <a
        href="mailto:chamundadigital1204@gmail.com"
        className="social-icon email"
        aria-label="Email"
        title="Email"
      >
        <FaEnvelope />
      </a>

    </div>
  )
}

export default SocialMedia
