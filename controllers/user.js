const Person = require('../models/Person');


const userdetails = async (req,res)=>{
    try{
        const data=req.body 
        const newPerson=new Person(data);
        const response= await newPerson.save();
            console.log('Data Saved',response)
            res.status(200).json(response);
          }
    catch(err){  
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
}

const getdetails =  (req, res)=>{
    var customized_idli = {
    name: 'rava idli',
    size: '10 cm diameter',
    is_sambhar: true,
    is_chutney: false
    }
    res.send(customized_idli)
    }


module.exports = {userdetails , getdetails}