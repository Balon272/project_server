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
import { manUpdateGroup } from '../group/groupManager.js';
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
                    yield manUpdateGroup(updatePersoninGroupJSON);
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
        /*
        if ('groupID' in personData){
        //ADD COMM TO GROUP LATER
        //personInSameGroup(personData);
        //addPersonToGroup(personData)
        //personData.groupID = ObjectId.createFromHexString(personData.groupID);
        }*/
        if (personData.name.length > 1)
            dbSearchPerson(personData);
    });
}
export function manRmvPerson(personData) {
    return __awaiter(this, void 0, void 0, function* () {
        if (personData.name.length > 1)
            dbRemovePerson(personData);
    });
}
export function manUpdatePerson(personData) {
    return __awaiter(this, void 0, void 0, function* () {
        const { _id, updateFields } = personData;
        dbUpdatePerson(personData);
    });
}
//# sourceMappingURL=personManager.js.map