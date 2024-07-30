import mongoose from "mongoose";

const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongodb connected sucessfully");
    } catch (error) {
        console.log("Mongodb connection failed, Please try again",error);
    }
}

export default connectDB;