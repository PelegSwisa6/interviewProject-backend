import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  questionId: {
    type: Number,
    unique: true,
  },
  question: {
    type: String,
    required: true,
  },
  options: [
    {
      option: {
        type: String,
        required: true,
      },
      isCorrect: {
        type: Boolean,
        required: true,
      },
    },
  ],
  topic: {
    type: String,
    required: true,
  },
});

async function getNextQuestionId() {
  const lastQuestion = await Quiz.findOne({}, {}, { sort: { questionId: -1 } });
  return lastQuestion ? lastQuestion.questionId + 1 : 1;
}

quizSchema.pre("save", async function (next) {
  if (!this.questionId) {
    this.questionId = await getNextQuestionId();
  }
  next();
});

quizSchema.statics.getquizs = async function () {
  const result = await this.find();
  return result;
};

quizSchema.statics.getQuizsByTopics = async function (topics) {
  try {
    const topicsArray = topics[0].split(",");
    const result = await this.find({ topic: { $in: topicsArray } });
    return result;
  } catch (err) {
    throw err;
  }
};

quizSchema.statics.addquiz = async function (question, options, topic) {
  const exists = await this.findOne({ question });
  if (exists) {
    throw Error("השאלה קיימת במערכת");
  }

  const newQuestion = new Quiz({
    question,
    options,
    topic,
  });
  await newQuestion.save();
  return newQuestion;
};

const Quiz = mongoose.model("Quiz", quizSchema);

export default Quiz;
