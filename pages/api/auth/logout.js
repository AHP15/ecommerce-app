
export default async function handler(req, res){
    try{
        if(req.method === 'GET'){
            res.setHeader(
                "Set-Cookie",
                'token=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
            );

            res.status(200).send({
                success: true,
                message: "Logged out"
            });
        }
    }catch(err){
        console.log(err);
        res.status(500).send({
            success: false,
            message: err.message
        })
    }
}