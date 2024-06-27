const express =require("express");
const errorMiddleware = require("./middleware/error");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();
app.use(express.json())
app.use(cookieParser());


//route imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");

app.use("/api/v1",product);
app.use("/api/v1",user);


//middleware for error
app.use(errorMiddleware);



module.exports = app