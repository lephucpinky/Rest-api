import express from 'express';
import { createEmployees, deleteEmployeesById, getAllEmployees, getEmployeesById, updateEmployeesById } from '../controller/Employee';
import { verifyToken } from '../utils/generateToken';




export default ( router: express.Router ) => {
    router.post('/Employees', createEmployees);
    router.get('/Employees', getAllEmployees);
    router.get('/Employees/:id', getEmployeesById );
    router.put('/Employees/:id', updateEmployeesById  );
    router.delete('/Employees/:id', deleteEmployeesById);
    
}