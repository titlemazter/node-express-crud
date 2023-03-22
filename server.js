var express = require('express')
var cors = require('cors')
const mysql = require('mysql2');
require('dotenv').config()

const connection = mysql.createConnection(process.env.DATABASE_URL)
console.log('Connected to PlanetScale!')

var app = express()
app.use(cors())
app.use(express.json())

app.get('/gameobject', function (req, res, next) {
    connection.query(
      'SELECT * FROM gameobject',
      function(err, results, fields) {
        res.json(results);
      }
    );
  })

app.get('/gameobject/:id', function (req, res, next) {
    const id = req.params.id;
    connection.query(
      'SELECT * FROM gameobject WHERE id = ?',
      [id],
      function(err, results) {
        res.json(results);
      }
    );
  })

  app.post('/gameobject', function (req, res, next) {
    connection.query(
      'INSERT INTO gameobject(Name, Type, Category, Price, Pic) VALUES (?, ?, ?, ?, ?)',
      [req.body.Name, req.body.Type, req.body.Category, req.body.Price, req.body.Pic],
      function(err, results) {
        res.json(results);
      }
    );
  })

  app.put('/gameobject', function (req, res, next) {
    connection.query(
      'UPDATE gameobject SET Name= ?, Type= ?, Category= ?, Price= ?, Pic= ? WHERE id = ?',
      [req.body.Name, req.body.Type, req.body.Category, req.body.Price, req.body.Pic, req.body.id],
      function(err, results) {
        res.json(results);
      }
    );
  })

  app.delete('/gameobject', function (req, res, next) {
    connection.query(
      'DELETE FROM gameobject WHERE id = ?',
      [req.body.id],
      function(err, results) {
        res.json(results);
      }
    );
  })

app.listen(5000, function () {
  console.log('CORS-enabled web server listening on port 5000')
})