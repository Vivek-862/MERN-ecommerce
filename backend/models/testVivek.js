import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name:String,
  age:Number,
  dob:String,
  email:String,
  });


export const testVivek = mongoose.model("testVivek", schema);