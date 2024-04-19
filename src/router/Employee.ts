import express from 'express';
import { authorizeAdmin, isAuthenticated } from '../middleware';
import { createEmployees, deleteEmployeesById, getAllEmployees, getEmployeesById, updateEmployeesById } from '../controller/Employee';




export default ( router: express.Router ) => {
    router.post('/Employees', createEmployees,isAuthenticated,authorizeAdmin);
    router.get('/Employees', getAllEmployees,isAuthenticated,authorizeAdmin );
    router.get('/Employees/:id', getEmployeesById,isAuthenticated,authorizeAdmin );
    router.put('/Employees/:id', updateEmployeesById ,isAuthenticated,authorizeAdmin );
    router.delete('/Employees/:id', deleteEmployeesById ,isAuthenticated,authorizeAdmin );
    
}