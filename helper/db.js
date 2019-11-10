const mongoose = require("mongoose");
const db = "mongodb://127.0.0.1:27017/movie-api-db";

module.exports = () => {
  mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connection.on("open", () => {
    console.log("MongoDB Connected movie-api-db");
  });
  mongoose.connection.on("error", err => {
    console.log("MongoDB Error movie-api-db", err);
  });

  mongoose.Promise = global.Promise;
};
