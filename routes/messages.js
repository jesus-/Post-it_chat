
// exports.view = function(req, res){
//   res.render('users/view', {
//     title: 'Viewing user ' + req.user.name,
//     user: req.user
//   });
// };



//router.get('/chat', function(req, res) {
exports.view = function(req, res){
    var db = req.db;
    var collection = db.get('messages');
    collection.find({},{},function(e,docs){
        res.render('chat', {
            "messages" : docs
        });
    });
};
/* POST to Add message */
// router.post('/addmessage', function(req, res) {
exports.addmessage = function(req, res){

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
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
};
// /* Delete message */
//router.delete('/deletemessage/:id', function(req, res) {
exports.deletemessage = function(req, res){

    // Set our internal DB variable
    var db = req.db;

    var messageToDelete = req.params.id;
    // Set our collection
    var collection = db.get('messages');

    // Submit to the DB
      collection.remove({_id:messageToDelete}, function (err, doc) {
      res.send((doc === 1) ? { msg: '' } : { msg:'error: ' + err });
    });
};
