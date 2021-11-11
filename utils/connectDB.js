const mongoose = require("mongoose");
const connectDB = async () => {
  await mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      //console.log("Mongo Connected");
    })
    .catch((err) => {
      //console.log("MONGO ERROR");
    });
};
connectDB();
