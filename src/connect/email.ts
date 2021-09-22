import { EMAIL_PASSWORD, EMAIL_USERNAME } from "../constant";

import nodemailer from "nodemailer";

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USERNAME,
    pass: EMAIL_PASSWORD,
  },
});

export const sendEmail = ({ email, subject, text }: any) => {
  const mailOptions = {
    from: EMAIL_USERNAME,
    to: email,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
