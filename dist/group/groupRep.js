var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Group } from './groupModel.js';
//Group = {"name": "abc", "subgroups": "[]", "people": "[]", groupID:}
export function dbCreateGroup(groupData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const group = new Group(groupData);
            yield group.save();
        }
        catch (error) {
            console.error("Error creating group in rep:", error);
            throw new Error("Failed to create group");
        }
    });
}
export function dbSearchGroup(groupData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield Group.find(groupData);
        }
        catch (error) {
            console.error("Error finding group in rep:", error);
            throw new Error("Failed to create group");
        }
    });
}
export function dbRemoveGroup(groupData) {
    return __awaiter(this, void 0, void 0, function* () {
        // remove only by ID
        try {
            yield Group.deleteOne(groupData);
        }
        catch (error) {
            console.error("Error deleting group in rep:", error);
            throw new Error("Failed to create group");
        }
    });
}
export function dbUpdateGroup(groupData) {
    return __awaiter(this, void 0, void 0, function* () {
        const { _id, updateFields } = groupData;
        try {
            const updatedGroup = yield Group.findByIdAndUpdate(_id, { $set: updateFields }, { new: true, runValidators: true });
            if (!updatedGroup) {
                console.log("Group not found");
                return "Group not found"; // Return a fail message
            }
            console.log("Group updated successfully:", updatedGroup);
            return updatedGroup; // Return the updated group
        }
        catch (error) {
            console.error("Error updating group:", error, _id);
            throw error; // Rethrow the error to let the caller handle it
        }
    });
}
//# sourceMappingURL=groupRep.js.map