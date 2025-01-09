var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { dbCreatePerson, dbSearchPerson, dbRemovePerson, dbUpdatePerson } from "./personRep.js";
//Create multiple groups for person []
export function manCreatePerson(name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Validate the person's name
            if (name.length <= 1) {
                throw new Error('Name must be longer than 1 character');
            }
            const createdPerson = yield dbCreatePerson(name);
            return { message: 'Person created successfully', person: createdPerson };
        }
        catch (error) {
            throw error;
        }
    });
}
export function manGetPerson(_id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield dbSearchPerson(_id);
    });
}
export function manRmvPerson(_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const person = yield dbRemovePerson(_id);
        return person;
    });
}
export function manUpdatePerson(_id, updateFields) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return dbUpdatePerson(_id, updateFields.name);
        }
        catch (error) {
            return { message: error.message };
        }
    });
}
/*async function isPersonInGroup(_id: Types.ObjectId )
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
//# sourceMappingURL=personManager.js.map