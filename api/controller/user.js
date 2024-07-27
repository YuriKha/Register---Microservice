const user=require('../models/user');

const userCounter=require('../models/userCounter');

const mongoose=require('mongoose');  

const bcrypt=require('bcryptjs'); 

const axios = require('axios');

//----------------- export -------------------------
module.exports={  
    // POST  http://localhost:3002/user/signup
    // {
    //     "firstName": "name",
    //     "lastName": "name",
    //     "email": "some_email@gmail.com",
    //     "password": "123",
    //     "phone": "555365"
    // }
    Register:async (req,res) => {
        const {firstName, lastName, password, phone} = req.body;
        const email = req.body.email.toLowerCase();
        console.log("the req.body that you just received: ");
        console.table(req.body);
        try {
            const userFound = await user.find({Email:email});
            if(userFound.length > 0){ 
                console.log("the email: " + email + " is in use");
                return res.status(409).json({Msg:"the email: " + email + " is in use"});
            }  
            try {
                const uniqueId = await userCounter.findOneAndUpdate(
                    {id:"user_counter"},
                    {"$inc":{"seq":1}},
                    {new:true,upsert: true} // upsert: true means if you donr have one creat one
                    );
                try {
                    const myHashPass = await bcrypt.hash(password,10);
                    try {
                       const newUser = new user({
                            _id:new mongoose.Types.ObjectId(),
                            ID:uniqueId.seq, 
                            FirstName:firstName, 
                            LastName:lastName,
                            Email:email,
                            Password:myHashPass, 
                            Phone:phone,
                            Joined:new Date().toLocaleDateString('en-GB')
                       });
                       await newUser.save();

                        //  SEND EMAIL API :
                        const mail={
                            ID:uniqueId.seq,
                            firstName,
                            lastName,
                            email,
                            phone
                        }
                        const respon = await axios({
                            method: 'post',
                            url: 'http://localhost:3004/mail/send',
                            data: {
                                mail
                            }
                        });  
                        console.table(respon.data);
                       console.log("new user successfully registered");
                       return res.status(200).json({Msg:"new user successfully registered: ", newUser});
                    } catch (error) {
                        console.log("could NOT save the new user try again later: ", error);
                        return res.status(500).json({Msg:"could NOT save the new user try again later: ", error});
                    }
                } catch (error) {
                    console.log("could NOT hash the password at this moment, try again later: ", error);
                    return res.status(500).json({Msg:"could NOT hash the password at this moment, try again later: ", error});
                }
            } catch (error) {
                console.log("could NOT generate unique id, try again later: ", error);
                return res.status(500).json({Msg:"could NOT generate unique id, try again later: ", error});
            }
        } catch (error) {
            console.log("could NOT search in the database at the moment: " , error);
            return res.status(500).json({Msg:"could NOT search in the database at the moment: " ,error});
        }
    }
}