import multer from "multer";
import util from "util";


const uploadFile = multer({dest:"files"}).single("avatar");
export const uploadPhoto =  (handler) => async (req, res) =>{

    try{
        await util.promisify(uploadFile)(req,res);
    }catch(err){
        console.log(err);
        return res.status(500).send({
            success: false,
            message: err.message
        });
    }

    return handler(req, res);
}

const storage = multer.memoryStorage();
const uploadFiles = multer({storage: storage}).array("images", 12);
export const uploadImages = (handler) => async (req, res) => {
    try{
        await util.promisify(uploadFiles)(req,res);
    }catch(err){
        console.log(err);
        return res.status(500).send({
            success: false,
            message: err.message
        });
    }

    return handler(req, res);
}
