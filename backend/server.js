const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 3000;
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const quizRoutes = require("./routes/quizRoutes");
const cookieParser = require('cookie-parser');

connectDB();
const app = express();

const corsOptions = {
  origin: [
    "http://localhost:5173","https://quiz-app-155.vercel.app"
  ],
  "Access-Control-Allow-Origin": ["http://localhost:5173","https://quiz-app-155.vercel.app"],
  "Access-Control-Allow-Credentials": true,
  methods: "GET,POST,PUT,DELETE,PATCH",
  optionsSuccessStatus: 200,
  allowedHeaders: ["Content-Type", "Authorization","set-cookie"],
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

// Ensure your app handles preflight requests
app.options('*', cors(corsOptions));

app.get("/", (req, res) => {
  res.status(200).send({ message: "welcome to the quiz - api!" });
});

app.use(authRoutes);
app.use(quizRoutes);

app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});
