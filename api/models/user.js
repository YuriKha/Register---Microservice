const mongoose=require('mongoose');

mongoose.pluralize(null);; // make sure that MongoDB do NOT interfere in my names

const UserSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    ID:Number,
    FirstName:String,
    LastName:String,        
    Email:String,
    Password:String,
    Phone:String,
    Joined:String
});

//---------------------- export ----------------------------
module.exports=mongoose.model("user",UserSchema); // the name of the "document"