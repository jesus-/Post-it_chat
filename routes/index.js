var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.redirect('/chat');
    // res.render('/chat', { title: 'post-it' });
});
//get the messages
router.get('/chat', function(req, res) {
    var db = req.db;
    var collection = db.get('messages');
    collection.find({},{},function(e,docs){
        res.render('chat', {
            "messages" : docs
        });
    });
});
//get the users
router.get('/users', function(req, res) {
    var db = req.db;
    var collection = db.get('users');

    collection.find({},{},function(e,docs){
        res.json(docs);
      });
});
/* POST to Add message */
router.post('/addmessage', function(req, res) {
//exports.addmessage = function(req, res){
    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var message = req.body.message;

    // Set our collection
    var collection = db.get('messages');

    // Submit to the DB
    collection.insert({
        "username" : userName,
        "message" : message
    }, function (err, doc) {
        console.log(err);
        console.log(doc);
        res.send((err === null) ? { msg: '', _id:doc._id} : { msg:'error: ' + err });
    });
});
// /* Delete message */
router.delete('/deletemessage/:id', function(req, res) {
// exports.deletemessage = function(req, res){

    // Set our internal DB variable
    var db = req.db;

    var messageToDelete = req.params.id;
    // Set our collection
    var collection = db.get('messages');

    // Submit to the DB
      collection.remove({_id:messageToDelete}, function (err, doc) {
      res.send((doc === 1) ? { msg: '',_id:messageToDelete } : { msg:'error: ' + err });
    });
});

module.exports = router;


// var messages = require('./messages');
// var express = require('express');
// //var router = express.Router();
// var app = express();
//
//
// /* GET home page. */
// app.get('/', function(req, res) {
//   res.render('chat', { title: 'Express' });
// });
// app.get('/chat', messages.view);
//
// module.exports = router;
//
// //-Shows the main page
// //router.get('/chat', function(req, res) {
// // var contentHandler = require('./content');
// // var aHandler = new contentHandler();
// // module.exports = exports = function (app, db) {
// //   console.log ('inside routes/index.js');
// //   app.get ('/', aHandler.displayWelcomePage);
// // };
