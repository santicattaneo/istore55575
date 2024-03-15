import ProductsService from '../services/products.service.js';

export default class ProductsController {
    constructor () {
        this.productsService = new ProductsService();
    };

    getProducts = async (req, res) => {
        try {
            const products = await this.productsService.getProducts();
            res.send({ status: 'success', payload: products });
        } catch (error) {
            res.status(500).send({ status: 'error', error: error.name, description: error.message });
        };
    };

    getProductById = async (req, res) => {
        try {
            const { pid } = req.params;
            if(!pid) {
                return res.status(400).send({ status: 'error', description: 'missing product id' });
            };

            const product = await this.productsService.getProductById(pid);
            if(!product) {
                return res.status(400).send({ status: 'error', description: 'product does not exists' });
            };

            res.send({ status: 'success', payload: product });
        } catch (error) {
            res.status(500).send({ status: 'error', error: error.name, description: error.message });
        };
    };

    postProduct = async (req, res) => {
        try {
            const { title, description, code, price, status = true, stock, category, thumbnail = [], owner = 'ADMIN' } = req.body;
            if(!title, !description, !code, !price, !stock, !category) {
                return res.status(422).send({ status: 'error', description: 'product keys incomplete' });
            };

            const product = {
                title: title,
                description: description,
                code: code,
                price: price,
                status: status,
                stock: stock,
                category: category,
                thumbnail: thumbnail,
                owner: owner
            };
            req.files.forEach((file) => {
                const filename = file.filename;
                product.thumbnail.push(`http://localhost:8080/img/${filename}`);
            });
            
            await this.productsService.postProduct(product);
            res.status(201).send({ status: 'success', message: 'product created' });
        } catch (error) {
            res.status(500).send({ status: 'error', error: error.name, description: error.message });
        };
    };

    updateProductById = async (req, res) => {
        try {
            const { pid } = req.params;
            if(!pid) {
                return res.status(400).send({ status: 'error', description: 'missing product id' });
            };
            
            const { title, description, code, price, status = true, stock, category, thumbnail = [], owner = 'ADMIN' } = req.body;
            if(!title, !description, !code, !price, !stock, !category) {
                return res.status(422).send({ status: 'error', description: 'product keys incomplete' });
            };
            const product = {
                title: title,
                description: description,
                code: code,
                price: price,
                status: status,
                stock: stock,
                category: category,
                thumbnail: thumbnail,
                owner: owner
            };
            req.files.forEach((file) => {
                const filename = file.filename;
                product.thumbnail.push(`http://localhost:8080/img/${filename}`);
            });
            
            await this.productsService.updateProductById(pid, product);
            res.status(201).send({ status: 'success', message: 'product updated' });
        } catch (error) {
            res.status(500).send({ status: 'error', error: error.name, description: error.message });
        };
    };

    deleteProductById = async (req, res) => {
        try {
            const { pid } = req.params;
            if(!pid) {
                return res.status(400).send({ status: 'error', description: 'missing product id' });
            };

            await this.productsService.deleteProductById(pid);
            res.send({ status: 'success', message: 'product deleted' });
        } catch (error) {
            res.status(500).send({ status: 'error', error: error.name, description: error.message });
        };
    };

    getMockProducts = async (req, res) => {
        try {
            const products = this.productsService.getMockProducts();
            res.send({ status: 'success', payload: products });
        } catch (error) {
            res.status(500).send({ status: 'error', error: error.name, description: error.message });
        };
    };
};