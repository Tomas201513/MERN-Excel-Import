import mongoose from 'mongoose';
import { config } from 'dotenv';

config();

const dbConnect = async (): Promise<void> => {
  const connectionParams = { useNewUrlParser: true };
  await mongoose.connect(process.env.MONGO_URI as string, connectionParams as object);

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