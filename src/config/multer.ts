import multer from "multer"
import path from 'path'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const pastaDestino =path.join(__dirname,'/users')
    cb(null, pastaDestino);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname.substring(file.originalname.indexOf('.')))
  }
})
const storageSolici = multer.diskStorage({
  destination: function (req, file, cb) {
    const pastaDestino =path.join(__dirname,'/picture')
    cb(null, pastaDestino);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname.substring(file.originalname.indexOf('.')))
  }
})

  const uploadAvatar = multer({ storage: storage })
  const uploadSolici = multer({ storage: storageSolici })

  export {uploadAvatar,uploadSolici}