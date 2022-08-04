import connectDB from "../../../db/connection";

export default async function handler(req, res){
    const DB = await connectDB();
    const collection = DB.collection("users");

    try{
        const user = await collection.find({address:req.body.address});

        if(!user){
            res.status(404).send({
                success:false,
                message:`User with ${req.body.address} not found`
            });
        }
        
        const isPasswordCorrect = false;
        if(!isPasswordCorrect){
            res.status(400).send({
                success:false,
                message:"Invalid password"
            });
        }

    }catch(err){
        console.log(err);
        res.status(500).send({
            success:false,
            message:err.message
        });
    }
}