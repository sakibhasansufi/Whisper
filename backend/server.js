import express from "express";
import authRoute from "./routes/auth.routes.js";
import dotenv from "dotenv";
import connectMongoDB from "./db/connectMongoDB.js";


dotenv.config({});
const app =express();
const PORT = process.env.PORT || 8000;


app.use("/api/auth",authRoute);



app.get("/",(req,res)=>{
    res.send("Sever is running");
})


app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
    connectMongoDB();
})