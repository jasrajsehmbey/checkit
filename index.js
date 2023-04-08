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

app.use(express.json());

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
    const sql = `CREATE TABLE ${id} (id int AUTO_INCREMENT PRIMARY KEY, note VARCHAR(255),isChecked BOOLEAN)`;
    db.query(sql,err=>{
        if(err){
            res.status(404).send('database already created');
        }
        const temp = `${id} table created`;
        res.send(temp);
    });
});

//insert into table
app.post('/insert/:userid',(req,res)=>{
    const data = req.body;
    var id = req.params.userid;
    
    db.query(`INSERT INTO ${id} SET ?`,data,(err,result)=>{
        if(err){
            res.status(404).send('some error');
        }
        res.send(result);
    });
});

//update data to isChecked 1
app.patch('/update/:userid',(req,res)=>{
    var id = req.params.userid;
    var note = req.body.note;
    let one = 1;
    let zero = 0;
    const sql = `UPDATE ${id} SET isChecked = CASE WHEN isChecked = 1 THEN '${zero}' ELSE '${one}' END WHERE note ="${note}"`;
    db.query(sql,(err)=>{
        if (err) {
            res.status(404).send('some error');
          }
          const temp = `${note} from ${id} table is changed`;
          res.send(temp);
    });
});


//delete data
app.delete("/delete/:userid", (req, res) => {
    var id = req.params.userid;
    var note = req.body.note;
    const sql = `DELETE FROM ${id} WHERE note = "${note}"`;
    db.query(sql, (err) => {
      if (err) {
        res.status(404).send('some error');
      }
      const temp = `${note} from ${id} table deleted`;
      res.send(temp);
    });
  });


//delete all tuples
app.delete("/deleteall/:userid",(req,res)=>{
    var id = req.params.userid;
    const sql = `TRUNCATE TABLE ${id}`;
    db.query(sql, (err) => {
        if (err) {
          res.status(404).send('some error');
        }
        const temp = `${id} table deleted`;
        res.send(temp);
      });

});
  
// get data
  app.get("/get/:userid", (req, res) => {
    var id = req.params.userid;
    const sql = `SELECT * FROM ${id}`;
    db.query(sql, (err, result) => {
      if (err) {
        res.status(404).send('some error');
      }
      res.send(result);
    });
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, function () {
    console.log("Ready to Go on: "+ PORT);
  });
