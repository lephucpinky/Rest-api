import express from 'express';
import { EmployeeModel } from '../models/employee.model';
//create
export const createEmployees = async (req: express.Request, res: express.Response) => {
    try {
        const { name, position, office, salary } = req.body;
        if (!name || !position || !office || salary === undefined) {
            return res.status(400).send({ error: 'All fields are required' });
        }
        const employee = new EmployeeModel({ name, position, office, salary });
        await employee.save();
        res.status(201).send(employee);
    } catch (error:any) {
        res.status(400).send({ error: error.message });
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
        const updateFields: any = {};
        const { name, position, office, salary } = req.body;

        // Check if all fields are provided
        if (name !== undefined) updateFields.name = name;
        if (position !== undefined) updateFields.position = position;
        if (office !== undefined) updateFields.office = office;
        if (salary !== undefined) updateFields.salary = salary;
        const employee = await EmployeeModel.findByIdAndUpdate(
            req.params.id,
            { $set: updateFields },
            { new: true, runValidators: true }
        );
        if (!employee) {
            return res.status(404).send({ message: 'Employee not found' });
        }

        res.send(employee);
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

//xoa
export const deleteEmployeesById = async (req: express.Request, res: express.Response) => {
    try {
        const employee = await EmployeeModel.findByIdAndDelete(req.params.id);
        if (!employee) {
            return res.status(404).send({ message: 'Employee not found' });
        }
        res.send({ message: 'Employee deleted successfully' });
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
