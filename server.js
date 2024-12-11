const express = require('express')
const app = express();
const db=require('./db');
const Person=require('./models/Person');
const bodyParser=require('body-parser');
const {mongodbconnection} = require('./db.js')



mongodbconnection("mongodb://127.0.0.1:27017/Youtubenode").then(()=>{
    console.log("Database Connected");
  })





app.use(bodyParser.json()); 
//this will get stored in req.body
//with this we will perform all the database operations
app.get('/', function (req, res) {
    res.send('Welcome to my hotel... How i can help you ?, we have list of menus')
    })
app.get('/chicken', (req, res)=>{ 
    res.send('sure sir, i would love to serve chicken')
        
})
app.get('/idli', (req, res)=>{
    var customized_idli = {
    name: 'rava idli',
    size: '10 cm diameter',
    is_sambhar: true,
    is_chutney: false
    }
    res.send(customized_idli)
    })

//Post route to add a Person
app.post('/person',async (req,res)=>{
    try{
        const data=req.body //Assuming the request body contains the person data
        const newPerson=new Person(data);
        //ek document bana rahe hai named as newPerson jo Person ke type ka hai
        //we can either call it this way or directly pass the data 
       
        //newPerson.name=data.name;
        const response= await newPerson.save();
            console.log('Data Saved',response)
            res.status(200).json(response);
          }
    catch(err){
        
        console.log(err);
        //http status code 
        res.status(500).json({error:'Internal Server Error'});
    }
})
app.listen(3000, ()=>{
    console.log('listening on port 3000');
    })