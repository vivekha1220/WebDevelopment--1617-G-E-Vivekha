const nodemailer = require("nodemailer");
const mailGun = require('nodemailer-mailgun-transport');


const auth = {
  auth:{
    api_key:'f3b7318ce259fb7bf4728af6bc22d4ba-1b6eb03d-0a666323',
    domain: 'sandbox0350b104cace489ba5ff84dd3d9a7001.mailgun.org'
  }
};

const transporter = nodemailer.createTransport(mailGun(auth));

const sendMail = (email, username, comment, cb) => {
  const mailOptions = {
    from: email,
    to: 'vivekha1220@gmail.com',
    subject,
    text
  };
  
  transporter.sendMail(mailOptions, function(err, data) {
  if (err) {
    cb(err, null);
  } else {
    cb(null, data);
  }
  });
}

module.exports = sendMail;



/*let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "vivekha2012@gmail.com",
    pass: ""
  }
});

let mailer = {
  sendMail: function(mailOptions) {
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent successfully : " + info.response);
      }
    });
  }
};

module.exports = mailer;*/