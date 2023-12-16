import mongoose from "mongoose";

const userAnswerSchema = new mongoose.Schema({
  idUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
    required: true,
  },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
    required: true,
  },
  numOfAnswers: {
    type: Number,
    required: true,
  },
  lastAnswer: {
    type: Boolean,
    required: true,
  },
});

userAnswerSchema.statics.getAnswerById = async function (idUser) {
  try {
    const result = await this.find({ idUser: idUser });
    return result;
  } catch (err) {
    throw err;
  }
};

userAnswerSchema.statics.updateuseranswer = async function (
  idUser,
  questionId,
  answer
) {
  try {
    const existingAnswer = await this.findOne({ idUser, questionId });

    if (existingAnswer) {
      // Update existing answer
      if (answer == true && existingAnswer.numOfAnswers < 8) {
        existingAnswer.numOfAnswers += 1;
      } else if (existingAnswer.numOfAnswers > 0) {
        existingAnswer.numOfAnswers -= 1;
      } else if (existingAnswer.numOfAnswers >= 8) {
        existingAnswer.numOfAnswers -= 1;
      }
      existingAnswer.lastAnswer = answer;
      await existingAnswer.save();
      return existingAnswer;
    } else {
      // Create new answer
      const newAnswer = new UserAnswer({
        idUser,
        questionId,
        numOfAnswers: 1,
        lastAnswer: answer,
      });
      await newAnswer.save();
      return newAnswer;
    }
  } catch (err) {
    throw err;
  }
};

const UserAnswer = mongoose.model("UserAnswer", userAnswerSchema);

export default UserAnswer;
