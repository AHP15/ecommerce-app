
import connectDB from "../../../../db/connection";
import {GridFSBucket, ObjectId} from "mongodb";
import Cors from 'cors'


const cors = Cors({
  methods: ['GET'],
  origin:"*",
});
function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
      fn(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result)
        }
  
        return resolve(result)
      })
    })
  }

export default async function handler(req, res){
    const {id} = req.query;
    console.log(req.headers);

    try{
        await runMiddleware(req, res, cors);
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