const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require('cors');

const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
const notifyRouter = require("./routes/notify");
const searchRouter = require("./routes/search");

const app = express();
dotenv.config({ path: "./config.env" });
const port = process.env.PORT || 17000;
const whitelist = process.env.CORS_WHITELIST ? process.env.CORS_WHITELIST.split(',') : [];

mongoose.connect(process.env.MONGODB_URI, {
  dbName: process.env.MONGODB_NAME,
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use(express.static("./frontend/build"));

console.log("whitelist:", whitelist);
const whitelist = process.env.CORS_WHITELIST?.split(',').map(origin => origin.trim());

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.use(cors({
  origin: '*',
  methods: '*',
  credentials: true
}));

app.use("/users", userRouter);
app.use("/users/auth", authRouter);
app.use("/users/post", postRouter);
app.use("/users/notify", notifyRouter);
app.use("/users/search", searchRouter);

app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});
