const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    description: { type: String, default:"Hey There i am using Social media"},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", UserSchema);
