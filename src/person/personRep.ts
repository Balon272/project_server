import { updatePerson } from './personController.js';
import {IPerson, Person} from './personModel.js'
import mongoose, {Types} from 'mongoose'


export async function dbCreatePerson(personData:{name: string, groupID?: Types.ObjectId}):Promise<IPerson>{
    try{
        const person = new Person(personData);
        const createdPerson = await person.save()
        return createdPerson;
    }
    catch (error) {
        console.error("Error creating person in rep:", error);
        throw new Error("Failed to create person");
      }
}

export async function dbSearchPerson(personData:{name: string, groupID: Types.ObjectId, _id: Types.ObjectId}){
    try{         
        await Person.find(personData);
    }
    catch (error) {
        console.error("Error finding person in rep:", error);
        throw new Error("Failed to create person");
      }
}

export async function dbRemovePerson(personData:{name: string, groupID: Types.ObjectId, _id: Types.ObjectId}){
// remove only by ID
  try{        
      await Person.deleteOne(personData);
    }
    catch (error) {
        console.error("Error deleting person in rep:", error);
        throw new Error("Failed to create person");
      }

}

export async function dbUpdatePerson(personData: { 
  _id: Types.ObjectId; 
  updateFields: { name?: string; groupID?: Types.ObjectId; }; 
}) {  
  const { _id, updateFields } = personData; 

  try {
    const updatedPerson = await Person.findByIdAndUpdate(
      _id,
      { $set: updateFields },
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