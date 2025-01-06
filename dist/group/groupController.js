var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { manCreateGroup, manGetGroup, manRmvGroup, manUpdateGroup } from './groupManager.js';
export const createGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Group = {"name": "abc", "subgroups": "[]", "people": "[]", _id:}
    try {
        const newGroup = req.body;
        manCreateGroup(newGroup);
        res.status(201).json({ newGroup });
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating Group in controller', error });
    }
});
export const getGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Group = {"name": "abc", "subgroups": "[]", "people": "[]", _id:}
    try {
        const findGroup = req.body;
        manGetGroup(findGroup);
        res.status(200).json(findGroup);
    }
    catch (error) {
        res.status(500).json({ message: 'Error finding group in Controller', error });
    }
});
export const removeGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Group = {"name": "abc", "subgroups": "[]", "people": "[]", _id:}
    try {
        const rmvGroup = req.body;
        manRmvGroup(rmvGroup);
        res.status(200).json(rmvGroup);
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting group in Controller', error });
    }
});
export const updateGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // {
    //     "_id": "64b642b8f5f3f3d0a3c3a123",
    //     "updateFields": {
    //          {"name": "abc", "subgroups": "[]", "people": "[]", _id:}
    //     }
    //   }
    try {
        const updateGroup = req.body;
        manUpdateGroup(updateGroup)
            .then(completedUpdate => res.status(200).json(completedUpdate));
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting group in Controller', error });
    }
});
//# sourceMappingURL=groupController.js.map