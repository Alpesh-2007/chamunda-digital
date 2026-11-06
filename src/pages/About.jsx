
function About() {
  return (
    <section className="about-section section-padding">
      <div className="container">
        <div className="row align-items-center">

          <div className="col-lg-6">
            <img
              src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=900"
              className="img-fluid about-image"
              alt="Photography camera"
            />
          </div>

          <div className="col-lg-6 about-content">

            <p className="gold-text">ABOUT OUR STUDIO</p>

            <h2>
              WE CREATE <span>MEMORIES</span>
              THAT LAST FOREVER
            </h2>

            <p>
              CHAMUNDA DIGITAL is a creative photography
              and cinematography studio. We capture your
              special moments with creativity and passion.
            </p>

            <p>
              Our goal is to turn your beautiful memories
              into timeless photographs and videos.
            </p>

            <a href="/contact" className="gold-btn">
              KNOW MORE
            </a>

          </div>
        </div>
      </div>
    </section>
  )
}

export default About
