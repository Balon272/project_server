import { Request, Response } from 'express';
import {Types} from 'mongoose';
import { manCreateGroup, manGetGroup, manRmvGroup, manUpdateGroup } from './groupManager.js';



export const createGroup = async (req: Request, res: Response) => {
            //Group = {"name": "abc", "subgroups": "[]", "people": "[]", _id:}
    try{
        const newGroup = req.body;
        manCreateGroup(newGroup)
        res.status(201).json({newGroup});
    } catch (error) {
        res.status(500).json({ message: 'Error creating Group in controller', error });

  }
}
export const getGroup = async (req: Request, res: Response) => {
        //Group = {"name": "abc", "subgroups": "[]", "people": "[]", _id:}
try {
    const findGroup = req.body
    manGetGroup(findGroup);
    res.status(200).json(findGroup);
} catch (error) {
res.status(500).json({ message: 'Error finding group in Controller', error });
}
}

export const removeGroup = async (req: Request, res: Response) => {
       //Group = {"name": "abc", "subgroups": "[]", "people": "[]", _id:}
try {
    const rmvGroup = req.body
    manRmvGroup(rmvGroup);
    res.status(200).json(rmvGroup);
} catch (error) {
res.status(500).json({ message: 'Error deleting group in Controller', error });
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
    const updateGroup = req.body;
    manUpdateGroup(updateGroup)
    .then(completedUpdate => res.status(200).json(completedUpdate))
} catch (error) {
res.status(500).json({ message: 'Error deleting group in Controller', error });
}
}