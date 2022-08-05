import connectDB from "../../../db/connection";

export default async function handler(req, res){
    try{
        const DB = await connectDB();
        const collection = DB.collection("users");
        await collection.insertOne(req.body);
        res.status(201).json({
            success: true,
            user:req.body
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}