const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoute = require("./routes/userAuth");

//middlewares
const app = express();
require("dotenv/config");
app.use(bodyParser.json());

//database connection
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("DB Connection successful")
).catch((err) => {
    console.log(err);
});

//call the user route
app.use("/api/user", userRoute);

//start the server
app.listen(process.env.PORT || 3500, () => {
    console.log(`Server is up and running on PORT ${process.env.PORT}`);
});