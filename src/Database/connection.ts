import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI as string, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("Database is Connected Successfully");
  } catch (error) {
    console.log("Fail to connect DB", error as Error);
  }
};
export default connectDB;
