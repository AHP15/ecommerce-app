import { ObjectId } from "mongodb";
import connectDB from "../../../../db/connection";
import verifyToken from "../../../../middleware/verifyToken";


async function handler(req, res){

    try{
        if(req.method === "POST"){
            console.log(req.body)
            const DB = await connectDB();
            const Product = DB.collection("products");

            const filter = {_id:ObjectId(req.body.id)}
            const updateDoc = {
                $set: {
                  reviews: req.body.reviews
                },
            };
            const product = await Product.updateOne(filter, updateDoc);

            res.status(201).send({
                success: true,
            })
        }
    }catch(err){
        console.log(err);
        res.status(500).send({
            success: false,
            message: err.message
        })
    }
}

export default verifyToken(handler);