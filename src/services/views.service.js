import { Tickets } from "../dao/factory.js";
import productsModel from "../dao/mongo/models/products.model.js";
import TicketsRepository from "../repositories/tickets.repository.js";
import { v4 as uuid } from 'uuid';

const ticketsDao = new Tickets();
const ticketsRepository = new TicketsRepository(ticketsDao);

export default class ViewsService {
    getProducts = async(limit, page, sort, query) => {
        const response = productsModel.paginate({}, { limit, page, sort, query }) 
        return response;
    };

    generateTicket = async(purcharser, amount) => {
        const ticket = {
            code: uuid(),
            purchase_datetime: Date.now(),
            amount: amount,
            purcharser: purcharser
        };
        await ticketsRepository.post(ticket);
        return ticket;
    };
};