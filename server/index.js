// EXTERNAL MODULES //
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');

// CONFIG //
var config = require('./config');

// CONTROLLERS //
var UserCtrl = require('./controllers/UserCtrl');
var boardCtrl = require('./controllers/boardCtrl')
var listController = require('./controllers/listController');


// SERVICES //
var passport = require('./services/passport');


// POLICIES //
var isAuthed = function(req, res, next) {
  if (!req.isAuthenticated()) return res.status(401).send();
  return next();
};


// EXPRESS //
var app = express();

app.use(bodyParser.json());
app.use(session({
  secret: config.SESSION_SECRET,
  saveUninitialized: false,
  resave: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + "./../public"));
app.post('/users', UserCtrl.register);
app.get('/me', isAuthed, UserCtrl.me);

app.put('/users/:_id', isAuthed, UserCtrl.update);

app.post('/login', passport.authenticate('local', {
  successRedirect: '/me'
}));
app.get('/logout', function(req, res, next) {
  req.logout();
  return res.status(200).send('logged out');
});
app.get('/board', boardCtrl.readBoard);
app.post('/board', isAuthed, boardCtrl.createBoard);
app.delete('/board/:id', boardCtrl.deleteBoard);
app.post('/list', listController.createList);
app.get('/list', listController.readList);
app.delete('/list/:id', listController.deleteList);
app.put('/list/:id', listController.updateList);
app.delete('/card/:id', listController.deleteCard);
app.put('/card/:id', listController.updateCard);





// CONNECTIONS //
var mongoURI = config.MONGO_URI;
var port = config.PORT;

mongoose.connect(mongoURI);
mongoose.connection.once('open', function() {
  console.log('Connected to Mongo DB at', mongoURI);
  app.listen(port, function() {
    console.log('Listening on port '+ port);
  });
});
