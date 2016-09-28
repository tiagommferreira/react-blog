var path        = require('path');
var express     = require('express');
var bodyParser  = require('body-parser');
var app         = express();
var mongoose    = require('mongoose');
var config      = require('./config'); // get our config file
var jwt         = require('jsonwebtoken'); // used to create, sign, and verify tokens
var User        = require('./models/user'); // get our mongoose model
var Post        = require('./models/post'); // get our mongoose model
var apiRoutes   = require('./apiRoutes');

app.set('port', (process.env.PORT || 3000));

app.use(express.static(path.join(__dirname, "..")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/setup', function(req, res) {

  // create a sample user
  var user1 = new User({
    name: 'Tiago Ferreira',
    password: '123123',
    email: 'tiagommferreira55@gmail.com',
    admin: true,
  });

  // save the sample user
  user1.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({ success: true });
  });

  // create a sample user
  var user2 = new User({
    name: 'Teste user',
    password: '123123',
    email: 'teste@gmail.com'
  });

  // save the sample user
  user2.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({ success: true });
  });

  var post1 = new Post({
    title: 'First Post',
    content: 'This is the first post content',
    author: mongoose.Types.ObjectId('57e3e20336773f2e2026b126')
  });

  post1.save(function(err) {
    if(err) throw err;

    console.log('Post saved successfully');
    res.json({success:true});
  });

  var post2 = new Post({
    title: 'Muck Felo',
    content: 'xD',
    author: mongoose.Types.ObjectId('57e3e20336773f2e2026b126')
  });

  post2.save(function(err) {
    if(err) throw err;

    console.log('Post saved successfully');
    res.json({success:true});
  });

});

app.post('/api/authenticate', function(req, res) {

  // find the user
  User.findOne({
    name: req.body.name
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      //check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right
          // create a token
          var token = jwt.sign(user, app.get('superSecret'), {
            expiresIn: 86400 // expires in 24 hours
          });

          // return the information including token as JSON
          res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            admin: user.admin,
            token: token
          });
        } else {
          res.send({_id: false, msg: 'Authentication failed. Wrong password.'});
        }
      });

    }

  });
});

app.use('/api', apiRoutes);

app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});