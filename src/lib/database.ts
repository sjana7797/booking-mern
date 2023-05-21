import mongoose from "mongoose";
import { env } from "./env";

export const connectDb = async () => {
  try {
    await mongoose.connect(env.MONGO_URI);
  } catch (error) {
    console.error(error);
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose connection disconnected");
});

mongoose.connection.on("connected", () => {
  console.log("Mongoose connection connected");
});
