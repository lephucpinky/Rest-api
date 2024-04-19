require('dotenv').config();
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import ConnectDb from './utils/db';
import router from './router';
import { isAuthenticated } from './middleware';


const app = express();
app.use(cors({
  credentials:true,
}))
app.use(cookieParser());
app.use(bodyParser.json());



const port = process.env.PORT;
app.get('/', (req:Request, res:Response) => {
    res.send('Express + TypeScript Server');
});
app.get('/profile', isAuthenticated, (req, res) => {
  res.send(req.user);
});


const connectServer = new ConnectDb();



app.use('/', router());
  
app.listen(port, () => {
    
    console.log(`[server]: Server is running at http://localhost:${port}`);
});