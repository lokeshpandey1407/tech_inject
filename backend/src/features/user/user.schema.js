import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, default: "", trim: true },
    username: { type: String, required: true, unique: true, trim: true },
    personalCollection: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" },
    ],
    password: { type: String, required: true },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
