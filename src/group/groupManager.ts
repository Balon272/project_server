import { group } from "console";
import { IGroup } from "./groupModel";
import { dbCreateGroup, dbSearchGroup, dbRemoveGroup, dbUpdateGroup } from "./groupRep.js";
import {Types} from 'mongoose';


export async function manCreateGroup(groupData:{name: string, subgroups: Types.ObjectId[], people:Types.ObjectId[] ,
    groupID: Types.ObjectId} ){
        // Validate the person's name
        try{
             if (groupData.name.length <= 1) {
               throw new Error('Name must be longer than 1 character');
             }
             const createdGroup = await dbCreateGroup(groupData)
             .then(async createdGroup => {
               if (groupData.groupID) {
                   const updateGroupinGroupJSON = {
                     _id: groupData.groupID,
                     updateFields: {
                       subgroups: [createdGroup._id] as Types.ObjectId[], 
                   },
                   };
                   await manUpdateGroup(updateGroupinGroupJSON);
           }
       })
             
             return { message: 'Person created successfully', person: createdGroup };
           }
            catch (error) {
             throw error; 
           }
}
export async function manGetGroup(groupData:{name?: string, subgroups?: Types.ObjectId [], people?: Types.ObjectId [] ,
    groupID?: Types.ObjectId,  _id: Types.ObjectId} ){
        return dbSearchGroup(groupData);
        
}

export async function manRmvGroup(groupData:{_id:Types.ObjectId} ){
        const groupFullDetails = await manGetGroup({_id: groupData._id})  
        try{ 
        if (groupFullDetails){
        let counter = groupFullDetails.subgroups.length - 1
        while (groupFullDetails.subgroups.length > 0)
            {
              console.log(groupFullDetails.subgroups[counter])
              await dbRemoveGroup({_id: groupFullDetails.subgroups[counter]})
              groupFullDetails.subgroups.pop()
              counter--
            }

        await dbRemoveGroup({_id: groupData._id});
        }
        else {
          throw new Error("Can't find group to remove!");
        }
      }
      catch(error:any){
        throw error
      }
}


export async function manUpdateGroup(groupData: { 
    _id: Types.ObjectId; updateFields: { name?: string; groupID?: Types.ObjectId; people?:Types.ObjectId[]; 
      subgroups?:Types.ObjectId[];}; 
  }){  
    try{
     if(groupData._id == groupData.updateFields.groupID){
        throw new Error("Can't insert a group into itself!");
     }
     else
     {
      return dbUpdateGroup(groupData)}
    }
     catch(error:any) {
      throw error
     }
}

/*async function isGroupInGroup(personData:{groupID: Types.ObjectId, _id: Types.ObjectId} ) 
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
}*/