const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  specialisation: { type: String, required: true },
  picture: { type: String, required: true },
  nameOfService: { type: String, required: true },
  city: { type: String, required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", PostSchema);
