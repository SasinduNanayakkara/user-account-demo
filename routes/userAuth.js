const router = require("express").Router();
const {addUser, userLogin, getUsers, updateUser, deleteUser} = require("../controllers/user.controller");
const User = require("../models/user");
const verifyToken = require("../verifyToken");

//define user routes
router.post("/register", addUser);
router.post("/login", userLogin);
router.get("/users", verifyToken, getUsers); //private route
router.put("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", deleteUser);

module.exports = router;