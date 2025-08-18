import { Router } from 'express';
import { getUsers, login, register } from '../controllers/authController';
 
const router = Router();

router.post('/login', login);
router.post('/register', register);
router.get('/getusers', getUsers);


export default router;