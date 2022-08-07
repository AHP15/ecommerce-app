
export default function validateBody(body, bodyFeilds) {
    bodyFeilds.forEach(feild => {
        if(!body[feild]){
            throw new Error(`${feild} is required`);
        }
    });

    if(body.password && body.password.length < 6){
        throw new Error("password must be at least 6 characters")
    }
}