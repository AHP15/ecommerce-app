
import connectDB from "../../../../db/connection";
import {GridFSBucket, ObjectId} from "mongodb";

export default async function handler(req, res){
    const {id} = req.query;

    try{

        const DB = await connectDB();
        const bucket = new GridFSBucket(DB, { bucketName: 'productImages' });
        bucket.openDownloadStream(ObjectId(id)).pipe(res);

    }catch(err){
        console.log(err);
        res.status(500).json({
            message: err.message,
        })
    }
}