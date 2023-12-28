// require('dotenv').config();
const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
require("./db/conn");
const Register = require("./models/registers");
const port = process.env.port || 3000;
const static_path = path.join(__dirname,"../public");
const template_path = path.join(__dirname,"../templates/views");
const partials_path = path.join(__dirname,"../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path);
app.get("/",(req,res)=>
{
    res.render("index")
});
app.get("/register",(req,res)=>
{
    res.render("register")
});
app.post("/register",async(req,res)=>
{
    try {
        const password = req.body.password;
        const cpassword = req.body.ConfirmPassword;
        if(password===cpassword)
        {
            const registerEmp = new Register({
                FirstName:req.body.FirstName,
                LastName:req.body.LastName,
                Email:req.body.Email,
                age:req.body.age,
                gender:req.body.gender,
                password:req.body.password,
                ConfirmPassword:req.body.ConfirmPassword,
                phone:req.body.phone
            })
            const registerd = await registerEmp.save();
            res.status(201).render("index");
        }
        else
        {
            res.send("Password mismatch");
        }
        
    } catch (error) {
        res.status(400).send(error);
    }
});
app.listen(port,()=>
{
    console.log(`server is running on the port no ${port}`);
});