const mongoose = require('mongoose');

// MongoDB Atlas connection
mongoose.connect("mongodb+srv://aanchal:123@cluster0.deaqzkf.mongodb.net/testapp1?retryWrites=true&w=majority")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));
// Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  image: String
});

// Model
module.exports = mongoose.model("User", userSchema);