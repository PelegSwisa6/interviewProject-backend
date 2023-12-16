import express from "express";
import UserModel from "../models/Users.js";
import jwt from "jsonwebtoken";
import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();

// router.use(requireAuth);

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

router.get("/getUsers", async (req, res) => {
  try {
    const result = await UserModel.getusers();
    res.status(200).json(result);
  } catch (err) {
    res.json(err);
  }
});

router.post("/createUser", async (req, res) => {
  const { name, lastname, email, password } = req.body;
  try {
    const user = await UserModel.signup(name, lastname, email, password);

    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/loginUser", async (req, res) => {
  const { email, password } = req.query;
  try {
    const user = await UserModel.login(email, password);

    const token = createToken(user._id);
    res.status(200).json({ email, token, id: user._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
