import mongoose from 'mongoose';

class ConnectDb {
  constructor() {
    // Connect database
    const { MONGO_URL } = process.env;

    if (!MONGO_URL) {
      console.error('MongoDB URI is not provided in environment variables.');
      process.exit(1);
    }

    // Connect to MongoDB Atlas
    mongoose.connect(MONGO_URL + "?useNewUrlParser=true&useUnifiedTopology=true")
      .then(() => {
        console.log('Connected to MongoDB Atlas!');
      })
      .catch((error) => {
        console.error('Error connecting to MongoDB Atlas:', error);
        process.exit(1);
      });

    const db = mongoose.connection;

    // Event listeners for MongoDB connection
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open', () => {
      // You can start defining your models and interacting with the database here
    });
  }
}

export default ConnectDb;