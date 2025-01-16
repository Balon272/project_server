import mongoose, { Schema, Document, Types } from "mongoose";

// Define the Person interface extending Mongoose's Document
export interface IPerson extends Document {
  _id: Types.ObjectId; // Explicitly defining _id as part of the interface
  name: string;
}

// Define the Person schema
const personSchema = new Schema<IPerson>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    collection: 'people', // Optional: specify collection name explicitly
  }
);

// Export the Person model
export const Person = mongoose.model<IPerson>('Person', personSchema);
