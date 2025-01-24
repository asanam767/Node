//this file will contain the code regarding authentication
const LocalStrategy=require('passport-local').Strategy;
const Person=require('./models/Person');
//also known as username and passport startegy 
//used to authenitcate users
const passport=require('passport');

//here we will use localStrategy to determine the validity of user password
//here done is a callback function which provides the passport
passport.use(new LocalStrategy (async(USERNAME,PASSWORD,done)=>{
    //authentication logic here
    try{
        //it is not a good practice to print the password in log 
        //we must encrypt / use hash 
        //we intall - npm  i bcryp --save
        //console.log("Received credentials",USERNAME,PASSWORD);
        const user=await Person.findOne({username:USERNAME});
        if(!user)
          return done(null,false,{message:'Incorrect Username'});
        
        //this comparePassword Schema will be made in personSchema
        const isPasswordMatch=user.comparePassword(PASSWORD);
        
        const isPassword=user.password==PASSWORD?true:false;
        if(isPassword){
          return done(null,user);
        }
        else{
          return done(null,user,{message:'Incorrect Password'});
        }
    }
    catch(err){
        return done(err);
    }
}) )


module.exports=passport;