const express=require('express');
//const jwtvalidate=require('../middleware/auth')
const router=express.Router();
// const{body,validationResult}=require('express-validator');
const{addProduct,getProduct,updateProduct,deleteProduct,registration,login,access}=require('../controllers/postController')
// const validate=validations=>{
//     return async (req,res,next)=>{
//         await Promise.all(validations.map(validation=> validation.run(req)))
//         const errors=validationResult(req);
//         if(errors.isEmpty()){
//             next();
//         }
//         res.status(400).json({
//         error:1,
//         errors:errors.array()
//         })
//     }
// }
//validate([body('name').isLength({min:4}).withMessage("name is more than 4 character long"),body('city').contains().withMessage("City is required")])
//jwtvalidate()
router.post("/product/add",addProduct);
router.get("/product/get",getProduct);
router.put("/updateproduct/:id",updateProduct);
router.delete("/deleteproduct/:id",deleteProduct);
router.post("/registration",registration);
router.post("/login",login);
router.post("/access",access);
module.exports=router;