var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { dbCreateGroup, dbSearchGroup, dbRemoveGroup, dbUpdateGroup } from "./groupRep.js";
export function manCreateGroup(groupData) {
    return __awaiter(this, void 0, void 0, function* () {
        // Validate the person's name
        try {
            if (groupData.name && groupData.name.length <= 1) {
                throw new Error('Name must be longer than 1 character');
            }
            const createdGroup = yield dbCreateGroup(groupData);
            if (createdGroup.groupID) {
                const result = {
                    groupID: createdGroup.groupID,
                    _id: createdGroup._id
                };
                if (yield isGroupOwnFather(result)) {
                    const updateGroupinGroupJSON = {
                        _id: groupData.groupID,
                        updateFields: {
                            subgroups: [createdGroup._id],
                        },
                    };
                    yield manUpdateGroup(updateGroupinGroupJSON);
                }
            }
            return { message: 'Person created successfully', person: createdGroup };
        }
        catch (error) {
            throw error;
        }
    });
}
export function manGetGroup(groupData) {
    return __awaiter(this, void 0, void 0, function* () {
        return dbSearchGroup(groupData);
    });
}
export function manRmvGroup(groupData) {
    return __awaiter(this, void 0, void 0, function* () {
        const groupFullDetails = yield manGetGroup({ _id: groupData._id });
        try {
            if (groupFullDetails) {
                let counter = groupFullDetails.subgroups.length - 1;
                while (groupFullDetails.subgroups.length > 0) {
                    console.log(groupFullDetails.subgroups[counter]);
                    yield dbRemoveGroup({ _id: groupFullDetails.subgroups[counter] });
                    groupFullDetails.subgroups.pop();
                    counter--;
                }
                yield dbRemoveGroup({ _id: groupData._id });
            }
            else {
                throw new Error("Can't find group to remove!");
            }
        }
        catch (error) {
            throw error;
        }
    });
}
export function manUpdateGroup(groupData) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = {
            groupID: groupData.updateFields.groupID,
            _id: groupData._id
        };
        try {
            if (groupData._id == groupData.updateFields.groupID) {
                throw new Error("Can't insert a group into itself!");
            }
            else if (yield isGroupOwnFather(result)) {
                throw new Error("Can't insert a group into own lineage!");
            }
            else {
                return dbUpdateGroup(groupData);
            }
        }
        catch (error) {
            throw error;
        }
    });
}
export function isGroupOwnFather(groupData) {
    return __awaiter(this, void 0, void 0, function* () {
        // Returns true if group is in it's own lineage
        // Base case: If the groupID is null/undefined, no parent exists
        if (!groupData.groupID) {
            return false;
        }
        // Fetch the parent group using groupID
        const parentGroup = yield manGetGroup({ _id: groupData.groupID });
        if (!parentGroup) {
            return false; // No parent group found, valid hierarchy
        }
        // Direct circular reference check
        if (parentGroup._id.equals(groupData._id)) {
            return true; // Group is its own ancestor
        }
        // Recursive check: Traverse up the hierarchy
        return isGroupOwnFather({ groupID: parentGroup.groupID, _id: groupData._id });
    });
}
//TO-DO ADD AND ADJUST
/*async function isPersonInGroup(personData:{groupID: Types.ObjectId, _id: Types.ObjectId} )
// returns false if not in group
{
  const group = await manGetGroup({
    _id: personData.groupID // Pass the groupID as _id
});
if (!group)
  return false
// Iterating over the people array using a for loop
  return group.people.includes(personData._id)
}*/
//# sourceMappingURL=groupManager.js.map