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
            if (groupData.name.length <= 1) {
                throw new Error('Name must be longer than 1 character');
            }
            const createdGroup = yield dbCreateGroup(groupData)
                .then((createdGroup) => __awaiter(this, void 0, void 0, function* () {
                if (groupData.groupID) {
                    const updateGroupinGroupJSON = {
                        _id: groupData.groupID,
                        updateFields: {
                            subgroups: [createdGroup._id],
                        },
                    };
                    yield manUpdateGroup(updateGroupinGroupJSON);
                }
            }));
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
        try {
            if (groupData._id == groupData.updateFields.groupID) {
                throw new Error("Can't insert a group into itself!");
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
/*async function isGroupInGroup(personData:{groupID: Types.ObjectId, _id: Types.ObjectId} )
// returns false if not in group
{
  const group = await manGetGroup({
    _id: personData.groupID // Pass the groupID as _id
});
if (group == undefined){return false}
// Iterating over the people array using a for loop
for (let i = 0; i < group.people.length; i++) {
    const personId = group.people[i];
    if (personData._id == personId){
      return true
    }
}
  return false
}*/ 
//# sourceMappingURL=groupManager.js.map