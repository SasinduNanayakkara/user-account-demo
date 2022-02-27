const jwt = require("jsonwebtoken");

//validate json web token
const auth = (req,res,next) => {
    const token = req.header("auth-token");
    if(!token) {
        return res.status(401).send({mesasage: "Access denied"})
    }

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified
        next()
    }
    catch(err) {
        return res.status(401).send({mesasage: "Access denied"})
    }
}

module.exports = auth