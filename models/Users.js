import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });

  if (!user) {
    throw Error("אנא בדוק את כתובת האימייל");
  }
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("הסיסמה לא נכונה");
  }

  return user;
};

UserSchema.statics.getusers = async function () {
  const result = await UserModel.find({});
  return result;
};

UserSchema.statics.signup = async function (name, lastname, email, password) {
  const exists = await this.findOne({ email });
  if (!name || !lastname || !email || !password) {
    throw new Error("אנא ודא שמילאת את כל הפרטים");
  }
  if (exists) {
    throw Error("האימייל קיים במערכת");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ name, lastname, email, password: hash });

  return user;
};

const UserModel = mongoose.model("users", UserSchema);

export default UserModel;
