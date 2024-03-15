import { Users } from "../dao/factory.js";
import UsersRepository from "../repositories/users.repository.js";
import { createHash } from "../utils/utils.js";

const usersDao = new Users();
const usersRepository = new UsersRepository(usersDao);

export default class UsersService {
    getUserByEmail = async(email) => {
        const userByEmail = await usersRepository.getByParam({ email: email });
        return userByEmail;
    };

    createUser = async(first_name, last_name, age, email, password) => {
        const user = {
            first_name: first_name,
            last_name: last_name,
            email: email,
            age: age,
            password: createHash(password)
        };
        const result = await usersRepository.post(user);
        return result;
    };
};