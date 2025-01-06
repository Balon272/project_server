import { Request, Response } from 'express';
import {Types} from 'mongoose';
import { manCreatePerson, manGetPerson, manRmvPerson, manUpdatePerson } from './personManager.js';



export const createPerson = async (req: Request, res: Response) => {
            //Person  = {"name": "abcdefg", groupID: "", _id}
    try{
        const newPerson = req.body;
        manCreatePerson(newPerson)
        res.status(201).json({newPerson});
    } catch (error) {
        res.status(500).json({ message: 'Error creating person in controller', error });

  }
}
export const getPerson = async (req: Request, res: Response) => {
    //Person  = {"name": "abcdefg", groupID: "", "_id": ""}
try {
    const findPerson = req.body
    manGetPerson(findPerson);
    res.status(200).json(findPerson);
} catch (error) {
res.status(500).json({ message: 'Error finding person in Controller', error });
}
}

export const removePerson = async (req: Request, res: Response) => {
    //Person  = {"name": "abcdefg", groupID: "", "_id": ""}
try {
    const rmvPerson = req.body
    manRmvPerson(rmvPerson);
    res.status(200).json(rmvPerson);
} catch (error) {
res.status(500).json({ message: 'Error deleting person in Controller', error });
}
}
export const updatePerson = async (req: Request, res: Response) => {
    // {
    //     "_id": "64b642b8f5f3f3d0a3c3a123",
    //     "updateFields": {
    //       "name": "Updated Name",
    //       "groupID": "64b642b8f5f3f3d0a3c3a456",
    //     }
    //   }
try {
    const updatePerson = req.body
    manUpdatePerson(updatePerson);
    res.status(200).json(updatePerson[1]);
} catch (error) {
res.status(500).json({ message: 'Error deleting person in Controller', error });
}
}