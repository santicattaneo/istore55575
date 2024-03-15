import ticketsModel from './models/tickets.model.js';

export default class Tickets {
    constructor() {};

    get = async () => {
        const result = await ticketsModel.find().lean();
        return result;
    };

    post = async (ticket) => {
        const result = await ticketsModel.create(ticket);
        return result;
    };

    update = async (tid, body) => {
        const result = await ticketsModel.updateOne({ _id: tid }, body);
        return result;
    };

    delete = async (tid) => {
        const result = await ticketsModel.deleteOne({ _id: tid });
        return result;
    };
};