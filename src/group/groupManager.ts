import { updateGroup } from "./groupController";
import { dbCreateGroup, dbSearchGroup, dbRemoveGroup, dbUpdateGroup } from "./groupRep.js";
import {Types} from 'mongoose';

export async function manCreateGroup(groupData:{name: string, subgroups: Types.ObjectId[], people:Types.ObjectId[] ,
    groupID: Types.ObjectId} ){
        // Validate the person's name
        try{
             if (groupData.name && groupData.name.length <= 1) {
               throw new Error('Name must be longer than 1 character');
             }
             
             const createdGroup = await dbCreateGroup(groupData)
               if (createdGroup.groupID) {
                const result = {
                  groupID: createdGroup.groupID,
                  _id: createdGroup._id as Types.ObjectId
                };
                if (await isGroupOwnFather(result)){    
                   const updateGroupinGroupJSON = {
                     _id: groupData.groupID,
                     updateFields: {
                       subgroups: [createdGroup._id] as Types.ObjectId[], 
                   },
                   };
                   await manUpdateGroup(updateGroupinGroupJSON);
           }
          }
       
             
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
     const result = {
      groupID: groupData.updateFields.groupID,
      _id: groupData._id as Types.ObjectId}
    try{
     if(groupData._id == groupData.updateFields.groupID){
        throw new Error("Can't insert a group into itself!");
     }
    else if (await isGroupOwnFather(result)){
      throw new Error("Can't insert a group into own lineage!");
    }
    
     else
     {
      return dbUpdateGroup(groupData)}
    }
     catch(error:any) {
      throw error
     }
}

export async function isGroupOwnFather(groupData: { groupID?: Types.ObjectId, _id: Types.ObjectId }): Promise<boolean> {
  // Returns true if group is in it's own lineage
  // Base case: If the groupID is null/undefined, no parent exists
  if (!groupData.groupID) {
    return false;
  }
  // Fetch the parent group using groupID
  const parentGroup = await manGetGroup({ _id: groupData.groupID });
  if (!parentGroup) {
    return false; // No parent group found, valid hierarchy
  }
  // Direct circular reference check
  if ((parentGroup._id as Types.ObjectId).equals(groupData._id)) {
    return true; // Group is its own ancestor
  }
  // Recursive check: Traverse up the hierarchy
  return isGroupOwnFather({ groupID: parentGroup.groupID, _id: groupData._id });
}
//TO-DO ADD AND ADJUST
/*async function isPersonInGroup(personData:{groupID: Types.ObjectId, _id: Types.ObjectId} ) 
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


