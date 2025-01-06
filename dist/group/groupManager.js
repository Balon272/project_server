var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { dbCreateGroup, dbSearchGroup, dbRemoveGroup, dbUpdateGroup } from "./groupRep.js";
export function manCreateGroup(groupData) {
    return __awaiter(this, void 0, void 0, function* () {
        /*
        if ('groupID' in groupData){
        //ADD COMM TO PERSON LATER
        //groupInSameGroup(groupData);
        //addgroupToGroup(groupData)
        //groupData.groupID = ObjectId.createFromHexString(groupData.groupID);
        }*/
        if (groupData.name.length > 1)
            yield dbCreateGroup(groupData);
    });
}
export function manGetGroup(groupData) {
    return __awaiter(this, void 0, void 0, function* () {
        /*
        if ('groupID' in groupData){
        //ADD COMM TO GROUP LATER
        //groupInSameGroup(groupData);
        //addgroupToGroup(groupData)
        //groupData.groupID = ObjectId.createFromHexString(groupData.groupID);
        }*/
        if (groupData.name.length > 1)
            dbSearchGroup(groupData);
    });
}
export function manRmvGroup(groupData) {
    return __awaiter(this, void 0, void 0, function* () {
        if (groupData.name.length > 1)
            dbRemoveGroup(groupData);
    });
}
export function manUpdateGroup(groupData) {
    return __awaiter(this, void 0, void 0, function* () {
        const { _id, updateFields } = groupData;
        return dbUpdateGroup(groupData)
            .then(completedUpdate => { return completedUpdate; });
    });
}
//# sourceMappingURL=groupManager.js.map