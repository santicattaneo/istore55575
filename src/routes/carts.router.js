import { Router } from 'express';
import CartsController from '../controllers/carts.controller.js';
import { accessRolesEnum } from '../config/enums.config.js';
import roleAccessMiddleware from '../middlewares/roleAccess.middleware.js';

const router = Router();

const cartsController = new CartsController();

router.get('/:cid', roleAccessMiddleware(accessRolesEnum.USER), async(req, res) => { await cartsController.getCartById(req, res) });
router.get('/:cid/purchase', roleAccessMiddleware(accessRolesEnum.USER), async(req, res) => { await cartsController.purchase(req, res) });
router.post('/', roleAccessMiddleware(accessRolesEnum.USER), async(req, res) => { await cartsController.postCart(req, res) });
router.post('/:cid/product/:pid', roleAccessMiddleware(accessRolesEnum.USER), async(req, res) => { await cartsController.postProductOnCart(req, res) });

export default router;