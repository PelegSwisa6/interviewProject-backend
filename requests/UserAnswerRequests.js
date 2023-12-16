import express from "express";
import UserAnswer from "../models/UserAnswers.js";
import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();

router.use(requireAuth);

router.get("/get-user-answer/:idUser", async (req, res) => {
  const idUser = req.params.idUser;
  try {
    if (!idUser) {
      return res.status(400).json({ error: "idUser is required" });
    }
    const result = await UserAnswer.getAnswerById(idUser);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/update-user-answer", async (req, res) => {
  const { idUser, questionId, answer } = req.body;
  try {
    const updateAnswer = await UserAnswer.updateuseranswer(
      idUser,
      questionId,
      answer
    );

    res.status(201).json({ updateAnswer });
  } catch (error) {
    console.error("Error update user answer:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
export default router;
