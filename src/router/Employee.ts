import express from 'express';
import { createEmployees, deleteEmployeesById, getAllEmployees, getEmployeesById, updateEmployeesById } from '../controller/Employee';
import { middleWareToken } from '../controller/Middleware.controller';




export default ( router: express.Router ) => {
    router.post('/Employees',middleWareToken.verifyToken, createEmployees);
    router.get('/Employees',middleWareToken.verifyToken, getAllEmployees);
    router.get('/Employees/:id',middleWareToken.verifyToken, getEmployeesById );
    router.put('/Employees/:id',middleWareToken.verifyToken, updateEmployeesById  );
    router.delete('/Employees/:id',middleWareToken.verifyToken, deleteEmployeesById);
}
