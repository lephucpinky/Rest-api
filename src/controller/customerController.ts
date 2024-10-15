let Customer = require("../models/customerModel");

import { NextFunction, Request, Response } from "express";




//create customer
exports.createCustomer = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const {name, email,phoneNumber,address} = req.body;   
        const customer = await Customer.create({
            name,
            email,
            phoneNumber,
            address,
        });
        res.status(201).json({
            success: true,
            customer,
        });
    } catch (error) {
        console.log(error);
        return next(error);
    }
};

//single customer
exports.singleCustomer = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const customer = await Customer.findById(req.params.customer_id);
        res.status(200).json({
            success: true,
            customer,
        })
        
        
    } catch (error) {
        console.log(error);
        return next(error);
    }
}

//all customer
exports.allCustomer = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const customers = await Customer.find();
        res.status(200).json({
            success: true,
            customers,
        })
    } catch (error) {
        console.log(error);
        return next(error);
    }
}

//update customer by id
exports.updateCustomer = async(req: Request, res: Response, next: NextFunction) =>{
    try {
        const customer = await Customer.findByIdAndUpdate(req.params.customer_id, req.body, {
            new: true,
        });
        res.status(200).json({
            success: true,
            customer,
        })
    } catch (error) {
        console.log(error);
        return next(error);
    }
};      

//delete customer by id
exports.deleteCustomer =  async(req: Request, res: Response, next: NextFunction) =>{
    try {
        const customer = await Customer.findByIdAndDelete(req.params.customer_id);
        res.status(200).json({
            success: true,
            customer,
        })
    } catch (error) {
        console.log(error);
        return next(error);
    }
}