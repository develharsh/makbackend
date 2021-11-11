const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
require("dotenv").config({ path: "config/.env" });
//const cloudinary = require("cloudinary");
//const path = require("path");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(fileUpload());
app.use(cookieParser());
const corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

//Router Imports
app.use("/api/v1/team", require("./routes/teamRoute.js"));
app.use("/api/v1/client", require("./routes/clientRoute.js"));
app.use("/api/v1/common", require("./routes/commonRoute.js"));
app.use("/api/v1/service", require("./routes/serviceRoute.js"));
app.use("/api/v1/partner", require("./routes/partnerRoute.js"));

require("./utils/connectDB");

const FINAL_PORT = process.env.PORT || 5000;
app.listen(FINAL_PORT, () => {
  //console.log(`Server running ${FINAL_PORT}`);
});
