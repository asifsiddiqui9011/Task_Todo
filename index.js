const express = require("express");
require('dotenv').config();
const fs = require("fs");
const bodyParser = require("body-parser");
const taskRoutes = require('./routes/taskRoute');
const userRoutes = require('./routes/userRoute');

// Initialize Express app
const app = express();
app.use(bodyParser.json());

const SECRET_KEY = process.env.JWT_SECRETKEY
console.log(SECRET_KEY,"SECt")

//included Routes
app.use('/api',taskRoutes);
app.use('/api',userRoutes);


// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
