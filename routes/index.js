var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.redirect('/post_it');
});
//get the chat html
router.get('/chat', function(req, res) {

        res.render('chat', {
         title: 'chat application'
        });
});
//get the post-it html
router.get('/post-it', function(req, res) {
        res.render('post-it', {
         title: 'post-it application'
        });
});

//compile all the less files into css
// router.get("/stylesheets/hola.css", function(req, res) {
//     if (app.get('env') === 'development') {
//
//       console.log("estamos en desarrollo");
//
//       var path_css = __dirname + req.url;
//       var path_less = path_css.replace(".css", ".less");
//       fs.readFile(path_less, "utf8", function(err, data) {
//           if (err) throw err;
//           fs.writeFile(path_css,'Hello Node', function (err) {
//               if (err) throw err;
//                 console.log('new CSS created');
//           });
//       });
//   }
// });

module.exports = router;
