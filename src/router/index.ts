import express from 'express';

import authRoute from './authRoute';
import customer from './customer';
import user from './user';


const router = express.Router();

export default (): express.Router => {
    authRoute(router);
    customer(router);
    user(router);
    return router;
}