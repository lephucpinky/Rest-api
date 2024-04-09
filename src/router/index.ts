import express from 'express';
import Authentication from './Authentication';
import User from './User';

const router = express.Router();

export default (): express.Router => {
    Authentication(router);
    User(router);
    return router;
}
