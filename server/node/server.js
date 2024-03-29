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
// dotenv.config({path: "./config.env"});
const port = process.env.PORT || 5000;
const client_url = process.env.CLIENT_URL;

console.log("Frontend url: ", client_url);

mongoose.connect(process.env.MONGO, {
  dbName: `ani`,
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => {
  console.log("Backend Server Connected to MongoDB");
});

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const corsOptions = {
  origin: '*', // 如果前端服务名为client
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));


app.use(express.static("./client/build"));

<<<<<<< HEAD:server/node/server.js
=======
app.use(cors({
  origin: ["http://localhost:3000", "https://20.239.174.137"],
  methods: ["GET", "POST", "DELETE", "PUT", "UPDATE"],
  credentials: true
}));

>>>>>>> main:server/server.js
app.use("/users", userRouter);
app.use("/users/auth", authRouter);
app.use("/users/post", postRouter);
app.use("/users/notify", notifyRouter);
app.use("/users/search", searchRouter);

app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});
