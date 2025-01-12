var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { dbCreateGroup, dbSearchGroup, dbRemoveGroup, dbUpdateGroup, fetchAllGroups } from "./groupRep.js";
export function manCreateGroup(groupData) {
    return __awaiter(this, void 0, void 0, function* () {
        // Validate the person's name
        try {
            if (groupData.name && groupData.name.length <= 1) {
                throw new Error('Name must be longer than 1 character');
            }
            const createdGroup = yield dbCreateGroup(groupData);
            if (createdGroup.subgroups) {
                const result = {
                    subgroups: createdGroup.subgroups,
                    _id: createdGroup._id
                };
                if (createdGroup.subgroups.includes(result._id)) {
                    dbRemoveGroup(createdGroup._id);
                    throw new Error("Group can't contain itself (Group included in SubGroups).");
                }
            }
            else if (yield isGroupOwnFather(createdGroup._id)) {
                dbRemoveGroup(createdGroup._id);
                throw new Error("Can't insert a group into own lineage!");
            }
            return { message: 'Group created successfully', createdGroup };
        }
        catch (error) {
            throw error;
        }
    });
}
export function manGetGroup(_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return dbSearchGroup(_id);
        }
        catch (error) {
            throw error;
        }
    });
}
export function manRmvGroup(_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const groupFullDetails = yield manGetGroup(_id);
        try {
            if (groupFullDetails) {
                let counter = groupFullDetails.subgroups.length - 1;
                while (groupFullDetails.subgroups.length > 0) {
                    const remove_id = groupFullDetails.subgroups[counter];
                    yield dbRemoveGroup(remove_id);
                    groupFullDetails.subgroups.pop();
                    counter--;
                }
                const removedGroup = yield dbRemoveGroup(_id);
                return (`Group ${removedGroup} and it's subgroups were removed`);
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
export function manUpdateGroup(_id, updateFields) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (updateFields.subgroups) {
                // Check if the group is trying to insert itself into its subgroups
                if (updateFields.subgroups.includes(_id)) {
                    throw new Error("Can't insert a group into itself!");
                }
                // Check if any subgroup is part of the group's own lineage
                for (const subgroupId of updateFields.subgroups) {
                    const isInLineage = yield isGroupOwnFather(subgroupId);
                    if (isInLineage) {
                        throw new Error("Can't insert a group into its own lineage!");
                    }
                }
                // Check if any of the current subgroups is the parent of the group being updated
                for (const subgroupId of updateFields.subgroups) {
                    const subgroup = yield manGetGroup({ _id: subgroupId });
                    if (subgroup && subgroup.subgroups && subgroup.subgroups.includes(_id)) {
                        throw new Error("A group cannot be inserted into a subgroup that is already part of its lineage!");
                    }
                }
                if (yield isGroupOwnFather(_id)) {
                    throw new Error("Can't insert a group into its own lineage!");
                }
                else {
                    return yield dbUpdateGroup(_id, updateFields);
                }
            }
            else if (yield isGroupOwnFather(_id)) {
                throw new Error("Can't insert a group into its own lineage!");
            }
            else {
                return yield dbUpdateGroup(_id, updateFields);
            }
        }
        catch (error) {
            throw error;
        }
    });
}
export function isGroupOwnFather(_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const allGroups = yield manGetAllGroups(); // Fetch all groups
        // returns true if group in it's lineage
        const findParent = (currentId) => {
            for (const group of allGroups) {
                for (const subgroupId of group.subgroups) {
                    if (subgroupId.equals(currentId)) {
                        if (group._id.equals(_id))
                            return true;
                        // Recursively check the parent group
                        return findParent(group._id);
                    }
                }
            }
            return false; // No parent found, hierarchy is valid
        };
        return findParent(_id);
    });
}
export function manGetAllGroups() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield fetchAllGroups();
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