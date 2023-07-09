import mongoose from "mongoose";

export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection
        connection.on('connected',()=>{
            console.log('MongoDb Connected Successfully')
        })  
        connection.on('error',(error)=>{
            console.log("Mongodb Connection Error"+error)
            process.exit()
        })
    } catch (error) {
            console.log("Something went wrong")
    }   
}