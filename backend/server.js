const app = require("./app.js")




const dotenv = require("dotenv");
// import connectDatabase from "./config/database";
const connectDatabase = require("./config/database")
const express = require("express");
// const app = express();

//  app.use(cors());

// config


dotenv.config({path:"backend/config/config.env"});



app.use(express.json())

//Route imports
const product =require("./routes/productRoute.js");


app.use("/",product);


//connecting to database
connectDatabase();

app.listen(process.env.PORT,()=>{
    console.log(`server is running on http://localhost:${process.env.PORT}`);
})
