import multer from "multer";
import util from "util";


const uploadFile = multer({dest:"files"}).single("avatar");

export const uploadPhoto =  (handler) => async (req, res) =>{

    try{
        await util.promisify(uploadFile)(req,res);
    }catch(err){
        console.log(err);
        res.status(500).send({
            success: false,
            message: err.message
        });
    }

    return handler(req, res);
}