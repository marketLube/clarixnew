import mongoose from "mongoose";
import dns from 'dns';

export const connectDatabase = async () => {
  try {
    // Force custom DNS resolution to bypass local network blocking
    dns.setServers(['8.8.8.8', '8.8.4.4']);

    const conn = await mongoose.connect(process.env.MONGO_URI as string);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    mongoose.connection.on('error', (err: any) => {
      console.error(`❌ MongoDB connection error: ${err}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️  MongoDB disconnected');
    });


    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('🔌 MongoDB connection closed due to app termination');
      process.exit(0);
    });

    return conn;
  } catch (error: any) {
    console.error(`❌ Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

