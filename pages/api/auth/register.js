import connectDB from "../../../db/connection";

export default async function handler(req, res){
    //console.log(req.body)
    const DB = await connectDB();
    const collection = DB.collection("users");

    try{
        await collection.insertOne(req.body);
        res.status(201).json({
            success: true,
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}