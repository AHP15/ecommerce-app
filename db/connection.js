import { MongoClient } from "mongodb";

let isConnected = false;

async function connectDB(){
    const client = new MongoClient(process.env.uri);
    if(isConnected) {
        console.log("database already connected");
        return client.db("ecommerce-next");
    }

    try{
        await client.connect();
        isConnected = true;
        console.log("connected to database successfully");
    }catch(err){
        console.error(err);
    }
    
    return client.db("ecommerce-next");
}

export default connectDB;