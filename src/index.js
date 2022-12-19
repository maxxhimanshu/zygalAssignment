const express = require("express")
const app=express()

const mongoose = require("mongoose")
const route=require("./route/route")
var cors=require("cors")


app.use(express.json())
app.use(cors())
app.use("/",route);

mongoose.set('strictQuery', true)

mongoose.connect("mongodb+srv://maxxhimanshu:himanshu@cluster0.sg6kw.mongodb.net/loginData?retryWrites=true&w=majority",{
    useNewUrlParser:true
}).then(()=>console.log("mongoose connected"))
.catch(err=>console.log(err.message))


app.listen(3001,function(){
    console.log("Server Connected")
})