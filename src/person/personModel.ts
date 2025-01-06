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
    groupID: {
      type: mongoose.Schema.Types.ObjectId, // Correct placement of groupID
      ref: 'Group', // Optionally reference the 'Group' collection
    }
  },
  {
    collection: 'people' // Specify collection name (optional, defaults to pluralized model name)
  }
);

  export interface IPerson extends Document {
    name: string;
    groupID: Types.ObjectId;
    _id: Types.ObjectId;
    
  }



// Define the Group interface extending Mongoose's Document

  export const Person = mongoose.model<IPerson>('Person', personSchema);

