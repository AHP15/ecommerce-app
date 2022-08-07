import connectDB from "../../../db/connection";
import verifyToken from "../../../middleware/verifyToken";

async function handler(req, res){
    try{
        const DB = await connectDB();
        const Product = DB.collection("products");
        if(req.method === 'POST'){
            const product = await Product.insertOne(req.body);
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

    }
}

export default verifyToken(req, res, handler, "admin");