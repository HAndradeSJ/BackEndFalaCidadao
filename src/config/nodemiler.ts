import *  as nodemiler from  'nodemailer';
const emailTransportor = nodemiler.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "henrique33391@fiec.edu.br",
    pass: "****"
  }, tls:{
    rejectUnauthorized:false,
  }  
})

export default emailTransportor