import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a name"],
  },
  passportID: {
    type: Number,
    unique: [true, "User with the same passport ID already exists"],
    dropDups: true,
    required: [true, "Please enter a passport ID"],
    validate: {
      validator: (val) => val.toString().length === 9,
      message: `Passport ID length must be 9 digits`,
    },
  },
  cash: {
    type: Number,
    default: 0,
  },
  credit: {
    type: Number,
    min: [0, "Credit amount must be a postive number"],
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

export { userSchema };
