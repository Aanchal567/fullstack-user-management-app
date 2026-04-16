const express = require('express');
const app = express();
const path = require('path');

// Model import
const userModel = require('./models/user');

// View engine
app.set("view engine", "ejs");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Home route
app.get('/', (req, res) => {
  res.render("index");
});

// Read all users
app.get('/read', async (req, res) => {
  try {
    const users = await userModel.find();
    res.render("read", { users });
  } catch (err) {
    console.log(err);
    res.send("Error fetching users");
  }
});

// Create user (DEBUG ADDED 🔥)
app.post('/create', async (req, res) => {
  console.log("FORM DATA:", req.body); // 👈 IMPORTANT DEBUG

  try {
    const { name, email, image } = req.body;

    // Check if empty
    if (!name || !email) {
      return res.send("Name and Email are required");
    }

    await userModel.create({ name, email, image });

    res.redirect('/read');
  } catch (err) {
    console.log("CREATE ERROR:", err);
    res.send("Error creating user");
  }
});

// Delete user
app.get('/delete/:id', async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    res.redirect('/read');
  } catch (err) {
    console.log(err);
    res.send("Error deleting user");
  }
});

// Edit user
app.get('/edit/:userid', async (req, res) => {
  try {
    const user = await userModel.findById(req.params.userid);
    res.render("edit", { user });
  } catch (err) {
    console.log(err);
    res.send("Error loading edit page");
  }
});

// Update user
app.post('/update/:userid', async (req, res) => {
  try {
    const { name, email, image } = req.body;

    await userModel.findByIdAndUpdate(
      req.params.userid,
      { name, email, image },
      { new: true }
    );

    res.redirect('/read');
  } catch (err) {
    console.log(err);
    res.send("Error updating user");
  }
});

// Server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});