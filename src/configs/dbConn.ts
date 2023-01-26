import mongoose from "mongoose";

async function connectDB(){
  try{
    mongoose.set('strictQuery', false);

    await mongoose.connect(process.env.DATABASE_URI);
  }catch(error){
    console.error(error);
  }
}

export { connectDB }