import jwt from "jsonwebtoken";

export function createToken(id, role){
    return jwt.sign({id,role}, process.env.JWT_SECRET, {
        expiresIn: parseFloat(process.env.JWT_EXPIRE)
    });
}
