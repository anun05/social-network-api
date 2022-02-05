const { connect, connection } = require("mongoose");

connect("mongodb://localhost/socialNetworkDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //useCreateIndex: true,
  //useFindAndModify: false,
});

module.exports = connection;
