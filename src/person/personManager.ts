import { IPerson } from "./personModel";
import { dbCreatePerson, dbSearchPerson, dbRemovePerson, dbUpdatePerson } from "./personRep.js";
import { manCreateGroup, manGetGroup, manRmvGroup, manUpdateGroup } from '../group/groupManager.js';
import {Types} from 'mongoose';

export async function manCreatePerson(personData: { name: string; groupID?: Types.ObjectId }) {
    try {
      // Validate the person's name
      if (personData.name.length <= 1) {
        throw new Error('Name must be longer than 1 character');
      }
      const createdPerson = await dbCreatePerson(personData)
      .then(async createdPerson => {
        if (personData.groupID) {
            const updatePersoninGroupJSON = {
              _id: personData.groupID,
              updateFields: {
                people: [createdPerson._id]
            },
            };
            await manUpdateGroup(updatePersoninGroupJSON);
    }
})
      
      return { message: 'Person created successfully', person: createdPerson };
    }
     catch (error) {
      throw error; 
    }
}



export async function manGetPerson(personData:{name: string, groupID: Types.ObjectId, _id: Types.ObjectId} ){
    /*
    if ('groupID' in personData){
    //ADD COMM TO GROUP LATER
    //personInSameGroup(personData);
    //addPersonToGroup(personData)
    //personData.groupID = ObjectId.createFromHexString(personData.groupID);
    }*/
    if(personData.name.length > 1)
        dbSearchPerson(personData);
    
}

export async function manRmvPerson(personData:{ _id: Types.ObjectId} ): Promise<Object | any>{
       const person =  await dbRemovePerson(personData)
        return person;
}


export async function manUpdatePerson(personData: { 
    _id: Types.ObjectId; updateFields: { name?: string; groupID?: Types.ObjectId; }; 
  }){  
     
    const { _id, updateFields } = personData;
        dbUpdatePerson(personData);
}

