const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const Student = require('./models/student');

const app = express();

//connect to db
mongoose.connect('mongodb+srv://test:test@cluster0-kfuom.mongodb.net/test?retryWrites=true&w=majority');
mongoose.Promise = global.Promise;

//middleware for forms, json data and service of static files
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use('/',express.static(path.join(__dirname,'static')));

//setting for view engine - to use ejs template for user profile
app.set('view engine','ejs');


//root get method - serves the index file
app.get('/',(req,res)=>{
    res.sendFile('index.html');
});

let user = {}; // to capture login info
//post method - called when user signs in
app.post('/',(req,res,next)=>{
    user = {
        id:req.body.studentNumber,
        pwd:req.body.password
    }
     Student.findOne({studentNumber:user.id,password:user.pwd}).then((student)=>{
        if(student!=null){res.render('profile',{data:student});}
        else{res.status(403).send('user not registered');}
        
     }).catch(next);  
});

//update route - for when user updateds/edits profile
app.put('/profile',(req,res)=>{
    Student.findOneAndUpdate({studentNumber:user.id,password:user.pwd},req.body).then(
        res.json({save: 'saved'})
    );  
});

//error handling middleware
app.use((err,req,res,next)=>{
    res.status(422).send({error:err.message});
});

port = process.env.port || 3000;
app.listen(port);
console.log(`Listening on port ${port}`);