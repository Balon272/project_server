import express from 'express';
import personRouter from './person/personRouter.js'
import groupRouter from './group/groupRouter.js'
import  { connect } from 'mongoose';
import cors from 'cors';
export const app = express();
app.listen(1107, () => {
    console.log('Server is listening on port: ', 1107);
});
app.use(cors({
  origin: 'http://localhost:5173', // frontend URL
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.on('error', e => console.error("Error", e));
app.use(express.json())
app.use('/handler', personRouter)
app.use('/handler', groupRouter)

export async function connectDB(): Promise<void> {
    try {
      await connect("mongodb://localhost:27017/project");
      console.log("Connected to MongoDB...");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    }
  }
  connectDB();