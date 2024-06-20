
const cors = require('cors');

const dotenv = require("dotenv");
// import connectDatabase from "./config/database";
const connctDatabase = require("./config/database")
const express = require("express");
const app = express();

 app.use(cors());

// config


dotenv.config({path:"backend/config/config.env"});



app.use(express.json())

//Route imports
const product =require("./routes/productRoute.js");


app.use("/",product);


//connecting to database
connctDatabase();

app.listen(process.env.PORT,()=>{
    console.log(`serever is running on http://localhost:${process.env.PORT}`);
})
