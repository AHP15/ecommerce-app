import { MongoClient } from "mongodb";

const isConnected = false;

async function connectDB(){
    const client = new MongoClient(process.env.uri);
    if(isConnected) return client.db("ecommerce-next");

    try{
        await client.connect();
        console.log("connected to database successfully");
    }catch(err){
        console.error(err);
    }
    
    return client.db("ecommerce-next");
}

export default connectDB;