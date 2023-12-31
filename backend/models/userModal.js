import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

UserSchema.methods.matchPassword = async function (enteredPasswod) {
  return await bcrypt.compare(enteredPasswod, this.password);
};

const User = mongoose.model("User", UserSchema);
export default User;
