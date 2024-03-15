export default class TicketsRepository {
    constructor(dao) {
        this.dao = dao;
    };

    post = async(ticket) => {
        const result = await this.dao.post(ticket);
        return result;
    };
};