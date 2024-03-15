import { Router } from 'express';
import ProductsController from '../controllers/products.controller.js';
import { accessRolesEnum } from '../config/enums.config.js';
import roleAccessMiddleware from '../middlewares/roleAccess.middleware.js';

const router = Router();

const productsController = new ProductsController();

router.get('/', roleAccessMiddleware(accessRolesEnum.USER), async(req, res) => { await productsController.getProducts(req, res) });
router.get('/:pid', roleAccessMiddleware(accessRolesEnum.USER), async(req, res) => { await productsController.getProductById(req, res) });
router.get('/mocking-products', roleAccessMiddleware(accessRolesEnum.ADMIN), async(req, res) => { await productsController.getMockProducts(req, res) });
router.post('/', roleAccessMiddleware(accessRolesEnum.ADMIN), async(req, res) => { await productsController.postProduct(req, res) });
router.put('/:pid', roleAccessMiddleware(accessRolesEnum.ADMIN), async(req, res) => { await productsController.updateProductById(req, res) });
router.delete('/:pid', roleAccessMiddleware(accessRolesEnum.ADMIN), async(req, res) => { await productsController.deleteProductById(req, res) });

export default router;