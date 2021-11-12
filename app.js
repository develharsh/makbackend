const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
require("dotenv").config({ path: "config/.env" });
//const cloudinary = require("cloudinary");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(fileUpload());
app.use(cookieParser());

//Router Imports
app.use("/t", function (req, res, next) {
  res.status(200).json({ status: "200 OK Backend is here." });
});
app.use("/api/v1/team", cors(), require("./routes/teamRoute.js"));
app.use("/api/v1/client", cors(), require("./routes/clientRoute.js"));
app.use("/api/v1/common", cors(), require("./routes/commonRoute.js"));
app.use("/api/v1/service", cors(), require("./routes/serviceRoute.js"));
app.use("/api/v1/partner", cors(), require("./routes/partnerRoute.js"));

// //Frontend
// app.use(express.static(path.join(__dirname, "./client/build")));
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "./client/build/index.html"));
// });

require("./utils/connectDB");

const FINAL_PORT = process.env.PORT || 5000;
app.listen(FINAL_PORT, () => {
  //console.log(`Server running ${FINAL_PORT}`);
});
