
import { dbCreatePerson, dbSearchPerson, dbRemovePerson, dbUpdatePerson } from "./personRep.js";
import { manCreateGroup, manGetGroup, manRmvGroup, manUpdateGroup } from '../group/groupManager.js';
import {Types} from 'mongoose';

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


