import mongoose from "mongoose";
import chalk from "chalk";

// MongoDB connection >>>>>>>>>>>>>>>>>>>>>>>>>>
const connectionDb = async () => {
  try {
    await mongoose.connect(process.env.URL);
    console.log(chalk.green("Successfully connected to MongoDB"));
  } catch (err) {
    console.log(
      chalk.bgWhite.red("Failed to connect to MongoDB:", err.message)
    );
  }
};

// MongoDB connection >>>>>>>>>>>>>>>>>>>>>>>>>>
export default connectionDb;
