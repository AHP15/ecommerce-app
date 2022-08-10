import connectDB from "../../../db/connection";
import verifyToken from "../../../middleware/verifyToken";
import {uploadImages} from "../../../middleware/upload";
import { GridFSBucket } from "mongodb";
import fs from "fs";

async function handler(req, res){
    try{
        const DB = await connectDB();
        const Product = DB.collection("products");

        const bucket = new GridFSBucket(DB, { bucketName: 'productImages' });
        
        const baseUrl = "http://localhost:3000/api/files/image/"
        const images = [];
        req.files.forEach(file =>{
            const image = bucket.openUploadStream(file, {
                chunkSizeBytes: 1048576,
            });
            fs.createReadStream(`./files/${file.filename}`).pipe(image);
            images.push({
                public_id:Math.random().toString(),
                url:baseUrl+image.id
            });
        });

        if(req.method === 'POST'){

            const data = {
                ...req.body,
                nemOfReviews:0,
                reviews:[],
                user:req.userId,
                createAt:Date.now(),
                images,
            };

            const product = await Product.insertOne(data);
            return res.status(201).send({
                success: true,
                product
            })
        }
        if(req.method === 'PUT'){
        
        }
        if(req.method === 'DELETE'){
        
        }
    }catch(err){
        console.log(err);
        res.status(500).send({
            success:false,
            message: err.message
        })
    }finally{
        req.files.forEach(file =>{
            fs.unlink(`./files/${file.filename}`, err => console.log(err))
        });
    }
}

export default verifyToken(uploadImages(handler), "admin");

export const config = {
    api: {
      bodyParser: false,
    },
}