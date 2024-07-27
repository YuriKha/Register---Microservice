const router=require('express').Router();

const {
    Register
}=require('../controller/user');

//------- endpoint for login ------- 
router.post('/signup',Register); // ---> POST --> http://localhost:3002/user/signup

//----- export ------
module.exports=router;