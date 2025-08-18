import { Router } from 'express';
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  assignRoleToUser,
  assignPermissionToUser,
} from '../controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware';
import { checkPermission } from '../middleware/roleMiddleware';

const router = Router();

router.post('/', authMiddleware, checkPermission('create_user'), createUser);
router.get('/', authMiddleware, checkPermission('view_users'), getUsers);
router.get('/:id', authMiddleware, checkPermission('view_user'), getUserById);
router.put('/:id', authMiddleware, checkPermission('update_user'), updateUser);
router.delete('/:id', authMiddleware, checkPermission('delete_user'), deleteUser);
router.post('/assign-role', authMiddleware, checkPermission('assign_role'), assignRoleToUser);
router.post('/assign-permission', authMiddleware, checkPermission('assign_permission'), assignPermissionToUser);

export default router;