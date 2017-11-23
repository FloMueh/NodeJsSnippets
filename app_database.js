const express = require('express')  // load the node express module
const bp = require('body-parser')
const fs = require('fs')
const mongo = require('mongodb')
const app = express()  // create a new express app


// let's treat incoming request bodies as text/plain
app.use(express.json())

const url = 'mongodb://localhost:27017/wt17-mongo';
var connection = mongo.MongoClient.connect(url);

//START GETTING FROM DB
app.get('/students/', (req, res, next) => {    
    connection
        .then(conn => conn.collection('students'))
        .then(coll => coll.find().toArray())
        .then((hits) => {
            res.status(200).send(hits);
        })
        .catch((err) => {
            console.log(err);
            es.status(400).end("Error during getting data");
        });
})

app.get('/students/:id', (req, res, next) => {
    connection
        .then(conn => conn.collection('students'))
        .then(coll => coll.findOne({id: req.params.id}))
        .then((hits) => {
            res.status(200).send(hits);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).end("Error during Getting data");
        });
})
//END GETTING FROM DB

//START Inserting Into Database
app.post('/students/', (req, res, next) => {
    connection
        .then(conn => conn.collection('students'))
        .then(coll => coll.insertOne({id: req.body.id, name: req.body.name}))
        .catch((err) => {
            console.log(err);
            res.status(400).send("Error during insert")
        });

    res.status(200).end("Successfully inserted!")
})
//END Inserting Into Database

//START DELETE
app.delete('/delete/:id', (req, res, next) => {
    connection
    .then(conn => conn.collection('students'))
    .then(coll => coll.deleteOne({id: req.params.id}))
    .catch((err) => {
        console.log(err);
        res.status(400).send("Error during insert")
    });

    res.status(200).end("Successfully deleted!")
})
//END DELETE

// start the webserver, listen on port 3000
app.listen(3000,
    () => console.log('Example app.js listening on port 3000!'))