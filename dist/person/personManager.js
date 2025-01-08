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
import { manGetGroup, manUpdateGroup } from '../group/groupManager.js';
export function manCreatePerson(personData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Validate the person's name
            if (personData.name.length <= 1) {
                throw new Error('Name must be longer than 1 character');
            }
            const createdPerson = yield dbCreatePerson(personData)
                .then((createdPerson) => __awaiter(this, void 0, void 0, function* () {
                if (personData.groupID) {
                    const updatePersoninGroupJSON = {
                        _id: personData.groupID,
                        updateFields: {
                            people: [createdPerson._id]
                        },
                    };
                    if (yield isPersonInGroup({ groupID: personData.groupID, _id: createdPerson._id })) {
                        throw new Error('Person Already in group');
                    }
                    else {
                        yield manUpdateGroup(updatePersoninGroupJSON);
                    }
                }
            }));
            return { message: 'Person created successfully', person: createdPerson };
        }
        catch (error) {
            throw error;
        }
    });
}
export function manGetPerson(personData) {
    return __awaiter(this, void 0, void 0, function* () {
        if (personData.name.length > 1)
            dbSearchPerson(personData);
    });
}
export function manRmvPerson(personData) {
    return __awaiter(this, void 0, void 0, function* () {
        const person = yield dbRemovePerson(personData);
        return person;
    });
}
export function manUpdatePerson(personData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { _id, updateFields } = personData;
            if (updateFields.groupID && !(yield isPersonInGroup({ groupID: updateFields.groupID, _id: _id })))
                return dbUpdatePerson(personData);
            else {
                throw new Error('Person Already in group');
            }
        }
        catch (_a) {
            return { message: 'Person already in group', personData };
        }
    });
}
function isPersonInGroup(personData) {
    return __awaiter(this, void 0, void 0, function* () {
        const group = yield manGetGroup({
            _id: personData.groupID // Pass the groupID as _id
        });
        if (group == undefined) {
            return false;
        }
        // Iterating over the people array using a for loop
        for (let i = 0; i < group.people.length; i++) {
            const personId = group.people[i];
            if (personData._id == personId) {
                return true;
            }
        }
        return false;
    });
}
//# sourceMappingURL=personManager.js.map