
const express = require('express')
const multer = require('multer')
const cors = require('cors')
const path = require('path')
const fs = require('fs')

const app = express()
const PORT = 4000

app.use(cors())

// Upload folder
const uploadFolder = path.join(__dirname, '../public/uploads')

if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, { recursive: true })
}

// File storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder)
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + '-' +
      Math.round(Math.random() * 1E9) +
      path.extname(file.originalname).toLowerCase()

    cb(null, uniqueName)
  }
})

// Allowed file types
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/jpg',
    'video/mp4',
    'video/webm'
  ]

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('Only JPG, PNG, WEBP, MP4 and WEBM files are allowed'))
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024
  }
})

// Display uploaded files
app.use('/uploads', express.static(uploadFolder))

// Upload photo or video
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      message: 'Please select a file'
    })
  }

  const mediaType = req.file.mimetype.startsWith('video/')
    ? 'video'
    : 'image'

  res.json({
    message: 'File uploaded successfully',
    fileName: req.file.filename,
    url: `http://localhost:${PORT}/uploads/${req.file.filename}`,
    mediaType
  })
})

// Delete uploaded file
app.delete('/upload/:fileName', (req, res) => {
  const fileName = path.basename(req.params.fileName)
  const filePath = path.join(uploadFolder, fileName)

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({
      message: 'File not found'
    })
  }

  fs.unlink(filePath, (err) => {
    if (err) {
      return res.status(500).json({
        message: 'File delete failed'
      })
    }

    res.json({
      message: 'File deleted successfully'
    })
  })
})

// Error handling
app.use((err, req, res, next) => {
  res.status(400).json({
    message: err.message || 'Upload failed'
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`Upload Server running at http://localhost:${PORT}`)
})
