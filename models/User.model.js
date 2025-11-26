import mongoose from "mongoose";
//user schema
const userSchema=new mongoose.Schema({
    name:{type:String,required:true,trim:true},
    email:{type:String,required:true,unique:true,trim:true},
    password:{type:String,required:true},},
    {timestamps:true}
);
//creates user collection in database
export default mongoose.model('User',userSchema);