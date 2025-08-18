import { Router } from 'express';
import {
  createPermission,
  getPermissions,
  getPermissionById,
  updatePermission,
  deletePermission,
} from '../controllers/permissionController';
import { authMiddleware } from '../middleware/authMiddleware';
import { checkPermission } from '../middleware/roleMiddleware';

const router = Router();

router.post('/', createPermission);
router.get('/', authMiddleware, checkPermission('view_permissions'), getPermissions);
router.get('/:id', authMiddleware, checkPermission('view_permission'), getPermissionById);
router.put('/:id', authMiddleware, checkPermission('update_permission'), updatePermission);
router.delete('/:id', authMiddleware, checkPermission('delete_permission'), deletePermission);

export default router;