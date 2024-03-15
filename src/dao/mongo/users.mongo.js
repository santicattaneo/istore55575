import usersModel from './models/users.model.js';

export default class Users {
    constructor() {};

    getByParam = async (param) => {
        const user = await usersModel.findOne(param);
        return user;
    };
    
    post = async (user) => {
        const result = await usersModel.create(user);
        return result;
    };

    update = async (uid, body) => {
        const result = await usersModel.updateOne({ _id: uid }, body);
        return result;
    };

    delete = async (uid) => {
        const result = await usersModel.deleteOne({ _id: uid });
        return result;
    };
};