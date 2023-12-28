const mongoose = require("mongoose");
const employeeSchema = new mongoose.Schema({
    FirstName :{
        type:String,
        required:true
    },
    LastName :
    {
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    gender:{
        type:String,
        required:true 
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    age:{
        type:Number,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    ConfirmPassword:
    {
        type:String,
        required:true
    }

});

const Register = new mongoose.model("Registers",employeeSchema);
module.exports = Register;