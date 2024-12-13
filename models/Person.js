const mongoose=require('mongoose');
//Define the person Schema 
const personSchema=new mongoose.Schema({
    name:{
      type:String,
      required:true
    },
    age:{
        type:Number,
    },
    work:{
        type:String,
        enum:['chef','waiter','manager'],
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String,
    },
    salary:{
        type:String,
        required:true
    }

});
//Create Person model
const  Person =mongoose.model('Person',personSchema);
//Then we export our model
//We will import this model in our server.js file
module.exports=Person;