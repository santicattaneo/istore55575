import cartsModel from './models/carts.model.js'

export default class Carts {
    constructor() {};

    get = async () => {
        const result = await cartsModel.find().lean();
        return result;
    };

    getByParam = async (param) => {
        const result = await cartsModel.findOne(param);
        return result
    };

    post = async (pid) => {
        const result = await cartsModel.create(pid);
        return result;
    };

    update = async (cid, body) => {
        const result = await cartsModel.updateOne({ _id: cid }, body);
        return result
    };

    deleteById = async (cid) => {
        const result = await cartsModel.deleteOne({ _id: cid });
        return result;
    };

    deleteProduct = async (cid, pid) => {
        const result = await cartsModel.updateOne({ _id: cid }, { $pull: { products: { _id: pid }}})
        return result;
    };

    updateProduct = async (cid, pid, quantity) => {
        const result = await cartsModel.updateOne({ _id: cid, 'products.product_id': pid }, { $set: { 'products.$.quantity': quantity }}, { new: true });
        return result;
    };
};