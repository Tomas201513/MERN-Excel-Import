import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const dbConnect = async (): Promise<void> => {
  const connectionParams = { useNewUrlParser: true };
  await mongoose.connect("mongodb://localhost:27017/taskManager", connectionParams as object);

  mongoose.connection.on('connected', (): void => {
    console.log('Connected to database successfully');
});

  mongoose.connection.on('error', (err: Error): void => {
    console.log('Error while connecting to database: ' + err);
  });

  mongoose.connection.on('disconnected', (): void => {
    console.log('Mongodb connection disconnected');
  });
};

export default dbConnect;