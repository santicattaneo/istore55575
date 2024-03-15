import { Router } from 'express';
import UsersController from '../controllers/users.controller.js';
import { accessRolesEnum } from '../config/enums.config.js';
import roleAccessMiddleware from '../middlewares/roleAccess.middleware.js';

const router = Router();

const usersController = new UsersController();

router.post('/register', roleAccessMiddleware(accessRolesEnum.PUBLIC), async(req, res) => { await usersController.register(req, res) });
router.post('/login', roleAccessMiddleware(accessRolesEnum.PUBLIC), async(req, res) => { await usersController.login(req, res) });
router.get('/logout', roleAccessMiddleware(accessRolesEnum.USER, accessRolesEnum.ADMIN), async(req, res) => { await usersController.logout(req, res) });

export default router;