import express from 'express';

let {register, login, logout} = require("../controller/authController");

export default (router:express.Router) => {
    router.post('/users/register', register);
    router.post('/users/login', login );
    router.post("/users/logout", logout);
    
}