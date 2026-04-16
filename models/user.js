const mongoose = require('mongoose');

// MongoDB Atlas connection
mongoose.connect("mongodb+srv://aanchal:123@cluster0.deaqzkf.mongodb.net/testapp1")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("Mongo Error:", err));

// Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  image: String
});

// Model
module.exports = mongoose.model("User", userSchema);