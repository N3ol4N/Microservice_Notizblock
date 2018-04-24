var ObjectID = require('mongodb').ObjectID;
var express = require("express");
var app = express();

//http://expressjs.com/en/guide/routing.html

module.exports = function (app, db) {
    const collection =

        app.use('/', express.static(__dirname + '/../../html'));

    /*
    //app.get('/', (reg, res) => {
        //res.sendFile(app.use(express.static(__dirname + '/../../html')));
        //res.sendFile(path.join(__dirname + '/../../html/index.html'));
        //app.use(express.static(__dirname + '/../../html'));
        //res.jsonp({ 'error': 'cannot GET, try microservice-mongo:3000/notes/all' });
        //res.send({ 'error': 'cannot GET, try microservice-mongo:3000/notes/all' });
    });
    */

    //GET :   microservice-mongo:3000/notes/all
    //delivers all entries in the database
    app.get('/notes/all', (req, res) => {
        db.collection('notes').find({}).toArray((err, result) => {
            if (err) {
                res.jsonp({ 'error': 'An error has occurred' });
                //res.send({ 'error': 'An error has occurred' });
            } else {
                res.jsonp(result);
                //res.send(result);
            }
        })
    });

    //GET :   microservice-mongo:3000/notes/:id
    //delivers the entry identified by :id
    app.get('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('notes').findOne(details, (err, item) => {
            if (err) {
                res.jsonp({ 'error': 'An error has occurred' });
                //res.send({ 'error': 'An error has occurred' });
            } else {
                res.jsonp(item);
                //res.send(item);
            }
        });
    });

    //POST :  microservice-mongo:3000/notes
    //writes the input into the database.
    //input should be a body
    app.post('/notes', (req, res) => {
        const note = { text: req.body.body, title: req.body.title };
        db.collection('notes').insert(note, (err, result) => {
            if (err) {
                res.jsonp({ 'error': 'An error has occurred' });
                //res.send({ 'error': 'An error has occurred' });
            } else {
                res.jsonp(result.ops[0]);
                //res.send(result.ops[0]);
            }
        });
    });

    //DELETE: microservice-mongo:3000/notes/all
    //deletes the entry identified by :id
    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('notes').remove(details, (err, item) => {
            if (err) {
                res.jsonp({ 'error': 'An error has occurred' });
                //res.send({ 'error': 'An error has occurred' });
            } else {
                res.jsonp('Note ' + id + ' deleted!');
                //res.send('Note ' + id + ' deleted!');
            }
        });
    });

    //PUT :   microservice-mongo:3000/notes/:id
    //overwrites the database entry identified by :id with the given input.
    //input should be a body
    app.put('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const note = { text: req.body.body, title: req.body.title };
        db.collection('notes').update(details, note, (err, result) => {
            if (err) {
                res.jsonp({ 'error': 'An error has occurred' });
                //res.send({ 'error': 'An error has occurred' });
            } else {
                res.jsonp(note);
                //res.send(note);
            }
        });
    });
};