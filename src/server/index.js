const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
var registrationClientRouter = require('./routes/registerClient');
var loginClientRouter = require('./routes/loginClient');
const questionsRouter = require('./routes/questionBank-route');
const quizesRouter = require('./routes/quizes-route');

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/quizDB');

const app = express();
app.use(cors());
app.options('*', cors());
app.use(passport.initialize());
require('./passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//app.use(express.static('public'));

app.get('/', function(req, res) {
  res.send('hello');
});

app.use('/registerClient', registrationClientRouter);

app.use('/login', loginClientRouter );

app.use('/questionBank', questionsRouter);

app.use('/quizes', quizesRouter);

app.listen(3000, function() {
  console.log("Server Started at port 3000");
});
//listens on port 3000 -> http://localhost:3000/
