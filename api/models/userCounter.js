const mongoose=require('mongoose');
 
mongoose.pluralize(null); // make sure that MongoDB do NOT interfere in my names

const UserCounterSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    id:String,
    seq:Number
});

//---------------------- export ----------------------------
module.exports=mongoose.model("userCounter",UserCounterSchema); // the name of the "document"
 
