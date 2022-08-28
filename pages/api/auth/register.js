import connectDB from "../../../db/connection";
import {GridFSBucket, ObjectId} from "mongodb";
import {uploadPhoto} from "../../../middleware/upload";
import fs from "fs";
import validateBody from "../../../utils/validateRequestBody";
import { createToken } from "../../../utils/user";
import bcrypt from "bcryptjs";
import cookie from "cookie";

async function handler(req, res){

    const fileId = req.file.id;
    try{
        console.log(req.body)
        validateBody(req.body, ["name","address", "password"]);

        const DB = await connectDB();
        const User = DB.collection("users");
        
        const baseUrl = "/api/files/profile"
        const data = {
            ...req.body,
            password: bcrypt.hashSync(req.body.password, 10),
            role:"admin",
            photo:`${baseUrl}/${fileId}`
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


    }catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message: err.message,
        });
        const bucket = new GridFSBucket(DB, { bucketName: 'profilePhotos' });
        bucket.delete(ObjectId(fileId))
    }
}

export default uploadPhoto(handler);

export const config = {
    api: {
      bodyParser: false,
    },
}
