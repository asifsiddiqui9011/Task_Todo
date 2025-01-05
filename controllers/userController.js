const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");





// JWT Secret Key
const SECRET_KEY = process.env.JWT_SECRETKEY; // Replace with a secure key

// Path to JSON file
const USERS_FILE = "./data/users.json";

// Helper to read users from file
const readUsers = () => {
  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify([]));
  }
  const data = fs.readFileSync(USERS_FILE);
  return JSON.parse(data);
};

// Helper to write users to file
const writeUsers = (users) => {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};

// Register a new user
exports.signup = async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({ message: "Email, username, and password are required" });
  }

  const users = readUsers();
  const existingUserByEmail = users.find((user) => user.email === email);
  const existingUserByUsername = users.find((user) => user.username === username);

  if (existingUserByEmail) {
    return res.status(400).json({ message: "Email already exists" });
  }

  if (existingUserByUsername) {
    return res.status(400).json({ message: "Username already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: users.length + 1, email, username, password: hashedPassword };
  users.push(newUser);
  writeUsers(users);

  // Generate JWT token for the new user
  const token = jwt.sign({ id: newUser.id, email: newUser.email, username: newUser.username }, SECRET_KEY, {
    expiresIn: "1h",
  });

  res.status(201).json({
    message: "User registered successfully",
    user:{username:newUser.username, email:newUser.email},
    token,

  });
};

// Login user and return JWT token
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const users = readUsers();
  const user = users.find((u) => u.email === email);

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign({ id: user.id, email: user.email, username: user.username }, SECRET_KEY, {
    expiresIn: "1h",
  });

  res.json({ message: "Login successful", token });
};




// Get user profile (authenticated)
exports.getUser =async(req, res) => {
  const users = readUsers();
  const user = await users.find((u) => u.id === req.user.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({ id: user.id, username: user.username, email:user.email });
};

