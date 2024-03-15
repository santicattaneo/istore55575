import env from "../config/config.js";

const persistence = env.persistence;

export let Carts;
export let Products;
export let Tickets;
export let Users;

switch(persistence) {
    case 'MONGO':
        console.log('Working with DB');

        const mongoose = await import('mongoose');
        await mongoose.connect(env.mongoUrl);

        const { default: CartsMongo } = await import('./mongo/carts.mongo.js');
        const { default: ProductsMongo } = await import('./mongo/products.mongo.js');
        const { default: TicketsMongo } = await import('./mongo/tickets.mongo.js');
        const { default: UsersMongo } = await import('./mongo/users.mongo.js');

        Carts = CartsMongo;
        Products = ProductsMongo;
        Tickets = TicketsMongo;
        Users = UsersMongo;

        break;
    case 'FILES':
        console.log('No files in DB');
        break;
};