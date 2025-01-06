import { IGroup } from "./groupModel";
import { dbCreateGroup, dbSearchGroup, dbRemoveGroup, dbUpdateGroup } from "./groupRep.js";
import {Types} from 'mongoose';


export async function manCreateGroup(groupData:{name: string, subgroups: Types.ObjectId [], people:Types.ObjectId [] ,
    groupID: Types.ObjectId} ){
    /*
    if ('groupID' in groupData){
    //ADD COMM TO PERSON LATER
    //groupInSameGroup(groupData);
    //addgroupToGroup(groupData)
    //groupData.groupID = ObjectId.createFromHexString(groupData.groupID);
    }*/
    if(groupData.name.length > 1)
        await dbCreateGroup(groupData);
    
}
export async function manGetGroup(groupData:{name: string, subgroups: Types.ObjectId [], people: Types.ObjectId [] ,
    groupID: Types.ObjectId} ){
    /*
    if ('groupID' in groupData){
    //ADD COMM TO GROUP LATER
    //groupInSameGroup(groupData);
    //addgroupToGroup(groupData)
    //groupData.groupID = ObjectId.createFromHexString(groupData.groupID);
    }*/
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

