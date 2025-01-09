import mongoose, { Schema, Document, Types } from "mongoose";


const groupSchema = new Schema<IGroup>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    subgroups: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group", // Self-reference for nested groups
      },
    ],
    people: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Person", // Reference to the Person collection
      },
    ],
  },
  {
    collection: "groups", // Specify collection name explicitly if needed
  }
);


export interface IGroup extends Document {
  name: string;
  subgroups: Types.ObjectId[];
  people: Types.ObjectId[];
}

export const Group = mongoose.model<IGroup>('Group', groupSchema);