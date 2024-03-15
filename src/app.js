import express from "express";
import handlebars from 'express-handlebars';
import env from './config/config.js';
import session from "express-session";
import MongoStore from "connect-mongo";
import { __dirname, __mainDirname } from './utils/utils.js';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';

import cartsRouter from './routes/carts.router.js';
import productsRouter from './routes/products.router.js';
import usersRouter from './routes/users.router.js';
import viewsRouter from './routes/views.router.js';
import mongoose from "mongoose";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    store: MongoStore.create({
        client: mongoose.connection.getClient(),
        ttl: 3600
    }),
    secret: env.sessionSecret,
    resave: true,
    saveUninitialized: false
}));

app.use(express.static(`${__dirname}/public`));

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Documentacion Proyecto Ecommerce 55575',
            description: 'API desarrollada para la carrera de Desarollo Backend en CoderHouse'
        }
    },
    apis: [`${__mainDirname}/docs/**/*.yaml`]
};
const specs = swaggerJsdoc(swaggerOptions);

app.use('/api/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));
app.use('/api/carts', cartsRouter);
app.use('/api/products', productsRouter);
app.use('/api/users', usersRouter);
app.use('/', viewsRouter);

app.listen(+env.port, () => console.log(`Listening on port ${+env.port}`));