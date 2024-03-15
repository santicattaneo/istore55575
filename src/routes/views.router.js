import { Router } from 'express';
import ViewsController from '../controllers/views.controller.js';
import { accessRolesEnum } from '../config/enums.config.js';
import roleAccessMiddleware from '../middlewares/roleAccess.middleware.js';
const router = Router();

const viewsController = new ViewsController();

router.get('/login', roleAccessMiddleware(accessRolesEnum.PUBLIC), async(req, res) => { await viewsController.loginView(req, res) });
router.get('/register', roleAccessMiddleware(accessRolesEnum.PUBLIC), async(req, res) => { await viewsController.registerView(req, res) });
router.get('/products', roleAccessMiddleware(accessRolesEnum.USER), async(req, res) => { await viewsController.productsView(req, res) });
router.get('/details', roleAccessMiddleware(accessRolesEnum.USER), async(req, res) => { await viewsController.detailsView(req,res) });
router.get('/purchase', roleAccessMiddleware(accessRolesEnum.USER), async(req, res) => { await viewsController.purchaseView(req,res) });
router.get('/order', roleAccessMiddleware(accessRolesEnum.USER), async(req, res) => { await viewsController.orderView(req,res) });

export default router;