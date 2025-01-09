import { Request, Response } from 'express';
import {Types} from 'mongoose';
import { manCreatePerson, manGetPerson, manRmvPerson, manUpdatePerson } from './personManager.js';



export const createPerson = async (req: Request, res: Response) => {
            //Person  = {"name": "abcdefg", groupID: "", _id}
    try{
        const newPerson = req.body;
        const createdPerson = await manCreatePerson(newPerson)
        res.status(201).json({createdPerson});
    } catch (error) {
        res.status(500).json({ message: 'Error creating person in controller', error });

  }
}
export const getPerson = async (req: Request, res: Response) => {
    //Person  = {"name": "abcdefg", groupID: "", "_id": ""}
try {
    const findPerson = req.body
    const foundPerson = await manGetPerson(findPerson);
    res.status(200).json(foundPerson);
} catch (error) {
res.status(500).json({ message: 'Error finding person in Controller', error });
}
}

export const removePerson = async (req: Request, res: Response) => {
    //Person  = {"name": "abcdefg", groupID: "", "_id": ""}
try {  
    const rmvPerson = req.body;
    const person = await manRmvPerson(rmvPerson)
    console.log(person);
    res.status(200).json(person);
}  
catch (error) {
    res.status(500).json({ message: 'Error deleting person in Controller', error });
}
}
export const updatePerson = async (req: Request, res: Response) => {
    // {
    //     "_id": "64b642b8f5f3f3d0a3c3a123",
    //     "updateFields": {
    //       "name": "Updated Name",
    //     }
    //   }
try {

    const updatePerson = req.body;
       const updatedPerson = await manUpdatePerson(updatePerson, updatePerson.updateFields)
       res.status(200).json(updatedPerson)
} catch (error) {
    console.log('test')
res.status(500).json({ message: 'Error deleting person', error });
}
}