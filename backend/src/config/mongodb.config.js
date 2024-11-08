import mongoose from "mongoose";

async function connectMongoDB() {
  try {
    // await mongoose.connect(process.env.MONGO_DB_URI);
    await mongoose.connect(
      "mongodb+srv://luvpnd:HjivRjisXLBWWViI@cluster0.pttacsj.mongodb.net/recepieColl?retryWrites=true&w=majority&appName=cluster0"
    );

    console.log("Application is connected with database");
  } catch (error) {
    console.log(error);
    throw new Error("Can't connect with database");
  }
}

export default connectMongoDB;
