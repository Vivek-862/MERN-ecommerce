// const mongoose = require("mongoose");

// DB_URI = "mongodb://localhost:27017/Ecommerce"

// const connectDatabase =()=>{
//     mongoose.connect(process.env.DB_URI,{useNewUrlParser:true,useUnifiedTopology:true,
//         useCreateIndex:true}).then((data)=>{
//             console.log('Mongodb connected with server ${data.connection.host}');
    
//     }).catch((err)=>{
//         console.log(err);
    
//     })`

// }


// module.exports = connectDatabase

const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    console.log("Here")
    const { connection } = await mongoose.connect(process.env.DB_URI);
    console.log("successfully")
    console.log(connection.host);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectDatabase
