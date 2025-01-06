var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Person } from './personModel.js';
export function dbCreatePerson(personData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const person = new Person(personData);
            const createdPerson = yield person.save();
            return createdPerson;
        }
        catch (error) {
            console.error("Error creating person in rep:", error);
            throw new Error("Failed to create person");
        }
    });
}
export function dbSearchPerson(personData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield Person.find(personData);
        }
        catch (error) {
            console.error("Error finding person in rep:", error);
            throw new Error("Failed to create person");
        }
    });
}
export function dbRemovePerson(personData) {
    return __awaiter(this, void 0, void 0, function* () {
        // remove only by ID
        try {
            yield Person.deleteOne(personData);
        }
        catch (error) {
            console.error("Error deleting person in rep:", error);
            throw new Error("Failed to create person");
        }
    });
}
export function dbUpdatePerson(personData) {
    return __awaiter(this, void 0, void 0, function* () {
        const { _id, updateFields } = personData;
        try {
            const updatedPerson = yield Person.findByIdAndUpdate(_id, { $set: updateFields }, { new: true, runValidators: true });
            if (!updatedPerson) {
                console.log("Person not found");
                return null;
            }
            console.log("Person updated successfully:", updatedPerson);
            return updatedPerson;
        }
        catch (error) {
            console.error("Error updating person:", error, _id);
            throw error;
        }
    });
}
//# sourceMappingURL=personRep.js.map