import connectDB from "../../../db/connection";
import {GridFSBucket} from "mongodb";
import {uploadPhoto} from "../../../middleware/upload";
import fs from "fs";
import validateBody from "../../../utils/validateRequestBody";
import { createToken } from "../../../utils/user";
import bcrypt from "bcryptjs";
import cookie from "cookie";

async function handler(req, res){
    try{
        console.log(req.body)
        validateBody(req.body, ["name","address", "password"]);

        const DB = await connectDB();
        const User = DB.collection("users");
    
        const bucket = new GridFSBucket(DB, { bucketName: 'profilePhotos' });
        const file = bucket.openUploadStream(req.file.originalname, {
            chunkSizeBytes: 1048576,
        })
        fs.createReadStream(`./files/${req.file.filename}`).pipe(file);
        
        const baseUrl = "https://ecommerce-pupldw8ht-abdessittir.vercel.app/api/files/profile"
        const data = {
            ...req.body,
            password: bcrypt.hashSync(req.body.password, 10),
            role:"admin",
            photo:`${baseUrl}/${file.id}`
        };
        const user = await User.insertOne(data);

        const token = createToken(user._id, user.role);
        res.setHeader("Set-Cookie",cookie.serialize("token",token, {
            httpOnly: true,
            maxAge:parseFloat(process.env.JWT_EXPIRE),
            secure:process.env.NODE_ENV !== "development",
            sameSite:"strict",
            path: "/",
        }));
    
        res.status(201).json({
           success: true,
           user:{
            ...data,
            password:null,
            id:user.insertedId
           }
        });

        fs.unlink(`./files/${req.file.filename}`, err => console.log(err))

    }catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}

export default uploadPhoto(handler);

export const config = {
    api: {
      bodyParser: false,
    },
}
