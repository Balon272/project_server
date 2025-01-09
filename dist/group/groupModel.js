import mongoose, { Schema } from "mongoose";
const groupSchema = new Schema({
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
}, {
    collection: "groups", // Specify collection name explicitly if needed
});
export const Group = mongoose.model('Group', groupSchema);
//# sourceMappingURL=groupModel.js.map