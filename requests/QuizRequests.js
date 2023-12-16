import express from "express";
import Quiz from "../models/QuizQuestions.js";
import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();

router.use(requireAuth);

router.get("/get-Quizs", async (req, res) => {
  try {
    const result = await Quiz.getquizs();
    res.status(200).json(result);
  } catch (err) {
    res.json(err);
  }
});

router.get("/get-Quizs-topic", async (req, res) => {
  try {
    const { topics } = req.query;

    if (!topics) {
      return res.status(400).json({ error: "Topics parameter is required" });
    }
    const topicsArray = Array.isArray(topics) ? topics : [topics];
    const result = await Quiz.getQuizsByTopics(topicsArray);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/add-question", async (req, res) => {
  const { question, options, topic } = req.body;
  try {
    const newQuestion = await Quiz.addquiz(question, options, topic);

    res.status(201).json({ newQuestion });
  } catch (error) {
    console.error("Error adding question:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
