import connectDB from "../../../db/connection";
import verifyToken from "../../../middleware/verifyToken";
import {uploadImages} from "../../../middleware/upload";
import { GridFSBucket , ObjectId} from "mongodb";

async function handler(req, res){
    const filesIds = [];
    try{
        const DB = await connectDB();
        const Product = DB.collection("products");
        
        const baseUrl = "/api/files/image/"
        const images = [];
        req.files.forEach(file =>{
            images.push({
                public_id:Math.random().toString(),
                url:`${baseUrl}${file.id}`
            });
            filesIds.push(file.id);
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
        });

        const bucket = new GridFSBucket(DB, { bucketName: 'productImages' });
        filesIds.forEach(id => bucket.delete(ObjectId(id)));
    }finally{
    }
}

export default verifyToken(uploadImages(handler), "admin");

export const config = {
    api: {
      bodyParser: false,
    },
}