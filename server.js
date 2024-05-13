const express = require("express");
const errorHandler = require("./Middleware/errorHandler");
const DbConnect = require("./config/DBConnection");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

const directory = path.join(__dirname, "/uploads");
if (!fs.existsSync(directory)) {
  try {
    fs.mkdirSync(directory, { recursive: true });
  } catch (error) {
    console.log(error);
  }
}


app.use(
  cors({
    origin:
      process.env.OriginRoute || "https://wjslikenewswebsite.netlify.app/",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
    optionSuccessStatus: 200,
  })
);

// CORS configuration using custom middleware
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    process.env.OriginRoute || "https://wjslikenewswebsite.netlify.app"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

//Error middleware
app.use(errorHandler);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//userRoute
app.use("/", require("./Routes/homeRoute"));
app.use("/api/users", require("./Routes/UserRoutes/registerRoute"));
app.use("/api/users", require("./Routes/UserRoutes/loginRoute"));
app.use("/api/users", require("./Routes/UserRoutes/logoutRoute"));
app.use("/api/users", require("./Routes/UserRoutes/forgetPasswordRoute"));
app.use("/api/users", require("./Routes/UserRoutes/resetPasswordRoute"));
app.use("/api/users", require("./Routes/UserRoutes/logInStatusRoute"));
app.use("/api/users", require("./Routes/UserRoutes/getUserDetailsRoute"));
app.use("/api/users", require("./Routes/UserRoutes/getAllUserRoute"));
app.use("/api/users", require("./Routes/UserRoutes/updateUserRoute"));
app.use("/api/users", require("./Routes/UserRoutes/getUserRoleRoute"));
app.use("/api/users", require("./Routes/UserRoutes/userUpdateRoute"));
app.use("/api/users", require("./Routes/UserRoutes/deleteUserRoute"));
app.use("/api/users", require("./Routes/UserRoutes/getSingleUserRoute"));
app.use("/api/users", require("./Routes/UserRoutes/updateUserAccessStatus"));
app.use("/api/users", require("./Routes/UserRoutes/getUserLayoutRoute"));
app.use("/api/users", require("./Routes/UserRoutes/updateUserLayoutRoute"));
//subscription
app.use(
  "/api/users",
  require("./Routes/userSubscriptionRoute/userSubscriptionRoute")
);
app.use(
  "/api/users",
  require("./Routes/userSubscriptionRoute/getSubscriptionDetails")
);
app.use(
  "/api/users",
  require("./Routes/userSubscriptionRoute/getUserSubscription")
);
//newsRoutes
app.use("/api/news", require("./Routes/NewsRoutes/publishNewsRoute"));
app.use("/api/news", require("./Routes/NewsRoutes/editNewsRoute"));
app.use("/api/news", require("./Routes/NewsRoutes/deleteNewsRoute"));
app.use("/api/news", require("./Routes/NewsRoutes/getUserNewsRoute"));
app.use("/api/news", require("./Routes/NewsRoutes/getSingleNews"));
app.use("/api/news", require("./Routes/NewsRoutes/getAllNewsRoute"));
app.use("/api/news", require("./Routes/NewsRoutes/publishNewsStatusRoute"));
//categories
app.use("/api/news", require("./Routes/CategoryRoutes/getAllCategoriesRoute"));
app.use("/api/news", require("./Routes/CategoryRoutes/addCategoryRoute"));
app.use("/api/news", require("./Routes/CategoryRoutes/deleteCategoryRoute"));
app.use("/api/news", require("./Routes/CategoryRoutes/getNewsByCategoryRoute"));
//contact
app.use("/api/feedBack", require("./Routes/FeedBackRoutes/sendFeedBackRoute"));
app.use(
  "/api/feedBack",
  require("./Routes/FeedBackRoutes/getAllFeedBackRoute")
);

DbConnect();
app.listen(PORT, () => {
  console.log("server is running on port " + 5000);
});
