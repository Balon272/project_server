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
            const createdGroup = yield group.save();
            return createdGroup;
        }
        catch (error) {
            console.error("Error creating group in rep:", error);
            throw new Error("Failed to create group");
        }
    });
}
export function dbSearchGroup(_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield Group.findById(_id);
        }
        catch (error) {
            console.error("Error finding group in rep:", error);
            throw new Error("Failed to find group");
        }
    });
}
export function dbRemoveGroup(_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield Group.findByIdAndDelete(_id);
        }
        catch (error) {
            console.error("Error deleting group in rep:", error);
            throw new Error("Failed to remove group");
        }
    });
}
export function dbUpdateGroup(_id, updateFields) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updateObj = {};
            // Set name and groupID fields
            if (updateFields.name) {
                updateObj.name = updateFields.name;
            }
            // Push to people and subgroups arrays
            if (updateFields.people && updateFields.people.length > 0) {
                updateObj.$push = updateObj.$push || {};
                updateObj.$push.people = { $each: updateFields.people };
            }
            if (updateFields.subgroups && updateFields.subgroups.length > 0) {
                updateObj.$push = updateObj.$push || {};
                updateObj.$push.subgroups = { $each: updateFields.subgroups };
            }
            const updatedGroup = yield Group.findByIdAndUpdate(_id, updateObj, { new: true, runValidators: true } // Return the updated document and run validators
            );
            if (!updatedGroup) {
                console.log("Group not found");
                return "Group not found"; // Return a failure message if the group doesn't exist
            }
            console.log("Group updated successfully:", updatedGroup);
            return updatedGroup;
        }
        catch (error) {
            console.error("Error updating group:", error, _id);
            throw error; // Rethrow the error for the caller to handle
        }
    });
}
export function fetchAllGroups() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield Group.find({});
    });
}
//# sourceMappingURL=groupRep.js.map