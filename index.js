import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import UsersRequest from "./requests/UsersRequest.js";
import QuizRequest from "./requests/QuizRequests.js";
import UserAnswerRequests from "./requests/UserAnswerRequests.js";
import SendMailRequests from "./requests/SendMailRequests.js";
import "dotenv/config";

const app = express();

app.use(cors());
app.use(express.json());
const port = process.env.PORT;
const dbURI = process.env.MONGO_URI;

mongoose
  .connect(dbURI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

app.use("/api", UsersRequest);
app.use("/api", QuizRequest);
app.use("/api", UserAnswerRequests);
app.use("/api", SendMailRequests);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
