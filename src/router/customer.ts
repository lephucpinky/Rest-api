import express from 'express';
let { isAuthenticated, isAdmin } = require("../middleware/auth");
let {createCustomer,singleCustomer} = require("../controller/customerController");



export default ( router: express.Router ) => {
    router.post('/customers/create',isAuthenticated, createCustomer );
    router.get('/Customers' );
    router.get('/customers/:customer_id', singleCustomer);
    router.put('/Customers/:id'  );
    router.delete('/Customers/:id');
}