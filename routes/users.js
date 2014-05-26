var express = require('express');
var router = express.Router();

//get all the users
router.get('/', function(req, res) {
    var db = req.db;
    var collection = db.get('users');

    collection.find({},{},function(e,docs){
        res.json(docs);
      });
});

module.exports = router;
