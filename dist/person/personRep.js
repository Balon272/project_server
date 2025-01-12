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
export function dbCreatePerson(name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const person = new Person(name);
            const createdPerson = yield person.save();
            return createdPerson;
        }
        catch (error) {
            console.error("Error creating person in rep:", error);
            throw new Error("Failed to create person");
        }
    });
}
export function dbSearchPerson(_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield Person.find(_id);
        }
        catch (error) {
            console.error("Error finding person in rep:", error);
            throw new Error("Failed to create person");
        }
    });
}
export function dbRemovePerson(_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // `findOneAndDelete` will return the deleted document or null if not found.
            const person = yield Person.findOneAndDelete(_id);
            return person; // Return the deleted person or null.
        }
        catch (error) {
            console.error("Error deleting person in dbRemovePerson:", error);
            throw new Error("Failed to delete person");
        }
    });
}
export function dbUpdatePerson(_id, name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updatedPerson = yield Person.findByIdAndUpdate(_id, { $set: { name: name } }, { new: true, runValidators: true });
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