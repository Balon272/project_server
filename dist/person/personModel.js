import mongoose, { Schema } from "mongoose";
// Define the Person schema
const personSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
}, {
    collection: 'people', // Optional: specify collection name explicitly
});
// Export the Person model
export const Person = mongoose.model('Person', personSchema);
//# sourceMappingURL=personModel.js.map