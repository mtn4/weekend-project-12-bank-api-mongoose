import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  passportID: {
    type: Number,
    unique: [true, "a user with this passport ID already exists"],
    dropDups: true,
    required: [true, "passport ID is required"],
    validate: {
      validator: (val) => val.toString().length === 9,
      message: `Passport ID must be 9 digits`,
    },
  },
  cash: {
    type: Number,
    default: 0,
  },
  credit: {
    type: Number,
    min: [0, "credit must be a positive amount"],
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

export { userSchema };
