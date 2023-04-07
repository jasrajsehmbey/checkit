const express = require('express')
const mysql = require('mysql')

//create connections
const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password: 'system',
});

//connect to mysql

db.connect(err=>{
    if(err){
        throw err;
    }
    console.log('mysql connected')
})

const app = express();

//create database
app.get("/createdb",(req,res)=>{
    let sql = "CREATE DATABASE nodemysql";
    db.query(sql,(err)=>{
        if(err){
            throw err;
        }
        res.send("database created");
    });
});

app.listen('3000',()=>{
    console.log('Server Started on port 3000')
})
