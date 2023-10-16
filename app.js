const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs')

const port = process.env.PORT || 3000

app.set('/test_website');
app.use(express.urlencoded());

// app.set('view engine', 'html');

app.get("/", (req,res)=>{
    res.status(200).sendFile(__dirname+'/home.html');
});
app.listen(port, ()=>{
    console.log(`The server is live at http://${port}`);
});

app.post('/', (req, res)=>{
    let name = req.body.name;
    let number = req.body.age;
    let email = req.body.email;
    let address = req.body.address;
    
    let output = `The name is ${name}
    The age is ${number}
    The email is ${email}
    The addrsss is ${address}`;

    fs.writeFileSync("output.txt", output);
    res.status(200).sendFile(__dirname+'/home.html');
});

const server = "127.0.0.1:27017";
const database = "Test_Database";

const mongoose = require("mongoose");
const connect = async()=>{
    try{
        await mongoose.connect(`mongodb://${server}/${database}`);
        console.log("Connection successful");
    }
    catch(err){
        console.log("Connection Unsuccessful");
    }
}
connect();

var schema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    address: String
});

var Collection1 = mongoose.model("Collection 1", schema);

app.post('/', (req, res)=>{
    var data = new Collection1(req.body);
    data.save().then(()=>{
        res.status(200).sendFile(__dirname+'/home.html');
    }).catch(()=>{
        res.send("The data has not been send");
    });
});