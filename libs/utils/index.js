import jwt from "jsonwebtoken";
import * as aligo from "../aligo";
import "../../src/env";
import nodemailer from "nodemailer";

export const generateSecretCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendSecretSMS = async (phoneNumber, secretCode) => {
  const Auth = {
    key: process.env.SMSKEY,
    user_id: process.env.SMSUSERID,
  };

  const req = {
    headers: {
      "content-type": "json",
    },
    body: {
      sender: "031-5186-6033",
      receiver: phoneNumber,
      msg: `안녕하세요 플랫큐브입니다 고객님의 비밀 번호는 ${secretCode} 입니다 `,
    },
  };
  try {
    const res = await aligo.send(req, Auth);
  } catch (err) {
    console.log(err);
  }
};

export const generateToken = (user) => jwt.sign(user, process.env.JWT_SECRET);

export const sendMail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    service: "worksmobile",
    host: "smtp.worksmobile.com",
    port: 587,
    auth: {
      user: process.env.TESTMAIL_ID,
      pass: process.env.TESTMAIL_PW,
    },
  });
  const option = {
    from: process.env.TESTMAIL_ID,
    to: to,
    subject: subject,
    text: html,
    html: html,
  };

  const info = await transporter.sendMail(option);

  return info;
};
