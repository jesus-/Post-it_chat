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
    //        "messages" : docs
         title: 'post_it/chat application'
        });
    });
});



module.exports = router;
