
import authRoute from "./routes/auth.routes.js";
import userRoute from "./routes/user.route.js"
import postRoute from "./routes/post.route.js"

import express from "express";
import dotenv from "dotenv";
import connectMongoDB from "./db/connectMongoDB.js";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";


dotenv.config({});
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const app =express();
const PORT = process.env.PORT || 8000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/api/auth",authRoute);
app.use("/api/user",userRoute);
app.use("/api/posts",postRoute);


app.get("/",(req,res)=>{
    res.send("Sever is running");
})


app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
    connectMongoDB();
})