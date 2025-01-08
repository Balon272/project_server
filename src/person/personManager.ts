import { IPerson } from "./personModel";
import { dbCreatePerson, dbSearchPerson, dbRemovePerson, dbUpdatePerson } from "./personRep.js";
import { manCreateGroup, manGetGroup, manRmvGroup, manUpdateGroup } from '../group/groupManager.js';
import {Types} from 'mongoose';
import { json } from "stream/consumers";

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
            if (await isPersonInGroup({  groupID: personData.groupID, _id: createdPerson._id })){
              throw new Error('Person Already in group')
            }
            else{
              await manUpdateGroup(updatePersoninGroupJSON);}
    }
})
      
      return { message: 'Person created successfully', person: createdPerson };
    }
     catch (error) {
      throw error; 
    }
}



export async function manGetPerson(personData:{name: string, groupID: Types.ObjectId, _id: Types.ObjectId} ){
    
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
    try {
    const { _id, updateFields } = personData;
    if (updateFields.groupID && !await isPersonInGroup({ groupID: updateFields.groupID, _id: _id }))
      return dbUpdatePerson(personData);
      else{
        throw new Error('Person Already in group')
      }
    }
    catch{
      return { message: 'Person already in group', personData };
    }
}

async function isPersonInGroup(personData:{groupID: Types.ObjectId, _id: Types.ObjectId} ) 
// returns false if not in group
{
  const group = await manGetGroup({
    _id: personData.groupID // Pass the groupID as _id
});
if (group == undefined){return false}
// Iterating over the people array using a for loop
for (let i = 0; i < group.people.length; i++) {
    const personId = group.people[i];
    if (personData._id == personId){
      return true
    } 
}
  return false
}