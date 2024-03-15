import { v4 as uuid } from 'uuid';

import { Carts, Products, Tickets } from "../dao/factory.js";

import CartsRepository from '../repositories/carts.repository.js';
import TicketsRepository from '../repositories/tickets.repository.js';
import ProductsRepository from "../repositories/products.repository.js";

const cartsDao = new Carts();
const cartsRepository = new CartsRepository(cartsDao);

const ticketsDao = new Tickets();
const ticketsRepository = new TicketsRepository(ticketsDao);

const productsDao = new Products();
const productsRepository = new ProductsRepository(productsDao);

export default class CartsService {
    getCartById = async(cid) => {
        const cart = await cartsRepository.getByParam({ _id: cid });
        return cart;
    };

    createCart = async(pid) => {
        const result = await cartsRepository.post(pid);
        return result;
    };

    postProductOnCart = async(cid, pid, quantity) => {
        const result = await cartsRepository.updateProduct(cid, pid, quantity);
        return result;
    };

    purchase = async(cid) => {
        const cart = await cartsRepository.getByParam({ _id: cid });
        for(const prodInCart of cart.products) {
            const productInDb = await productsRepository.getByParam({ _id: prodInCart._id });
            if(prodInCart.quantity <= productInDb.stock) {
                productInDb.stock -= prodInCart.quantity;
                await productsRepository.update(productInDb._id, productInDb);
            } else {
                return 'not enough stock';
            };
        };
        const ticket = {
            code: uuid(),
            purchase_datetime: Date.now(),
            purcharser: req.session.user.email
        };
        await ticketsRepository.post(ticket);
        return 'ticket created';
    };

    deleteCart = async(cid) => {
        await cartsRepository.deleteById(cid);
        return;
    };
};