import mongoose, { Schema, Document, Types } from "mongoose";


// Define the Person interface extending Mongoose's Document


// Define the Group Schema



const personSchema = new Schema<IPerson>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    collection: 'people' // Specify collection name (optional, defaults to pluralized model name)
  }
);

  export interface IPerson extends Document {
    name: string;
    _id: Types.ObjectId;
  }



// Define the Group interface extending Mongoose's Document

  export const Person = mongoose.model<IPerson>('Person', personSchema);

