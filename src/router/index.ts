import express from 'express';
import Authentication from './Authentication';
import Employee from './Employee';

const router = express.Router();

export default (): express.Router => {
    Authentication(router);
    Employee(router);
    return router;
}
