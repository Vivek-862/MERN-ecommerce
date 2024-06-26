const app = require("./app.js")




const dotenv = require("dotenv");
// import connectDatabase from "./config/database";
const connectDatabase = require("./config/database")
const express = require("express");
// const app = express();

//  app.use(cors());


//handling uncaught Exception
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server due to uncaught Exception`);

    process.exit(1);
})


// config
dotenv.config({path:"backend/config/config.env"});



app.use(express.json())

//Route imports
const product =require("./routes/productRoute.js");


app.use("/",product);


//connecting to database
connectDatabase();

const server = app.listen(process.env.PORT,()=>{
    console.log(`server is running on http://localhost:${process.env.PORT}`);
})


//unhandled promise rejection
process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server due to unhandled Promise Rejection`);

    server.close(()=>{
        process.exit(1);
});
});
