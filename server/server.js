const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const passport = require('passport');
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require('cors');
const MongoStore = require('connect-mongo');
const session = require('express-session');

dotenv.config();

const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
const notifyRouter = require("./routes/notify");
const searchRouter = require("./routes/search");


const app = express();
// dotenv.config({ path: ".env" });
const port = process.env.PORT || 5000;

require('./config/passport');
console.log('Backend URL:', process.env.BACKEND_URL);
console.log('Callback URL:', `${process.env.BACKEND_URL}/users/auth/google/callback`);
// 验证环境变量是否正确加载
console.log('Google Client ID:', process.env.GOOGLE_CLIENT_ID ? '已设置' : '未设置');
console.log('Google Client Secret:', process.env.GOOGLE_CLIENT_SECRET ? '已设置' : '未设置');

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

// 配置会话
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_secret_key',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI
  }),
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// 初始化 Passport
app.use(passport.initialize());
app.use(passport.session());


app.use(express.static("./client/build"));

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
