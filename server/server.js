const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require('cors');
const https = require('https');
const fs = require('fs');

const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
const notifyRouter = require("./routes/notify");
const searchRouter = require("./routes/search");

const app = express();
dotenv.config({path: "./config.env"});
const port = process.env.PORT || 5000;

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
app.use(cors());

app.use(express.static("./client/build"));

app.use("/users", userRouter);
app.use("/users/auth", authRouter);
app.use("/users/post", postRouter);
app.use("/users/notify", notifyRouter);
app.use("/search", searchRouter);

const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/aniani.cfd/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/aniani.cfd/fullchain.pem')
};

https.createServer(options, app).listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});
