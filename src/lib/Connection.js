import mongoose from "mongoose";

const connection={}

export default async function connectDB() {
    if(connection.isConnected){
        console.log("Database Already Connected");
        return;       
    }

    try {
       const db = await mongoose.connect("mongodb://localhost:27017/protees");
       connection.isConnected=db.connections[0].readyState
       console.log("Connected with host ",db.connection.host);
    } catch (error) {
        console.error("Error ",error)
        process.exit(1)
    }
}