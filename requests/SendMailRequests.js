import nodemailer from "nodemailer";
import express from "express";
import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();
router.use(requireAuth);
router.post("/send-email", async (req, res) => {
  const {
    subject,
    question,
    oneOpt,
    twoOpt,
    threeOpt,
    fourOpt,
    numOfQuestion,
    problem,
  } = req.body;

  const questionHtml = `<h1>${question}</h1>
  <h2>${oneOpt}</h2>
  <h2>${twoOpt}</h2>
  <h2>${threeOpt}</h2>
  <h2>${fourOpt}</h2>`;

  const fixHtml = `<h1>${numOfQuestion}</h1>
  <h2>${problem}</h2>`;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure: true,
      auth: {
        user: process.env.user,
        pass: process.env.pass,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.user,
      to: process.env.toUser,
      subject: subject,
      html: subject === "question" ? questionHtml : fixHtml,
    });

    res.status(201).json({ message: "קיבלנו את הבקשה שלך, תודה רבה" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
export default router;
