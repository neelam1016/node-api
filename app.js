const express = require('express');
const PORT=8899;
require('dotenv').config()
const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://neelamgali:<password>@cluster0.vbsrf5j.mongodb.net/test').then(res=>console.log("Database connected : "+res)).catch(err=>console.log("database error : "+err));
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
const route=require('./routes/routes');
const cors=require('cors');
app.use(cors());
app.use("/api",route);
app.use("*",(req,res)=>{
    res.status(404).json({"message": "url doesn't exist"})
})
app.listen(PORT,(err)=>{
    if(err){
        console.log("Error" +err)
    }
    else console.log(`work on ${PORT}`)
})
