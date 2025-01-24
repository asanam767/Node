const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

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
    ,
    username:{
        type:String,
        required:true
    }
    ,
    password:{
        type:String,
        required:true 
    }

});

//using the pre function - telling the mongoose db to save the data now(it first encyrpts it and then saves it)
personSchema.pre('save',async function(next){
    //kisi bhi operation ke liye we first need a document/record
     //make a record named person
    const person=this;
    //kisi bhi record ke liye save karne se pehle,we will perform hashing and store it in his person named middleware

    //hash the password only if is modiefied or new
    if(!person.isModified('password')) return next();
    //if modified - then u have to hash 
    //if not then u can skip and go to next







    try{
        //hash password generation
        const salt=await bcrypt.genSalt(10);
         
        //hash password
        const hashedPassword=await bcrypt.hash(person.password,salt);
        
        //override the plain password with the hashed one
        person.password=hashedPassword;

        next();
    }
    catch{
        //next is a callback funtion here
        return next(err);
    }
})

personSchema.methods.comparePassword=async function(candidatePassword){
    try{
        //use bcrypt to compare the provided password with the hashed password
        const isMatch=await bcrypt.compare(candidatePassword,this.password);
        return isMatch;
    }
    catch(err){
        throw err;
    }
}

//How this comparison function works?
// - password : mannu767
// - mannu767 --> mannu767 + salt = hash
// - new password : riya767
// - bcrypt : hash ---> extract ------> salt
// - now check if salt + riya767 == hash or not
// - if not then return false

// bbbbbdddddeeeee--->extract salt
// salt+riya767 ---->hash ----->zysssdjchjfhdscj
// bbbbbdddddeeeee!=zysssdjchjfhdscj


//Create Person model
const  Person =mongoose.model('Person',personSchema);
//Then we export our model
//We will import this model in our server.js file
module.exports=Person;