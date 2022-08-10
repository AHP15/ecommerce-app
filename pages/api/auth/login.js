import connectDB from "../../../db/connection";
import {createToken} from "../../../utils/user";
import bcrypt from "bcryptjs";
import cookie from "cookie";
import validateBody from "../../../utils/validateRequestBody";

export default async function handler(req, res){

    try{
        validateBody(req.body, ["address", "password"]);

        const DB = await connectDB();
        const User = DB.collection("users");
        const user = await User.findOne({address:req.body.address});

        if(!user){
            res.status(404).send({
                success:false,
                message:`User with ${req.body.address} not found`
            });
        }
        
        const isPasswordCorrect = bcrypt.compareSync(
            req.body.password, user.password
        );
        if(!isPasswordCorrect){
            res.status(400).send({
                success:false,
                message:"Invalid password"
            });
        }

        const token = createToken(user._id, user.role);
        res.setHeader("Set-Cookie",cookie.serialize("token",token, {
            httpOnly: true,
            maxAge:parseFloat(process.env.JWT_EXPIRE),
            secure:process.env.NODE_ENV !== "development",
            sameSite:"strict",
            path: "/",
        }));

        res.status(200).send({
            success: true,
            user:{
                ...user,
                password:null,
            }
        });

    }catch(err){
        console.log(err);
        res.status(500).send({
            success:false,
            message:err.message
        });
    }
}