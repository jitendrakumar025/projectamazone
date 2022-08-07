const express=require("express");
const path=require("path");
const fs=require("fs");
const { name } = require("pug/lib");
const app=express();
const port =80;
 const mongoose = require('mongoose');
 mongoose.connect('mongodb://localhost:27017/amzcontact',{useNewUrlParser:true});

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    message: String,
   
  });
  const Contact = mongoose.model('Kitten', contactSchema);

app.use('/static',express.static('static'))
app.use(express.urlencoded());

app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'))

 app.get("/contact", (req, res)=>{
    const params={} 
     res.status(200).render('index.pug',params);
 });
    const bodyparser = require("body-parser");
    app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
    res.send("Your form submitted successfully")
    }).catch(()=>{
    res.status(400).send("item was not saved to the databse")
});
});
app.listen(port,()=>{
    console.log(`The app  started successfully on port ${port} `);
});