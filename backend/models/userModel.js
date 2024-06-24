const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require ("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Your Name"],
        maxLength:[30,"cannot exceed 30 character"],
        minLength:[4,'name shloud have more than 4 character']
    },
    email:{
        type:String,
        required:[true,"Please Enter Your Email"],
        unique:true,
        validate:[validator.isEmail,"please enter valid email"]
    },
    password:{
        type:String,
        required:[true,"Please Enter Your Password"],
        minLength:[8,'Password shloud have more than 8 character'],
        select:false,

    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default:"user"
    },
    resetPassword:{
        resetPasswordToken:String,
        resetPasswordExpire:Date,



    }
})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
      next();
    }

    this.password= await bcrypt.hash(this.password,10);
})


//JWT TOKEN
userSchema.methods.getJWTToken = function (){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE,
    })

}

module.exports = mongoose.model("User",userSchema);
