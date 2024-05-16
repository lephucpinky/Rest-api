require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import ConnectDb from './utils/db';
import router from './router';


const app = express();
app.use(cors({
  credentials:true,
}))
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());



const port = process.env.PORT;

const connectServer = new ConnectDb();

app.use('/', router());
  
app.listen(port, () => {
    
    console.log(`[server]: Server is running at http://localhost:${port}`);
});