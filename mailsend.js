import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  secure: true,
  service: "smtp.gmail.com",
  port: 465,
  auth: {
    user: "vaibhavchakole79@gmail.com",
    pass: "vaitejkc#1726",
  },
});
function sendMail(to, sub, msg) {
  transporter.sendMail({
    to: to,
    subject: sub,
    html: msg,
  });
  console.log("mail sent");
}
sendMail("vaibhavchakole79@gmail.com", "hello", "hello");
