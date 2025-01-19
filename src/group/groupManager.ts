import { IGroup, Group } from "./groupModel.js";
import { dbCreateGroup, dbSearchGroup, dbRemoveGroup, dbUpdateGroup, fetchAllGroups, dbPullGroups } from "./groupRep.js";
import {Types} from 'mongoose';

export async function manCreateGroup(groupData:{name: string, subgroups: Types.ObjectId[], people:Types.ObjectId[]} ){
        // Validate the person's name
        try{
             if (groupData.name && groupData.name.length <= 1) {
               throw new Error('Name must be longer than 1 character');
             }
             const createdGroup = await dbCreateGroup(groupData)

                
               if (createdGroup.subgroups) {
                const result = {
                  subgroups: createdGroup.subgroups,
                  _id: createdGroup._id as Types.ObjectId
                };
                if (createdGroup.subgroups.includes(result._id)){    
                    dbRemoveGroup(createdGroup._id as Types.ObjectId)
                    throw new Error ("Group can't contain itself (Group included in SubGroups).")
                   }           
                }
                else if (await isGroupOwnFather(createdGroup._id as Types.ObjectId)){
                  dbRemoveGroup(createdGroup._id as Types.ObjectId)
                  throw new Error("Can't insert a group into own lineage!");
                }     
           return { message: 'Group created successfully', createdGroup };
           }
            catch (error:any) {
             throw error; 
           }
}


export async function manGetGroup(_id: Types.ObjectId){
  try{
        return dbSearchGroup(_id);

  }
  catch(error:any) {
    throw error;
  }
}

export async function manRmvGroup(_id:Types.ObjectId){
        const groupFullDetails : IGroup | null = await manGetGroup(_id)  
        try{ 
        if (groupFullDetails){
        let counter = groupFullDetails.subgroups.length - 1
        while (groupFullDetails.subgroups.length > 0)
            {
              const remove_id = groupFullDetails.subgroups[counter]
              await dbRemoveGroup(remove_id)
              groupFullDetails.subgroups.pop()
              counter--
            }
        const removedGroup = await dbRemoveGroup(_id)
        return (`Group ${removedGroup} and it's subgroups were removed`);
        }
        else {
          throw new Error("Can't find group to remove!");
        }
      }
      catch(error:any){
        throw error
      }
}


export async function manUpdateGroup(  _id: Types.ObjectId,
  updateFields: { name?: string; people?: Types.ObjectId[]; subgroups?: Types.ObjectId[] }
) {
  try {
    if (updateFields.people){
      updateFields.people.forEach(async person =>{
        if (await isPersonInGroup(person, _id)){
          throw new Error(`Can't insert the person ${person} again to the same group!`);
        }
      })
    }
    if (updateFields.subgroups) {

      // Check if the group is trying to insert itself into its subgroups
      if (updateFields.subgroups.includes(_id)) {
        throw new Error("Can't insert a group into itself!");
      }

      // Check if any subgroup is part of the group's own lineage
      for (const subgroupId of updateFields.subgroups) {
        const isInLineage = await isGroupOwnFather(subgroupId as Types.ObjectId);

        if (isInLineage) {
          throw new Error("Can't insert a group into its own lineage!");
        }
      }

      // Check if any of the current subgroups is the parent of the group being updated
      for (const subgroupId of updateFields.subgroups) {
        console.log('SubgroupId:', subgroupId);
        const subgroup = await manGetGroup({ _id: subgroupId as Types.ObjectId } as Types.ObjectId);
        if (subgroup &&  subgroup.subgroups && subgroup.subgroups.includes(_id)) {
          throw new Error("A group cannot be inserted into a subgroup that is already part of its lineage!");
        }
      }

       if (await isGroupOwnFather(_id)) {
        throw new Error("Can't insert a group into its own lineage!");
      } else {
        return await dbUpdateGroup(_id, updateFields);
      }

    } 
    else if (await isGroupOwnFather(_id)) {
      throw new Error("Can't insert a group into its own lineage!");
    } else {
      return await dbUpdateGroup(_id, updateFields);
    }
  } catch (error: any) {
    throw error;
  }
}

export async function isGroupOwnFather(_id: Types.ObjectId): Promise<boolean> {
  const allGroups = await manGetAllGroups(); // Fetch all groups
// returns true if group in it's lineage
  const findParent = (currentId: Types.ObjectId): boolean => {
    for (const group of allGroups) {
      for (const subgroupId of group.subgroups) {
        if (subgroupId.equals(currentId)) {
          if ((group._id as Types.ObjectId).equals(_id)) return true;
          // Recursively check the parent group
          return findParent(group._id as Types.ObjectId);
        }
      }
    }
    return false; // No parent found, hierarchy is valid
  };

  return findParent(_id);
}

export async function manGetAllGroups() {
  return await fetchAllGroups();
}

async function isPersonInGroup(personId: Types.ObjectId, groupId: Types.ObjectId): Promise<boolean> {
  try {
    // Find the group by its ID
    const group = await Group.findById(groupId).exec();
    
    // If the group is found and the person's ID exists in the group’s people array, return true
    if (group && group.people.includes(personId)) {
      return true;
    }
    
    // If the group doesn't contain the person, return false
    return false;
  } catch (error) {
    console.error("Error checking if person is in group:", error);
    return false;
  }
}