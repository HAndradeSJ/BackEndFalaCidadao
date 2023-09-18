import multer from "multer"

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const pastaDestino = "../uploads";
    cb(null, pastaDestino);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname.substring(file.originalname.indexOf('.')))
  }
})

  const upload = multer({ storage: storage })

  export { upload}