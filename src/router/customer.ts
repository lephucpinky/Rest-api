import express from 'express';
let { isAuthenticated, isAdmin } = require("../middleware/auth");
let {createCustomer,singleCustomer,updateCustomer,deleteCustomer,allCustomer} = require("../controller/customerController");



export default ( router: express.Router ) => {
    router.post('/customers/create',isAuthenticated, createCustomer );
    router.get('/customers/all',allCustomer );
    router.get('/customers/:customer_id', singleCustomer);
    router.put('/customers/admin/edit/:customer_id', isAuthenticated,isAdmin,updateCustomer  );
    router.delete('/customers/admin/delete/:customer_id',isAuthenticated,isAdmin,deleteCustomer);
}