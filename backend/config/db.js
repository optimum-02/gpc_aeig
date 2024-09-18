const mongoose = require("mongoose");
const appConfig = require("./app_config");


const connectDB = async () => {
  try {
    await mongoose.connect(appConfig.mongoURI);
    console.log("Database connected successfully");
  } catch (error) {
    console.log(`Database connection error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

module.exports={connectDB};
