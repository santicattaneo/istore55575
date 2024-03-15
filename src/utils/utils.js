import path from 'path';
import { fileURLToPath } from 'url';
import { fakerES as faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.join(path.dirname(__filename), '..');
const __mainDirname = path.join(__dirname, '..');

const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
const isValidPassword = (painPassword, hashedPassword) => bcrypt.compareSync(painPassword, hashedPassword);

const generateProducts = () => {
    return {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        code: faker.string.alphanumeric(10),
        price: faker.commerce.price(),
        status: faker.datatype.boolean(),
        stock: faker.number.int(1),
        category: faker.commerce.category(),
        thumbnail: faker.image.url(),
        id: faker.database.mongodbObjectId()
    };
};

export {
    __dirname,
    __mainDirname,
    createHash,
    isValidPassword,
    generateProducts
};