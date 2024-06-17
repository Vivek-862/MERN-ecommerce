const app = require("./app");

const dotenv = require("dotenv");
import connectDatabase from "./config/database";
// const connectDatabase = require("./config/database")


// config
dotenv.config({path:"backend/config/config.env"});

//connecting to database
connectDatabase();

app.listen(process.env.PORT,()=>{
    console.log(`serever is running on http://localhost:${process.env.PORT}`);
})