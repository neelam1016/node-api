//const {validationResult}=require('express-validator');
const dataModel=require('../model/model')
const userModel=require('../model/user')
const bcrypt=require('bcrypt');
const saltRounds=10;
const jwt=require('jsonwebtoken');
//const secret_key="chfdhv666vgg777hhjhghg76555"
async function addProduct(req,res){
    const data=new dataModel({
        name:req.body.name,
        city:req.body.city
    })
    try{
        const dataSave=await data.save();
        res.status(200).json({"message":"Data Added"})
    }
    catch(error){
        res.status(404).json({"message" : "error"})
    }
}
async function getProduct(req,res){
    try{
        const alldata=await dataModel.find({});
        res.status(200).json(alldata)
    }
    catch(error){
        res.status(404).json({"message" : error.message})
    } 
}
async function updateProduct(req,res){
    try{
        const id=req.params.id;
        const updateData=req.body;
        const options={new:true};
        const data=await dataModel.findByIdAndUpdate(id,updateData,options);
        res.status(200).json({"message":"Data Updated"})
    }
    catch(error){
        res.status(400).json({"message":error.message})
    }
}
async function deleteProduct(req,res){
    try{
        const id=req.params.id;
        const data=await dataModel.findByIdAndDelete(id);
        res.status(200).json({"message":"Data Deleted"})
    }
    catch(error){
        res.status(400).json({"message":error.message})
    }
}
function registration(req,res){
    let {email,uname,password}=req.body;
            const hash = bcrypt.hashSync(password, saltRounds);
            let ins=new userModel({ email: email,username: uname, password: hash});  
         ins.save((err,data)=>{
        if(err) res.status(404).json({"message" : err.message})
        else res.status(200).json(data)
         })
}

function login(req,res){
    let {uname,password}=req.body;
    userModel.findOne({username:uname},(err,data) => {
       if (err){
        res.status(404).json({"message" : "invalid username and password"})
       }
       else if(data == null)
       {
        res.status(404).json({"message" : "invalid username and password"})
       }
       else{
           // Comparing two values
           if(bcrypt.compareSync(password,data.password)){
            token=jwt.sign({userId:data._id,username:uname},process.env.SECRET_KEY,{expiresIn:"1h"});
            res.status(200).json({token:token})
           }
           else{
            res.status(404).json({"message" : "invalid username and password"})
           }
       }
    })
}
function access(req,res){
    //Bearer token
    const token=req.headers.authorization.split(' ')[1];
    if(!token){
        res.status(201).json({message:"Error : token was not provided"})
    }
    else {
        const decodeToken=jwt.verify(token,process.env.SECRET_KEY);
        res.status(200).json({userId:decodeToken.userId,username:decodeToken.username});
    }
}

module.exports={addProduct,getProduct,updateProduct,deleteProduct,registration,login,access};