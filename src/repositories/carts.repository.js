export default class CartsRepository {
    constructor(dao) {
        this.dao = dao;
    };

    get = async() => {
        const carts = await this.dao.get();
        return carts;
    };

    getByParam = async(param) => {
        const cart = await this.dao.getByParam(param);
        return cart;
    };

    post = async(pid) => {
        const result = this.dao.post(pid);
        return result;
    };

    update = async(cid, cart) => {
        const result = await this.dao.update(cid, cart);
        return result;
    };

    deleteById = async(cid) => {
        const result = this.dao.deleteById(cid);
        return result;
    };

    deleteProduct = async(cid, pid) => {
        const result = await this.dao.deleteProduct(cid, pid);
        return result;
    };

    updateProduct = async(cid, pid, quantity) => {
        const result = await this.dao.updateProduct(cid, pid, quantity);
        return result;
    };
};