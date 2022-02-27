const User = require("../models/user");
const {registerValidation, lologinValidation} = require("../validation/userValidation");
const bcrypt = require("bcryptjs");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");


//user ragistration function
const addUser = async (req,res) => {
    
    //validate the user input fields
    const {error} = registerValidation(req.body);
    if(error) {
        res.send({message:error['details'][0]['message']});
    }

    //to check user already exist
    const userExist = await User.findOne({email: req.body.email});
    if(userExist) {
        return res.status(400).send({message: "User already exist"});
    }

    //hash the password
    const salt = await bcryptjs.genSalt(5);
    const hashedPassword = await bcryptjs.hash(req.body.password, salt);

    //assign data to the model
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        username: req.body.username,
        password: hashedPassword,
    });
    
    try {
        //save the data in the database
        const savedUser = await user.save();
        res.send(savedUser);
    }
    catch(error) { //error handling
        res.status(400).send({message:error});
    }

}

//user login function
const userLogin = async (req,res) => {
    //validate the user input fields
    const {error} = lologinValidation(req.body);
    if(error) {
        res.send({message:error['details'][0]['message']});
    }

    //check if user exist
    const userExist = await User.findOne({email: req.body.email});
    if(!userExist) {
        return res.status(400).send({message: "User does not exist"});
    }

    //decrypt the password
    const passwordValidation = await bcryptjs.compare(req.body.password, userExist.password);
    if(!passwordValidation) {
        return res.status(400).send({message: "Worng password"})
    }

    //generate json web token
    const token = jwt.sign({_id: userExist._id}, process.env.TOKEN_SECRET);
    res.header("auth-token", token).send({'auth-token':token});

}

//get all users function
const getUsers = async (req,res) => {
    try{
        const users = await User.find() //get all the user data in the databse
        res.send(users)
    }
    catch(err) {
        return res.status(400).send({message: err}) //error handling
    }
}

module.exports = {addUser, userLogin, getUsers}; //export functions