const express = require("express");
const dotenv = require("dotenv");
const app = express();
require("./models");
const roomRouter = require("./routes/roomRoutes");
const userRouter = require("./routes/userRoutes");

dotenv.config({
  path: "./config.env",
});

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.headers);
  next();
});

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });
app.use("/rooms", roomRouter);
app.use("/users", userRouter);

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

app.listen(3001, () => console.log("server is running in port 3001"));
