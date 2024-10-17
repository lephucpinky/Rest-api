import express from "express";
let { isAuthenticated, isAdmin } = require("../middleware/auth");
let {
  allUsers,
  singleUser,
  editUser,
  deleteUser,
} = require("../controller/userController");


export default (router:express.Router) => {
    router.get("/users", isAuthenticated, isAdmin, allUsers); 
    router.get("/users/:id", isAuthenticated, singleUser); 
    router.put("/users/edit/:id", isAuthenticated, editUser); 
    router.delete("/users/admin/delete/:id", isAuthenticated, isAdmin, deleteUser);
}