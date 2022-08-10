import verifyToken from "../../../middleware/verifyToken";
import connectDB from "../../../db/connection";
import {ObjectId} from "mongodb";

async function handler(req, res){
    try {
        const DB = await connectDB();
        const User = DB.collection("users");
        const user = await User.findOne({_id:ObjectId(req.userId)});

        res.status(200).send({
            success:true,
            user:{...user, password:null}
        })
    }catch(err){
        res.status(500).send({
            success:false,
            message:err.message
        })
    }
}

export default verifyToken(handler);