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
export async function manGetGroup(groupData:{name: string, subgroups: Types.ObjectId [], people: Types.ObjectId [] ,
    groupID: Types.ObjectId} ){
    if(groupData.name.length > 1)
        dbSearchGroup(groupData);
    
}

export async function manRmvGroup(groupData:{name: string, subgroups: Types.ObjectId [], people:Types.ObjectId [] ,
    groupID: Types.ObjectId} ){
    if(groupData.name.length > 1)
        dbRemoveGroup(groupData)
}


export async function manUpdateGroup(groupData: { 
    _id: Types.ObjectId; updateFields: { name?: string; groupID?: Types.ObjectId; people?:Types.ObjectId[]; subgroups?:Types.ObjectId[];}; 
  }){  
     
    const { _id, updateFields } = groupData;
        return dbUpdateGroup(groupData)
        .then(completedUpdate => {return completedUpdate});
}

