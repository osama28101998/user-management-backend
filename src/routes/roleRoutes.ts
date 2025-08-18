import { Router } from 'express';
import {
  createRole,
  getRoles,
  getRoleById,
  updateRole,
  deleteRole,
  assignPermissionToRole,
} from '../controllers/roleController';
import { authMiddleware } from '../middleware/authMiddleware';
import { checkPermission } from '../middleware/roleMiddleware';

const router = Router();

router.post('/', authMiddleware, checkPermission('create_role'), createRole);
router.get('/', authMiddleware, checkPermission('view_roles'), getRoles);
router.get('/:id', authMiddleware, checkPermission('view_role'), getRoleById);
router.put('/:id', authMiddleware, checkPermission('update_role'), updateRole);
router.delete('/:id', authMiddleware, checkPermission('delete_role'), deleteRole);
router.post('/assign-permission', authMiddleware, checkPermission('assign_permission'), assignPermissionToRole);

export default router;