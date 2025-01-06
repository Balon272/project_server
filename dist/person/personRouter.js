import { Router } from 'express';
import { createPerson, getPerson, removePerson, updatePerson } from './personController.js';
//import { getPerson, removePerson, updatePerson} from './personController';
const personRouter = Router();
personRouter.post('/people/post', createPerson);
personRouter.get('/people/get', getPerson);
personRouter.delete('/people/delete', removePerson);
personRouter.patch('/people/patch', updatePerson);
export default personRouter;
//# sourceMappingURL=personRouter.js.map