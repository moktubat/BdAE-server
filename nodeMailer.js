// nodeMailer.js
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


function sendWelcomeEmail(email, firstName, lastName) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "BdAE - Thank you for Registration",
    html: `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email</title>
    <style>
      .body {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 16px;
      }

      .container {
        width: 640px;
        height: 776px;
        margin: 20px auto;
        background-color: #f2f5f8;
        border: 1px solid #ffa500;
      }

      .header {
        margin: 32px;
        background-color: #216b4c;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 24px 32px;
      }

      .date {
        background-color: #a81f25;
        color: white;
        padding: 12px 32px;
        text-transform: uppercase;
        font-size: 16px;
        border-radius: 5px;
      }

      main {
        margin: 32px;
      }
      .emailContainer {
        margin: 32px;
        color: #231f20;
      }

      .emailContainer h4 {
        font-weight: bold;
        margin-bottom: 35px;
      }

      .emailContainer p {
        margin-top: 6px;
        margin-bottom: 35px;
      }

      .emailContainer .font-bold {
        font-weight: bold;
        margin-bottom: 35px;
      }

      .contact-info {
        color: #3545ee;
      }

      .footer {
        margin: 32px;
        background-color: #a81f25;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 32px;
      }

      .social-icons img {
        margin-right: 3px;
      }
    </style>
  </head>
  <body class="body">
    <div class="container">
      <header class="header">
        <div class="logo">
          <img src="https://i.ibb.co/VBByx2v/Logo.png" alt="" />
        </div>
        <p class="date">May 16-17, 2023</p>
      </header>

      <main>
        <div class="emailContainer">
          <h4>Dear ${firstName} ${lastName},</h4>
          <p class="my-6">
            Thank you for registering for the Bangladesh Apparel Expo, scheduled
            on May 16-17, 2023, at the International Convention City Bashundhara
            (ICCB), Bangladesh, organized by the Bangladesh Apparel Exchange
            (BAE).
          </p>
          <p class="font-bold">
            Our team is currently reviewing the information you provided. Once
            your submission has been processed and approved, we will promptly
            send you a confirmation email along with your E-Ticket.
          </p>
          <p class="my-6">
            If you have any questions in the meantime, please feel free to
            contact us at
            <span class="contact-info">
              <a href="mailto:info@bangladeshapparelexchange.com"
                >info@bangladeshapparelexchange.com</a
              >
            </span>
            . You can also stay updated through our social media channels.
          </p>
          <p>
            Once again, we appreciate your interest in Bangladesh Apparel Expo.
          </p>
          <p class="my-6">
            Best Regards,
            <br />
            Bangladesh Apparel Expo Team
          </p>
        </div>
      </main>

      <footer class="footer">
        <div class="logo">
          <img src="https://i.ibb.co/VBByx2v/Logo.png" alt="" />
        </div>
        <p class="social-icons">
          <img src="https://i.ibb.co/tKn1nrK/facebook.png" alt="" />
          <img src="https://i.ibb.co/Vvt0jkW/instagram.png" alt="" />
          <img src="https://i.ibb.co/wyy2YS8/twitter.png" alt="" />
          <img src="https://i.ibb.co/Q90fM58/linkedin.png" alt="" />
        </p>
      </footer>
    </div>
  </body>
</html>

    `,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        console.log("Email sent: " + info.response);
        resolve(info);
      }
    });
  });
}

module.exports = {
  sendWelcomeEmail,
};
