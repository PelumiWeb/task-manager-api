const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "pelumiogundipe905@gmail.com",
    pass: "Goodnews",
  },
});

const mailOption = {
  from: "Pelumiogundipe905@gmail.com",
  to: "Pelumiogundipe905@gmail.com",
  subject: "Sending Email using Node.js",
  text: "That was easy",
};

transporter.sendMail(mailOption, (error, info) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Email Sent: " + info.response);
  }
});
