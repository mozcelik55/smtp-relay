const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const API_KEY = "muzi-secret-55";

app.post("/send", async (req, res) => {
  if (req.headers["x-api-key"] !== API_KEY) {
    return res.status(403).send("Unauthorized");
  }

  const { to, subject, html } = req.body;

  let transporter = nodemailer.createTransport({
    host: "mail.privateemail.com",
    port: 465,
    secure: true,
    auth: {
      user: "noreply@trdnt.services",
      pass: "Muzo102102"
    }
  });

  try {
    await transporter.sendMail({
      from: '"Amenities Feedback" <noreply@trdnt.services>',
      to,
      subject,
      html
    });
    res.status(200).send("Email sent successfully.");
  } catch (error) {
    console.error("SMTP Error:", error);
    res.status(500).send("Failed to send email.");
  }
});

app.listen(3000, () => {
  console.log("✅ SMTP relay running on port 3000");
});
