import { Products } from '../dao/factory.js';
import { generateProducts } from '../utils/utils.js';
import ProductsRepository from '../repositories/products.repository.js';

const productsDao = new Products();
const productsRepository = new ProductsRepository(productsDao);

export default class ProductsService {
    getProducts = async () => {
        const products = await productsRepository.get();
        return products;
    };

    getProductById = async(pid) => {
        const productById = await productsRepository.getByParam({ _id: pid });
        return productById;
    };

    postProduct = async(product) => {
        const result = await productsRepository.post(product);
        return result;
    };

    updateProductById = async(pid, product) => {
        const result = await productsRepository.update(pid, product);
        return result;
    };

    deleteProductById = async(pid) => {
        const result = await productsRepository.delete(pid);
        return result;
    };

    getMockProducts = () => {
        let products = [];
        for(let i=0; i<100; i++) {
            products.push(generateProducts());
        };
        return products;
    };
};