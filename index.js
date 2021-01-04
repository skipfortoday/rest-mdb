const express = require('express');
var cors = require('cors')
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
 
// parse application/json
app.use(bodyParser.json())
app.use(cors())
 
//create database connection
const conn = mysql.createConnection({
  host: '192.168.0.28',
  user: 'rizky',
  password: '1234',
  database: 'absensi'
});
 
//connect to database
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});


//tampilkan recent absen
app.get('/api/restmdb',(req, res) => {
    let sql = "SELECT * FROM tbldatang ORDER BY Tanggal DESC LIMIT 10";
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify(results));
    });
  });

//Menampilkan Jumlah Record
app.get('/api/record',(req, res) => {
  let sql = "SELECT COUNT(DatangID) FROM tbldatang";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify(results));
  });
}); 

//Server listening
app.listen(3000,() =>{
  console.log('Server started on port 3000...');
});