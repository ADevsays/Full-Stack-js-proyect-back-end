import express  from "express";
import connectDB from "./config/db.js";
import veterinaryRoutes from "./routes/veterinaryRoutes.js";
import pacientRoutes from "./routes/pacientRoutes.js";
import cors from 'cors';

const app = express();
app.use(express.json());
connectDB();

const domainAllow = ['http://localhost:5173'];

const corsOptions = {
    origin: (origin, cb)=>{
        if(domainAllow.includes(origin)){
            cb(null, true);
        }else{
            cb(new Error("Your domain isn't allow"))
        }
    }
}

app.use(cors(corsOptions));


app.use('/api/veterinarios', veterinaryRoutes);
app.use('/api/pacientes', pacientRoutes);

const port = process.env.PORT || 4000;

app.listen(port, ()=>{
    console.log('Server start in 4000 port');
});