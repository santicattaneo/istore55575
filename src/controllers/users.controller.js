import UsersService from "../services/users.service.js";
import { isValidPassword } from "../utils/utils.js";

export default class UsersController {
    constructor() {
        this.usersService = new UsersService();
    };

    register = async(req, res) => {
        try {
            const { first_name, last_name, age, email, password } = req.body;
            if(!first_name || !last_name || !age || !email || !password) {
                return res.status(422).send({ status: 'error', description: 'incomplete values' });
            };
            
            const exists = await this.usersService.getUserByEmail(email);
            if(exists){
                return res.status(400).send({ status: 'error', description: 'user already exists' });
            };

            await this.usersService.createUser(first_name, last_name, age, email, password);
            res.status(201).send({ status: 'success', message: 'user registered' });
        } catch (error) {
            res.status(500).send({ status: 'error', error: error.name, description: error.message });
        };
    };
    
    login = async(req, res) => {
        try {
            const { email, password } = req.body;
            if(!email || !password) {
                return res.status(422).send({ status: 'error', description: 'incomplete values' });
            };
            
            const exists = await this.usersService.getUserByEmail(email);
            if(!exists){
                return res.status(400).send({ status: 'error', description: 'user not found' });
            };
            if(!isValidPassword(password, exists.password)){
                return res.status(400).send({ status: 'error', description: 'incorrect credentials' });
            };

            req.session.user = {
                name: `${exists.first_name} ${exists.last_name}`,
                email: exists.email,
                age: exists.age,
                role: exists.role
            };

            res.send({ status: 'success', message: 'login successfully' });
        } catch (error) {
            res.status(500).send({ status: 'error', error: error.name, description: error.message });
        };
    };

    logout = async (req, res) => {
        try {
            req.session.destroy((error) => {
                if(error) {
                    return res.status(500).send({ status: 'error', error: error.name, description: error.message });
                }
                res.redirect('/login');
            });
        } catch (error) {
            res.status(500).send({ status: 'error', error: error.name, description: error.message });
        };
    };
};