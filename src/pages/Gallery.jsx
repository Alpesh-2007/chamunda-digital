
import { useEffect, useState } from 'react'
import axios from 'axios'

const allCategories = [
  'All',
  'Wedding',
  'Pre-Wedding',
  'Engagement',
  'Birthday',
  'Drone',
  'Photography',
  'Videography',
  'Vehicle Delivery',
  'Opening',
'Cinematography'
]

// Check Media Type
const isVideo = (media) => {
  const url = media.url || media.image || ''

  return (
    media.mediaType === 'video' ||
    /\.(mp4|webm)(\?.*)?$/i.test(url)
  )
}

// Get Media from Old and New Records
const getMediaItems = (item) => {
  if (Array.isArray(item.media)) {
    return item.media
  }

  // Old Gallery Record Support
  if (item.image) {
    return [
      {
        url: item.image,
        mediaType: item.mediaType || 'image',
        fileName: item.fileName
      }
    ]
  }

  return []
}

function Gallery() {
  const [gallery, setGallery] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [currentIndexes, setCurrentIndexes] = useState({})
  const [selectedMedia, setSelectedMedia] = useState(null)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Fetch Gallery Data
  const fetchGallery = async () => {
    try {
      setLoading(true)
      setError('')

      const response = await axios.get(
        'http://localhost:3000/gallery'
      )

      setGallery(response.data)

    } catch (err) {
      console.error('Gallery Error:', err)

      setError(
        'Gallery load થઈ શક્યું નથી. JSON Server ચાલુ છે કે નહીં તે તપાસો.'
      )

    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGallery()
  }, [])

  // Category Filter
  const filteredGallery =
    selectedCategory === 'All'
      ? gallery
      : gallery.filter((item) => {
          const category = item.category?.toLowerCase()
          const selected = selectedCategory.toLowerCase()

          return (
            category === selected ||
            (selected === 'photography' && category === 'portrait')
          )
        })

  // Next Image / Video
  const handleNext = (itemId, total) => {
    setCurrentIndexes((previous) => ({
      ...previous,
      [itemId]: ((previous[itemId] || 0) + 1) % total
    }))
  }

  // Previous Image / Video
  const handlePrevious = (itemId, total) => {
    setCurrentIndexes((previous) => ({
      ...previous,
      [itemId]: (
        (previous[itemId] || 0) - 1 + total
      ) % total
    }))
  }

  return (
    <>
      <section className="gallery-section py-5">
        <div className="container">

          {/* Gallery Heading */}
          <div className="text-center mb-5">
            <p className="text-warning mb-2">
              OUR CREATIVE WORK
            </p>

            <h1 className="display-4 fw-bold">
              Our <span className="text-warning">Gallery</span>
            </h1>

            <p className="text-secondary mt-3">
              Explore our beautiful photography and cinematic videos.
            </p>
          </div>

          {/* Category Buttons */}
          <div className="gallery-filter d-flex justify-content-center flex-wrap gap-2 mb-5">

            {allCategories.map((category) => (
              <button
                key={category}
                className={`btn ${
                  selectedCategory === category
                    ? 'btn-warning'
                    : 'btn-outline-warning'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}

          </div>

          {/* Loading */}
          {loading && (
            <div className="text-center py-5">
              <div className="spinner-border text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>

              <p className="text-secondary mt-3">
                Loading Gallery...
              </p>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="alert alert-danger text-center">
              {error}

              <br />

              <button
                className="btn btn-warning mt-3"
                onClick={fetchGallery}
              >
                Try Again
              </button>
            </div>
          )}

          {/* Gallery Cards */}
          {!loading && !error && (
            <div className="row g-4">

              {filteredGallery.length > 0 ? (
                filteredGallery.map((item) => {
                  const mediaItems = getMediaItems(item)

                  const currentIndex =
                    (currentIndexes[item.id] || 0) % Math.max(mediaItems.length, 1)

                  const currentMedia = mediaItems[currentIndex]

                  return (
                    <div
                      className="col-lg-4 col-md-6"
                      key={item.id}
                    >
                      <div className="gallery-card">

                        {/* Only ONE Photo / Video at a time */}
                        <div className="gallery-media-wrapper">

                          {currentMedia && (
                            isVideo(currentMedia) ? (
                              <video
                                key={currentMedia.url || currentMedia.image}
                                src={currentMedia.url || currentMedia.image}
                                className="gallery-card-media gallery-video"
                                controls
                                playsInline
                                preload="metadata"
                              >
                                Your browser does not support video.
                              </video>
                            ) : (
                              <img
                                key={currentMedia.url || currentMedia.image}
                                src={currentMedia.url || currentMedia.image}
                                alt={item.title || 'Gallery Image'}
                                className="gallery-card-media gallery-photo"
                                onClick={() => setSelectedMedia({
                                  item,
                                  media: currentMedia
                                })}
                              />
                            )
                          )}

                          {/* Previous Button */}
                          {mediaItems.length > 1 && (
                            <button
                              type="button"
                              className="gallery-carousel-btn gallery-prev"
                              onClick={() =>
                                handlePrevious(item.id, mediaItems.length)
                              }
                              aria-label="Previous image"
                            >
                              &#10094;
                            </button>
                          )}

                          {/* Next Button */}
                          {mediaItems.length > 1 && (
                            <button
                              type="button"
                              className="gallery-carousel-btn gallery-next"
                              onClick={() =>
                                handleNext(item.id, mediaItems.length)
                              }
                              aria-label="Next image"
                            >
                              &#10095;
                            </button>
                          )}

                          {/* Image Count */}
                          {mediaItems.length > 0 && (
                            <div className="gallery-media-counter">
                              {currentIndex + 1} / {mediaItems.length}
                            </div>
                          )}

                        </div>

                        {/* Gallery Information */}
                        <div className="gallery-info">
                          <h5>{item.title}</h5>
                          <p>{item.category}</p>
                        </div>

                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="col-12 text-center py-5">
                  <h4 className="text-secondary">
                    No {selectedCategory === 'All'
                      ? 'Gallery Items'
                      : selectedCategory + ' Items'} Found
                  </h4>

                  <p className="text-secondary">
                    This category does not have any photos or videos yet.
                  </p>
                </div>
              )}

            </div>
          )}

        </div>
      </section>

      {/* Image Lightbox */}
      {selectedMedia && (
        <div
          className="gallery-lightbox"
          onClick={() => setSelectedMedia(null)}
        >
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="lightbox-close"
              onClick={() => setSelectedMedia(null)}
              aria-label="Close image"
            >
              &times;
            </button>

            {isVideo(selectedMedia.media) ? (
              <video
                src={
                  selectedMedia.media.url ||
                  selectedMedia.media.image
                }
                controls
                autoPlay
                playsInline
              />
            ) : (
              <img
                src={
                  selectedMedia.media.url ||
                  selectedMedia.media.image
                }
                alt={selectedMedia.item.title}
              />
            )}

            <div className="text-center mt-3">
              <h5>{selectedMedia.item.title}</h5>

              <p className="text-warning">
                {selectedMedia.item.category}
              </p>
            </div>

          </div>
        </div>
      )}
    </>
  )
}

export default Gallery
