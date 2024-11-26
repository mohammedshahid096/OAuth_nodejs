const mongoose = require("mongoose");
const { DB_URL } = require("./index");

// TODO : function for database connection
const MongoDataBaseConn = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log(" database is connected");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = MongoDataBaseConn;
