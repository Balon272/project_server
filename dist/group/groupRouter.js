import { Router } from 'express';
import { createGroup, getGroup, removeGroup, updateGroup } from './groupController.js';
const groupRouter = Router();
groupRouter.post('/group/post', createGroup);
groupRouter.get('/group/get', getGroup);
groupRouter.delete('/group/delete', removeGroup);
groupRouter.patch('/group/patch', updateGroup);
export default groupRouter;
//# sourceMappingURL=groupRouter.js.map