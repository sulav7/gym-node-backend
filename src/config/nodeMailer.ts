import nodemailer from "nodemailer";

interface option {
  from: string;
  to: string;
  subject?: string;
  html?: string;
}

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "arne.sauer@ethereal.email",
    pass: "rGECN1zdWhK8X9xaFF",
  },
});

const sendEmail = async (option: option) => {
  transporter.sendMail(option, (err, info) => {
    if (err) {
      console.log(err);
    }
  });
};

export default sendEmail;
