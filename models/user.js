const mongoose = require("mongoose");

const userSchema = mongoose.Schema({ //user model
    firstName: {
        type: String,
        require: true,
    },

    lastName: {
        type: String,
        require: true,
    },

    email: {
        type: String,
        require: true,
    },

    username: {
        type: String,
        require: true,
    },

    password: {
        type: String,
        require: true,
    }
});

module.exports = mongoose.model("user", userSchema);