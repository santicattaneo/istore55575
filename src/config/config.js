import dotenv from 'dotenv';
import { __mainDirname } from '../utils/utils.js';

dotenv.config({
    path: `${__mainDirname}/.env`
});

export default {
    persistence: process.env.PERSISTENCE,
    mongoUrl: process.env.MONGO_URL,
    port: process.env.PORT,
    sessionSecret: process.env.SESSION_SECRET
};