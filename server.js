const express = require('express');
const app = express();
app.set('port', (process.env.PORT || 5000));
// const MongoClient = require('mongodb').MongoClient;
// const url =  'mongodb://localhost:27017/happyfood';
// var db;

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({  // to support URL-encoded bodies
  extended: true
})); 

app.use(express.static('public'));
app.get('/', function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.listen(app.get('port'), function() {
  console.log('Server is running.');
})


/*
// Connessione a MongoDB
MongoClient.connect(url, (err, database) => {
    if(err) {return console.log(err);}
    db = database;

    app.listen(8080, () => {
      console.log('[[[ HAPPY_FOOD - Version: 1.0 ]]] --- Server online, aperto su porta 8080. Listening ---');
    });
}); */

/*
// Aggiunge il click al database
app.post('/clicked', (req, res) => {
    let city = req.body.city;
    let category = req.body.category;
    if (city != '' && category != '') {
      console.log("Ricevuta una richiesta POST. Città -> " + req.body.city + ", Categoria -> " + req.body.category);
      const click = {
        clickTime: new Date(),
        cityRequested: city,
        categoryRequested: category
      };

      db.collection('clicks').save(click, (err, result) => {
        if (err) {
          return console.log(err);
        }
        console.log('Click e relative informazioni aggiunte al database');
        res.sendStatus(201);
      });
    } else {
      res.end();
    }
});

// Riceve i dati delle ricerche effettuate dal database come array
app.get('/clicks', (req, res) => {
    db.collection('clicks').find().toArray((err, result) => {
      if (err) return console.log(err);
      res.send(result);
    });
});

*/