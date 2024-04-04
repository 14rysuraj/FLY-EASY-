
import mongoose from "mongoose";


export const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName:"FlyEasy",
    }).then(() => {
        console.log("Database Connected");
    }).catch(err => console.error(err));
}