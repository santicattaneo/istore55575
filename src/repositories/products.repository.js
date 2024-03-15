export default class ProductsRepository {
    constructor(dao) {
        this.dao = dao;
    };

    get = async() => {
        const products = await this.dao.get();
        return products;
    };

    getByParam = async(param) => {
        const product = await this.dao.getByParam(param);
        return product
    };

    post = async(product) => {
        const response = await this.dao.post(product);
        return response;
    };

    update = async(pid, product) => {
        const result = await this.dao.update(pid, product);
        return result;
    };

    delete = async(pid) => {
        const result = this.dao.delete(pid);
        return result;
    };
};