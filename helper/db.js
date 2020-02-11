const mongoose = require("mongoose");
const db = "mongodb+srv://ocansiz:osman123@cluster0-tsiwk.mongodb.net/movie-api-db";

module.exports = () => {
  mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });
  mongoose.connection.on("open", () => {
    console.log("MongoDB Connected movie-api-db");
  });
  mongoose.connection.on("error", err => {
    console.log("MongoDB Error movie-api-db", err);
  });
  mongoose.Promise = global.Promise;
};
