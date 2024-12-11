const express = require('express')
const app = express();
const bodyParser=require('body-parser');
const {mongodbconnection} = require('./db.js')

const {userdetails , getdetails} = require('./controllers/user.js')



mongodbconnection("mongodb://127.0.0.1:27017/hotels").then(()=>{
    console.log("Database Connected");
  })

app.use(bodyParser.json()); 
app.get('/hello',(req,res) =>{
    res.send("katta manasa")
})
app.get('/', function (req, res) {
    res.send('Welcome to my hotel... How i can help you ?, we have list of menus')
    })

    

app.get('/getdetail', getdetails )

//Post route to add a Person
app.post('/persondetail', userdetails )


app.listen(3000, ()=>{
    console.log('listening on port 3000');
    })