import { updateGroup } from './groupController.js';
import {IGroup, Group} from './groupModel.js'
import mongoose, {Types} from 'mongoose'

 //Group = {"name": "abc", "subgroups": "[]", "people": "[]", groupID:}

export async function dbCreateGroup(groupData:{name: string, subgroups: Types.ObjectId [], people:Types.ObjectId [] ,
     groupID: Types.ObjectId}){
    try{
        const group = new Group(groupData);
        await group.save()
    }
    catch (error) {
        console.error("Error creating group in rep:", error);
        throw new Error("Failed to create group");
      }
}

export async function dbSearchGroup(groupData:{name: string, subgroups: Types.ObjectId [], people:Types.ObjectId [] ,
    groupID: Types.ObjectId}){
    try{         
        await Group.find(groupData);
    }
    catch (error) {
        console.error("Error finding group in rep:", error);
        throw new Error("Failed to create group");
      }
}

export async function dbRemoveGroup(groupData:{name: string, subgroups: Types.ObjectId [], people:Types.ObjectId [] ,
    groupID: Types.ObjectId}){
// remove only by ID
  try{        
      await Group.deleteOne(groupData);
    }
    catch (error) {
        console.error("Error deleting group in rep:", error);
        throw new Error("Failed to create group");
      }

}

export async function dbUpdateGroup(groupData: { 
  _id: Types.ObjectId; 
  updateFields: { name?: string; groupID?: Types.ObjectId; people?: Types.ObjectId[]; subgroups?: Types.ObjectId[] }; 
}): Promise<IGroup | string> {  
  const { _id, updateFields } = groupData; 

  try {
    const updatedGroup = await Group.findByIdAndUpdate(
      _id,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedGroup) {
      console.log("Group not found");
      return "Group not found"; // Return a fail message
    }
    console.log("Group updated successfully:", updatedGroup);
    return updatedGroup; // Return the updated group
  } catch (error) {
    console.error("Error updating group:", error, _id);
    throw error; // Rethrow the error to let the caller handle it
  }
}