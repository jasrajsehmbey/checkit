const express = require('express')
const mysql = require('mysql')

//create connections
const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password: 'system',
    database: 'nodemysql',
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

//create table
app.get('/:userid',(req,res)=>{
    var id = req.params.userid;
    const sql = `CREATE TABLE ${id} (id int AUTO_INCREMENT PRIMARY KEY, note VARCHAR(255))`;
    db.query(sql,err=>{
        if(err){
            throw err;
        }
        const temp = `${id} table created`;
        res.send(temp);
    });
});

//insert into table


app.listen('3000',()=>{
    console.log('Server Started on port 3000')
})
