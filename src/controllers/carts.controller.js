import CartsService from '../services/carts.service.js';

export default class CartsController {
    constructor() {
        this.cartsService = new CartsService();
    };

    getCartById = async(req, res) => {
        try {
            const { cid } = req.params;
            if(!cid) {
                return res.status(400).send({ status: 'error', description: 'missing cart id' });
            };
            
            const cart = await this.cartsService.getCartById(cid);
            if(!cart) {
                res.status(400).send({ status: 'error', description: 'cart does not exists' });
            };

            res.send({ status: 'success', payload: cart });
        } catch (error) {
            res.status(500).send({ status: 'error', error: error.name, description: error.message });
        };
    };

    postCart = async(req, res) => {
        try {
            const { products } = req.body;
            if(!products || typeof products !== 'array') {
                return res.status(400).send({ status: 'error', description: 'products array is necessary' });
            };

            await this.cartsService.postCart(products);
            res.status(201).send({ status: 'success', message: 'cart created' });
        } catch (error) {
            res.status(500).send({ status: 'error', error: error.name, description: error.message });
        }
    };

    postProductOnCart = async(req, res) => {
        try {
            const { cid, pid, quantity } = req.params;
            if(!cid || !pid || !quantity) {
                return res.status(400).send({ status: 'error', description: 'cart id, product id and product quantity are necessary' });
            };

            await this.cartsService.postProductOnCart(cid, pid, quantity);
            res.status(201).send({ status: 'success', message: 'product added to cart' });
        } catch (error) {
            res.status(500).send({ status: 'error', error: error.name, description: error.message });
        }
    };

    purchase = async(req, res) => {
        try {
            const { cid } = req.params;
            if(!cid) {
                return res.status(400).send({ status: 'error', description: 'cart id is necessary' });
            };

            const result = await this.cartsService.purchase(cid);
            if(result === 'ticket created') {
                res.status(201).send({ status: 'success', message: 'ticket created' });
            } else {
                res.status(400).send({ status: 'error', description: 'not enough stock' });
            };
        } catch (error) {
            res.status(500).send({ status: 'error', error: error.name, description: error.message });
        };
    };
};