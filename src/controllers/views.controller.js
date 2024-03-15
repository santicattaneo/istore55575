import ViewsService from "../services/views.service.js";
import ProductsService from "../services/products.service.js";
import CartsService from "../services/carts.service.js";

export default class ViewsController {
    constructor() {
        this.viewsService = new ViewsService();
        this.productsService = new ProductsService();
        this.cartsService = new CartsService();
    };

    registerView = async (req, res) => {
        try {
            res.render('register')
        } catch (error) {
            res.status(500).send({ status: 'error', error: error.name, description: error.message });
        }
    };

    loginView = async (req, res) => {
        try {
            res.render('login');
        } catch (error) {
            res.status(500).send({ status: 'error', error: error.name, description: error.message });
        }
    };

    productsView = async (req, res) => {
        try {
            const { page = 1, limit = 5, sort, query } = req.query;
            const { docs, hasPrevPage, hasNextPage, nextPage, prevPage } = await this.viewsService.getProducts(limit, page, sort, query);
            const plainObjects = docs.map(doc => doc.toObject());
            const session = req.session.user
            res.render('products', {
                products: plainObjects,
                user: session.name,
                hasPrevPage,
                hasNextPage,
                currentPage: parseInt(page),
                nextPage,
                prevPage
            });
        } catch (error) {
            res.status(500).send({ status: 'error', error: error.name, description: error.message });
        };
    };

    detailsView = async(req, res) => {
        try {
            const { pid } = req.query;
            if(!pid) {
                return res.status(400).send({ status: 'error', description: 'missing product id' });
            };

            const product = await this.productsService.getProductById(pid);
            
            const plainProduct = product.toObject();
            res.render('details', { product: plainProduct });
        } catch (error) {
            res.status(500).send({ status: 'error', error: error.name, description: error.message });
        };
    };

    purchaseView = async(req, res) => {
        try {
            const { pid } = req.query;
            if(!pid) {
                return res.status(400).send({ status: 'error', description: 'missing product id' });
            };

            const { _id } = await this.cartsService.createCart({ product: pid });
            const cid = _id.toString();
            req.session.user.cart = cid;
            const product = await this.productsService.getProductById(pid);
            const plainProduct = product.toObject();

            res.render('purchase', { product: plainProduct, cartId: cid });
        } catch (error) {
            res.status(500).send({ status: 'error', error: error.name, description: error.message });
        };
    };

    orderView = async(req, res) => {
        try {
            const { pid, cid } = req.query;
            if(!pid) {
                return res.status(400).send({ status: 'error', description: 'missing product id' });
            };

            const cart = await this.cartsService.getCartById(cid)
            const product = await this.productsService.getProductById(pid);
            const plainProduct = product.toObject();
            
            product.stock--;
            await this.productsService.updateProductById(pid, product);
            
            const purcharser = req.session.name;
            const amount = product.price;
            const ticket = await this.viewsService.generateTicket(purcharser, amount);
            
            await this.cartsService.deleteCart(cid);

            res.render('order', { ticket: ticket, product: plainProduct, user: req.session.user});
        } catch (error) {
            res.status(500).send({ status: 'error', error: error.name, description: error.message });
        }
    };
};