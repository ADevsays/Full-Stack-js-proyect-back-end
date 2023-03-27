import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB= async ()=>{
    try {
        const db = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        const url =  `${db.connection.host}:${db.connection.port}`;
        console.log(`Mongo db connected in ${url}`)
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectDB;