import { updateGroup } from './groupController.js';
import {IGroup, Group} from './groupModel.js'
import mongoose, {Types} from 'mongoose'

 //Group = {"name": "abc", "subgroups": "[]", "people": "[]", groupID:}

export async function dbCreateGroup(groupData:{name: string, subgroups?: Types.ObjectId [], people?:Types.ObjectId []}){
    try{
        const group = new Group(groupData);
        const createdGroup = await group.save()
        return createdGroup;
    }
    catch (error) {
        console.error("Error creating group in rep:", error);
        throw new Error("Failed to create group");
      }
}

export async function dbSearchGroup(_id: Types.ObjectId){
    try{         
        return await Group.findById(_id);
    }
    catch (error) {
        console.error("Error finding group in rep:", error);
        throw new Error("Failed to find group");
      }
}

export async function dbRemoveGroup(_id: Types.ObjectId){
  try{
      await Group.findByIdAndDelete(_id);
    }
    catch (error) {
        console.error("Error deleting group in rep:", error);
        throw new Error("Failed to remove group");
      }

}

export async function dbUpdateGroup(
  _id: Types.ObjectId,
  updateFields: { 
    name?: string; 
    people?: Types.ObjectId[]; 
    subgroups?: Types.ObjectId[]; 
  }
): Promise<IGroup | string> {

  try {
    const updateObj: any = {};
    // Set name and groupID fields
    if (updateFields.name) {
      updateObj.name = updateFields.name;
    }
    // Push to people and subgroups arrays
    if (updateFields.people && updateFields.people.length > 0) {
      updateObj.$push = updateObj.$push || {};
      updateObj.$push.people = { $each: updateFields.people };
    }
    if (updateFields.subgroups && updateFields.subgroups.length > 0) {
      updateObj.$push = updateObj.$push || {};
      updateObj.$push.subgroups = { $each: updateFields.subgroups };
    }
    const updatedGroup = await Group.findByIdAndUpdate(
      _id,
      updateObj,
      { new: true, runValidators: true } // Return the updated document and run validators
    );
    if (!updatedGroup) {
      console.log("Group not found");
      return "Group not found"; // Return a failure message if the group doesn't exist
    }
    console.log("Group updated successfully:", updatedGroup);
    return updatedGroup;
  } catch (error) {
    console.error("Error updating group:", error, _id);
    throw error; // Rethrow the error for the caller to handle
  }
}

export async function fetchAllGroups() {
  return await Group.find({});
}