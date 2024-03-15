export default class UsersRepository {
    constructor(dao) {
        this.dao = dao;
    };

    getByParam = async(param) => {
        const user = await this.dao.getByParam(param);
        return user;
    };

    post = async(user) => {
        const response = await this.dao.post(user);
        return response;
    };
};