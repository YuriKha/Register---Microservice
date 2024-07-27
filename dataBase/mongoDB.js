const mongoose=require('mongoose');

mongoose.set('strictQuery', true);

const uri = process.env.ConnectionString;
mongoose.connect(uri).then(()=>{
    console.log('you connected to MongoDB Database');
});