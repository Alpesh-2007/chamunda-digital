
import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import introVideo from '../assets/videos/chamunda-intro.mp4'

function Home() {
  const [showIntro, setShowIntro] = useState(true)
  const [showContent, setShowContent] = useState(false)

  const isRegistered =
    localStorage.getItem("registrationCompleted") === "true"

  const handleVideoEnd = () => {
    setShowIntro(false)

    if (isRegistered) {
      setShowContent(true)
    }
  }

  const handleVideoError = () => {
    setShowIntro(false)

    if (isRegistered) {
      setShowContent(true)
    }
  }

  // First time: Registration Page
  if (!isRegistered && !showIntro) {
    return <Navigate to="/register" replace />
  }

  return (
    <>
      {showIntro && (
        <div className="intro-screen">
          <video
            className="intro-video"
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={handleVideoEnd}
            onError={handleVideoError}
          >
            <source src={introVideo} type="video/mp4" />
          </video>
        </div>
      )}

      <section className="hero-section">
        <div className="hero-overlay"></div>

        <div className="container hero-content">

          <p className={`hero-subtitle ${
            showContent ? 'animate-up delay-1' : 'content-hidden'
          }`}>
            WELCOME TO CHAMUNDA DIGITAL
          </p>

          <h1 className={
            showContent ? 'animate-up delay-2' : 'content-hidden'
          }>
            CAPTURING <span>YOUR</span>
            <br />
            BEAUTIFUL MOMENTS
          </h1>

          <p className={`hero-description ${
            showContent ? 'animate-up delay-3' : 'content-hidden'
          }`}>
            We capture your special moments and turn them
            into memories that last forever.
          </p>

          <div className={`hero-buttons ${
            showContent ? 'animate-up delay-4' : 'content-hidden'
          }`}>

            <Link to="/gallery" className="gold-btn">
              EXPLORE OUR WORK
            </Link>

            <Link to="/contact" className="outline-btn">
              CONTACT US
            </Link>

          </div>

        </div>
      </section>
    </>
  )
}

export default Home
