import mongoose from "mongoose";

export async function connectDb(uri: string): Promise<void> {
  mongoose.set("strictQuery", true);
  // Fail fast so a serverless function can answer with an error before it times out.
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
}

export async function disconnectDb(): Promise<void> {
  await mongoose.disconnect();
}
