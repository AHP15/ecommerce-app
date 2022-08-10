import jwt from 'jsonwebtoken';

const verifyToken = (handler, role) =>(req, res) =>{
    //console.log("in verify token")
    const { token } = req.cookies;

    if(!token){
        return res.status(403).send({
            success: false,
            message: "No token is provided!!",
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err){
            console.log(err);
            return res.status(401).send({
                    success: false,
                    message: err.message
            });
        }

        req.userId = decoded.id;
        req.role = decoded.role;
    });

    if(role && req.role !== role){
        return res.status(403).send({
            success:false,
            message:`role ${role} required`
        });
    }

    return handler(req, res);
}

export default verifyToken;