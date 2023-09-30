import mongoose from "mongoose";
export function initMongoose() {
  mongoose.connect(process.env.MONGODB_URL);
}
