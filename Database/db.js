const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      `mongodb+srv://waliasarthak0009:${process.env.DB_PASSWORD}@moneymindercluster.jy1kuxp.mongodb.net/?retryWrites=true&w=majority`
    );
    // console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
