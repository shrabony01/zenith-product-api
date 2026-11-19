//importing node:dns
import dns from "node:dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

//importing mongoose 
import mongoose from "mongoose";

//async function to connect our express server to mongodb
const connectDB= async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Successfully connected to MongoDB Atlas (zenith-products)!");
    }catch(error){
        console.log("MongoDB connection failed:", error.message);
        process.exit(1);
    }
};
export default connectDB;