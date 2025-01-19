import { Request, Response } from 'express';
import { manCreateGroup, manGetGroup, manRmvGroup, manUpdateGroup, manGetAllGroups} from './groupManager.js';



export const createGroup = async (req: Request, res: Response) => {
            //Group = {"name": "abc", "subgroups": "[]", "people": "[]", _id:}
    try{
        const newGroup = req.body;
        const createdGroup = await manCreateGroup(newGroup)
        res.status(201).json({createdGroup});
    } catch (error) {
        res.status(500).json({ message: 'Error creating Group in controller', error });

  }
}
export const getGroup = async (req: Request, res: Response) => {
        //Group = {"name": "abc", "subgroups": "[]", "people": "[]", _id:}
try {
    const findGroup = req.body
    if (findGroup._id){   
         const foundGroup = await manGetGroup(findGroup);
        res.status(200).json(foundGroup);}
    else{
        const foundGroup = await manGetAllGroups();
        res.status(200).json(foundGroup)
    }
    }

 catch (error) {
        res.status(500).json({ message: 'Error finding group in Controller', error });
}
}

export const removeGroup = async (req: Request, res: Response) => {
       //Group = {"name": "abc", "subgroups": "[]", "people": "[]", _id:}
try {
    const rmvGroup = req.body
    const removedGroup = await manRmvGroup(rmvGroup);
    res.status(200).json(removedGroup);
} catch (error:any) {
    res.status(500).json({ message: error.message});
    }
}
export const updateGroup = async (req: Request, res: Response) => {
    // {
    //     "_id": "64b642b8f5f3f3d0a3c3a123",
    //     "updateFields": {
    //          {"name": "abc", "subgroups": "[]", "people": "[]", _id:}
    //     }
    //   }
try {
    const { _id, updateFields } = req.body;
    const completedUpdate = await manUpdateGroup( _id, updateFields );
    
    res.status(200).json(completedUpdate) 
} 
catch (error:any) {
     res.status(500).json({ message: error.message});
}
}