import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import  configDotenv  from 'dotenv';
import connectDB from './utils/db.js';
const app = express();
configDotenv.config({});


//middleware;
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());//cookie-parser to handle cookies in requests
const corsOptions = {
    origin: 'http//localhost:5173',
    credentials: true
}
app.use(cors(corsOptions))
const PORT =process.env.PORT || 3000;
app.listen(PORT, ()=>{
    connectDB();
   console.log(`server has runing at port ${PORT}`);
});