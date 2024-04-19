import express from 'express';
import { EmployeeModel } from '../models/employee.model';
//create
export const createEmployees = async (req: express.Request, res: express.Response) => {
    try {
        const {firstName, lastName, email } = req.body;
        const newEmployees = new EmployeeModel({firstName, lastName, email });
        await newEmployees.save();
        res.status(201).send(newEmployees);
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
//get all
export const getAllEmployees = async (req: express.Request, res: express.Response) => {
    try {
        const employees = await EmployeeModel.find();
        res.send(employees);
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
//Lấy thông tin của một nhân viên cụ thể
export const getEmployeesById = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const employees = await EmployeeModel.findById(id);
        if(!employees) {
            return res.status(404).send({ error: 'Employee not found' });
        }
        res.send(employees);
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
//update
export const updateEmployeesById = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const {firstName, lastName, email } = req.body;
        const updateEmployee = await EmployeeModel.findByIdAndUpdate(id,{firstName, lastName, email }, { new: true } )
        if(!updateEmployee) {
            return res.status(404).send({ error: 'Employee not found' });
        }
        res.send(updateEmployee);
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

//xoa
export const deleteEmployeesById = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const deleteEmployee = await EmployeeModel.findByIdAndDelete(id)
        if(!deleteEmployee) {
            return res.status(404).send({ error: 'Employee not found' });
        }
        res.send(deleteEmployee);
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
