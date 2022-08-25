import multer from "multer";
import util from "util";
import {GridFsStorage} from "multer-gridfs-storage";
import connectDB from "../db/connection";



const storagePhoto = new GridFsStorage({
    db: connectDB(),
    options: {useNewUrlParser: true, useUnifiedTopology: true},
    file: (req, file) =>{
        const match = ["image/png", "image/jpeg"];

        if (match.indexOf(file.mimetype) === -1) {
            const filename = `${Date.now()}-user-${file.originalname}`;
            return filename;
        }

        return {
           bucketName: "profilePhotos",
           filename: `${Date.now()}-user-${file.originalname}`
        };
    }
});
const uploadFile = multer({storage:storagePhoto}).single("avatar");
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




const storageImage = new GridFsStorage({
    db: connectDB(),
    options: {useNewUrlParser: true, useUnifiedTopology: true},
    file: (req, file) =>{
        const match = ["image/png", "image/jpeg"];

        if (match.indexOf(file.mimetype) === -1) {
            const filename = `${Date.now()}-product-${file.originalname}`;
            return filename;
        }

        return {
           bucketName: "productImages",
           filename: `${Date.now()}-product-${file.originalname}`
        };
    }
});
const uploadFiles = multer({ storage:storageImage }).array("images", 12);
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
