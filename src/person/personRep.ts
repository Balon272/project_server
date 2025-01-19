import { updatePerson } from './personController.js';
import {IPerson, Person} from './personModel.js'
import  {Types} from 'mongoose'


export async function dbCreatePerson(name: string):Promise<IPerson>{
    try{
        const person = new Person(name);
        const createdPerson = await person.save()
        return createdPerson;
    }
    catch (error) {
        console.error("Error creating person in rep:", error);
        throw new Error("Failed to create person");
      }
}

export async function dbSearchPerson(_id: Types.ObjectId){
    try{         
        return await Person.find(_id);
    }
    catch (error) {
        console.error("Error finding person in rep:", error);
        throw new Error("Failed to create person");
      }
}

export async function dbRemovePerson( _id: Types.ObjectId ): Promise<IPerson | null> {
  try {
    // `findOneAndDelete` will return the deleted document or null if not found.
    const person = await Person.findOneAndDelete(_id)
    return person;  // Return the deleted person or null.
  } catch (error) {
    console.error("Error deleting person in dbRemovePerson:", error);
    throw new Error("Failed to delete person");
  }
}

export async function dbUpdatePerson(_id: Types.ObjectId, name: string) {  

  try {
    const updatedPerson = await Person.findByIdAndUpdate(
      _id,
      { $set: { name: name } },
      { new: true, runValidators: true }
    );

    if (!updatedPerson) {
      console.log("Person not found");
      return null;
    }

    console.log("Person updated successfully:", updatedPerson);
    return updatedPerson;
  } catch (error) {
    console.error("Error updating person:", error, _id);
    throw error;
  }
}