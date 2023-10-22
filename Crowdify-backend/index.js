const express = require('express');
const server = express();
const port = 8082;
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');

server.use(express.json());
dotenv.config();
mongoose.connect('mongodb://127.0.0.1:27017/phone', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const phoneSchema = new mongoose.Schema({
  email: String,
  otp: String,
  otpVerified: Boolean,
  otpExpiration: Date,
});

const Phone = mongoose.model('Phone', phoneSchema);

function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000).toString(); 
}


function sendEmail(email, otp) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: 'OTP for Verification',
    text: `Your OTP for verification is: ${otp}`,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        console.log('Email sent: ' + info.response);
        resolve();
      }
    });
  });
}

server.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  const otp = generateOTP();

  try {
    const phone = new Phone({
      email,
      otp,
      otpVerified: false,
      otpExpiration: new Date(new Date().getTime() + 2 * 60 * 1000 + 30 * 1000), // Set OTP expiration time to 2 minutes and 30 seconds
    });

    await phone.save();
    await sendEmail(email, otp);

    res.send('OTP sent to email and saved to the database.');
  } catch (error) {
    console.error('Error sending OTP via email: ' + error);
    res.status(500).send('Error sending OTP via email: ' + error);
  }
});

server.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  try {
    const phone = await Phone.findOne({ email, otp, otpVerified: false });

    if (!phone) {
      res.status(404).send('OTP not found or expired.');
      return;
    }

    const currentTime = new Date();
    if (currentTime > phone.otpExpiration) {
      res.status(400).send('OTP has expired.');
      return;
    }

    phone.otpVerified = true;
    await phone.save();

    res.send('OTP verified successfully.');
    console.log('OTP verified successfully.');
  } catch (error) {
    console.log('OTP not verified successfully.');
    console.error('Error verifying OTP: ' + error);
    res.status(500).send('Error verifying OTP: ' + error);
  }
});

server.listen(port, () => {
  console.log(`Server created on http://localhost:${port}`);
});
