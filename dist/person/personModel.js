import mongoose, { Schema } from "mongoose";
// Define the Person interface extending Mongoose's Document
// Define the Group Schema
const personSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
}, {
    collection: 'people' // Specify collection name (optional, defaults to pluralized model name)
});
// Define the Group interface extending Mongoose's Document
export const Person = mongoose.model('Person', personSchema);
//# sourceMappingURL=personModel.js.map