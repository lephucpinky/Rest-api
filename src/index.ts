require('dotenv').config();
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './router';


//connect database
const { MONGO_URL} = process.env;

if (!MONGO_URL) {
    console.error('MongoDB URI is not provided in environment variables.');
    process.exit(1);
}



// Connect to MongoDB Atlas
try {
  // Connect to the MongoDB cluster
  mongoose.connect(MONGO_URL + "?useNewUrlParser=true&useUnifiedTopology=true");
} catch (e) {
  console.log("could not connect");
}
// Get the default connection
const db = mongoose.connection;

// Event listeners for MongoDB connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB Atlas!');
  // You can start defining your models and interacting with the database here
});



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



app.use('/', router());

  
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});