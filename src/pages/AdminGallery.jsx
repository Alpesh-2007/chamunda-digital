
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  getGallery,
  addGallery,
  deleteGallery,
  uploadGalleryFile,
  deleteUploadedFile
} from '../services/api'

const categories = [
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

const allowedTypes = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/jpg',
  'video/mp4',
  'video/webm'
]

const isVideo = (media) => {
  return (
    media.mediaType === 'video' ||
    /\.(mp4|webm)(\?.*)?$/i.test(media.url || media.image || '')
  )
}

function AdminGallery() {
  const navigate = useNavigate()

  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [selectedFiles, setSelectedFiles] = useState([])
  const [previews, setPreviews] = useState([])

  const [formData, setFormData] = useState({
    title: '',
    category: 'Wedding'
  })

  // Check Login and Load Gallery
  useEffect(() => {
    if (localStorage.getItem('adminLogin') !== 'true') {
      navigate('/admin/login')
      return
    }

    fetchGallery()
  }, [navigate])

  // Clean temporary preview URLs
  useEffect(() => {
    return () => {
      previews.forEach((preview) => {
        URL.revokeObjectURL(preview.url)
      })
    }
  }, [previews])

  // Get Gallery Data
  const fetchGallery = async () => {
    try {
      const response = await getGallery()
      setImages(response.data)
      setError('')
    } catch (err) {
      setError('Gallery loading failed. Check JSON Server.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Handle Title and Category
  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }))
  }

  // Select Multiple Photos and Videos
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || [])

    if (!files.length) return

    const invalidFile = files.find(
      (file) => !allowedTypes.includes(file.type)
    )

    if (invalidFile) {
      setError(
        `${invalidFile.name}: Only JPG, PNG, WEBP, MP4 and WEBM files are allowed.`
      )
      e.target.value = ''
      return
    }

    const largeFile = files.find(
      (file) => file.size > 100 * 1024 * 1024
    )

    if (largeFile) {
      setError(`${largeFile.name}: File size must be less than 100 MB.`)
      e.target.value = ''
      return
    }

    const newPreviews = files.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
      type: file.type
    }))

    setSelectedFiles(files)
    setPreviews(newPreviews)
    setError('')
  }

  // Remove Selected File Before Upload
  const removeSelectedFile = (index) => {
    setSelectedFiles((previous) =>
      previous.filter((_, i) => i !== index)
    )

    setPreviews((previous) =>
      previous.filter((_, i) => i !== index)
    )

    const fileInput = document.getElementById('gallery-file')
    if (fileInput) fileInput.value = ''
  }

  // Upload Multiple Photos and Videos
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!selectedFiles.length) {
      setError('Please select at least one photo or video.')
      return
    }

    setSaving(true)
    setError('')

    const uploadedFiles = []

    try {
      // Upload every selected file
      for (const file of selectedFiles) {
        const uploadResponse = await uploadGalleryFile(file)

        uploadedFiles.push({
          url: uploadResponse.data.url,
          fileName: uploadResponse.data.fileName,
          mediaType: uploadResponse.data.mediaType
        })
      }

      // Save all uploaded files inside one gallery record
      const galleryData = {
        title: formData.title,
        category: formData.category,
        media: uploadedFiles
      }

      const response = await addGallery(galleryData)

      setImages((previous) => [
        ...previous,
        response.data
      ])

      setFormData({
        title: '',
        category: 'Wedding'
      })

      setSelectedFiles([])
      setPreviews([])

      const fileInput = document.getElementById('gallery-file')
      if (fileInput) fileInput.value = ''

      alert(
        `${uploadedFiles.length} Photos / Videos Uploaded Successfully!`
      )

    } catch (err) {
      // Clean up files already uploaded if saving fails
      await Promise.all(
        uploadedFiles.map(async (file) => {
          try {
            await deleteUploadedFile(file.fileName)
          } catch (deleteError) {
            console.error('Temporary file cleanup failed:', deleteError)
          }
        })
      )

      setError(
        err.response?.data?.message ||
        'Upload failed. Check Upload Server and JSON Server.'
      )

      console.error(err)

    } finally {
      setSaving(false)
    }
  }

  // Get all media from new or old gallery records
  const getItemMedia = (item) => {
    if (Array.isArray(item.media)) {
      return item.media
    }

    // Support old single-file gallery records
    if (item.image) {
      return [
        {
          url: item.image,
          fileName: item.fileName,
          mediaType: item.mediaType || 'image'
        }
      ]
    }

    return []
  }

  // Delete Complete Gallery Card
  const handleDelete = async (item) => {
    const confirmDelete = window.confirm(
      'શું તમે આ આખો Gallery Card અને તેની બધી Photos / Videos Delete કરવા માંગો છો?'
    )

    if (!confirmDelete) return

    try {
      const mediaFiles = getItemMedia(item)

      // Delete gallery record from JSON Server
      await deleteGallery(item.id)

      // Delete all physical files from uploads folder
      for (const media of mediaFiles) {
        if (media.fileName) {
          try {
            await deleteUploadedFile(media.fileName)
          } catch (fileError) {
            console.error('Physical file delete failed:', fileError)
          }
        }
      }

      setImages((previous) =>
        previous.filter((galleryItem) => galleryItem.id !== item.id)
      )

      alert('Gallery Card Deleted Successfully!')

    } catch (err) {
      alert('Gallery delete failed.')
      console.error(err)
    }
  }

  return (
    <div className="admin-dashboard">
      <div className="container py-5">

        {/* Heading */}
        <div className="gallery-admin-heading">
          <div>
            <h2>Gallery Management</h2>
            <p>Upload and manage your studio photos and videos.</p>
          </div>

          <button
            className="back-button"
            onClick={() => navigate('/admin/dashboard')}
          >
            Back to Dashboard
          </button>
        </div>

        {/* Upload Form */}
        <div className="gallery-form-box">

          <h4>Upload New Gallery Collection</h4>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">

              {/* Title */}
              <div className="col-md-6">
                <label>Gallery Title</label>

                <input
                  type="text"
                  name="title"
                  placeholder="Enter Gallery Collection Title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Category */}
              <div className="col-md-6">
                <label>Category</label>

                <select
                  className="form-select"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Multiple File Input */}
              <div className="col-12">
                <label>Select Multiple Photos / Videos</label>

                <input
                  id="gallery-file"
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/jpg,video/mp4,video/webm"
                  onChange={handleFileChange}
                  multiple
                  required
                />

                <small className="d-block mt-2">
                  Allowed: JPG, PNG, WEBP, MP4, WEBM.
                  Maximum size: 100 MB per file.
                  You can select multiple files.
                </small>
              </div>

              {/* Selected Files Preview */}
              {previews.length > 0 && (
                <div className="col-12">
                  <label>
                    Selected Files ({previews.length})
                  </label>

                  <div className="row g-3">
                    {previews.map((preview, index) => (
                      <div className="col-6 col-md-4 col-lg-3" key={preview.url}>
                        <div className="gallery-upload-preview">

                          {preview.type.startsWith('video/') ? (
                            <video
                              src={preview.url}
                              controls
                              className="gallery-preview-media"
                            />
                          ) : (
                            <img
                              src={preview.url}
                              alt={preview.name}
                              className="gallery-preview-media"
                            />
                          )}

                          <p>{preview.name}</p>

                          <button
                            type="button"
                            className="delete-button"
                            onClick={() => removeSelectedFile(index)}
                          >
                            Remove
                          </button>

                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Upload Button */}
              <div className="col-12">
                <button
                  type="submit"
                  className="add-photo-button"
                  disabled={saving}
                >
                  {saving
                    ? 'Uploading All Files... Please Wait'
                    : `Upload Gallery Collection (${selectedFiles.length} Files)`}
                </button>
              </div>

            </div>
          </form>

          {error && (
            <p className="login-error mt-3">{error}</p>
          )}

        </div>

        {/* Gallery List */}
        <div className="admin-gallery-list">

          <h4>All Gallery Collections ({images.length})</h4>

          {loading ? (
            <p>Loading Gallery...</p>
          ) : images.length === 0 ? (
            <p>No Photos or Videos Available.</p>
          ) : (
            <div className="row g-4">

              {images.map((item) => {
                const mediaItems = getItemMedia(item)

                return (
                  <div
                    className="col-sm-6 col-lg-4"
                    key={item.id}
                  >
                    <div className="admin-gallery-card">

                      <div className="row g-2 p-2">
                        {mediaItems.map((media, index) => (
                          <div className="col-6" key={`${media.fileName || media.url}-${index}`}>

                            {isVideo(media) ? (
                              <video
                                src={media.url || media.image}
                                controls
                                className="admin-gallery-media"
                              />
                            ) : (
                              <img
                                src={media.url || media.image}
                                alt={item.title}
                                className="admin-gallery-media"
                              />
                            )}

                          </div>
                        ))}
                      </div>

                      <div className="admin-gallery-info">

                        <h5>{item.title}</h5>

                        <p>{item.category}</p>

                        <small>
                          {mediaItems.length} Media Files
                        </small>

                        <button
                          className="delete-button"
                          onClick={() => handleDelete(item)}
                        >
                          Delete Complete Collection
                        </button>

                      </div>

                    </div>
                  </div>
                )
              })}

            </div>
          )}

        </div>

      </div>
    </div>
  )
}

export default AdminGallery
