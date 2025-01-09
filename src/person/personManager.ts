import { IPerson } from "./personModel";
import { dbCreatePerson, dbSearchPerson, dbRemovePerson, dbUpdatePerson } from "./personRep.js";
import { manCreateGroup, manGetGroup, manRmvGroup, manUpdateGroup } from '../group/groupManager.js';
import {Types} from 'mongoose';
import { json } from "stream/consumers";


//Create multiple groups for person []

export async function manCreatePerson(name: string) {
    try {
      // Validate the person's name
      if (name.length <= 1) {
        throw new Error('Name must be longer than 1 character');
      }
      const createdPerson = await dbCreatePerson(name)      
      return { message: 'Person created successfully', person: createdPerson };
    }
     catch (error) {
      throw error; 
    }
}



export async function manGetPerson( _id: Types.ObjectId){  
              return await dbSearchPerson(_id);
}

export async function manRmvPerson(_id: Types.ObjectId): Promise<Object | any>{
       const person =  await dbRemovePerson(_id)
       return person;
}


export async function manUpdatePerson(
    _id: Types.ObjectId, updateFields: {name: string;}
  ){  
    try {
      return dbUpdatePerson(_id, updateFields.name);
    }
    catch(error:any ) {
      return { message: error.message };
    }
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