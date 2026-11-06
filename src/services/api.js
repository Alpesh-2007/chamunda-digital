
import axios from 'axios'

// JSON Server API
const API = axios.create({
  baseURL: 'http://localhost:3000'
})

// ==============================
// BOOKING API
// ==============================

export const getBookings = () => API.get('/bookings')

export const addBooking = (data) => API.post('/bookings', data)

export const updateBooking = (id, data) =>
  API.patch(`/bookings/${id}`, data)

export const deleteBooking = (id) =>
  API.delete(`/bookings/${id}`)


// ==============================
// GALLERY API
// ==============================

export const getGallery = () => API.get('/gallery')

export const addGallery = (data) => API.post('/gallery', data)

export const deleteGallery = (id) => API.delete(`/gallery/${id}`)


// ==============================
// UPLOAD PHOTO / VIDEO
// ==============================

export const uploadGalleryFile = (file) => {
  const formData = new FormData()

  formData.append('file', file)

  return axios.post(
    'http://localhost:4000/upload',
    formData
  )
}


// ==============================
// DELETE UPLOADED PHOTO / VIDEO
// ==============================

export const deleteUploadedFile = (fileName) => {
  return axios.delete(
    `http://localhost:4000/upload/${encodeURIComponent(fileName)}`
  )
}

export default API
