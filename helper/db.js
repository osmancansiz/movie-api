const mongoose = require("mongoose");
const db = "mongodb://ocansiz:osman123@cluster0-shard-00-00-tsiwk.mongodb.net:27017,cluster0-shard-00-01-tsiwk.mongodb.net:27017,cluster0-shard-00-02-tsiwk.mongodb.net:27017/movie-api-db?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority";

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

// mongodb://ocansiz:osman123@cluster0-shard-00-00-tsiwk.mongodb.net:27017,cluster0-shard-00-01-tsiwk.mongodb.net:27017,cluster0-shard-00-02-tsiwk.mongodb.net:27017/movie-api-db?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority

//mongodb+srv://ocansiz:osman123@cluster0-tsiwk.mongodb.net/test?retryWrites=true&w=majority
