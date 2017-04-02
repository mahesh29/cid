var express = require('express');
var mongoose = require('mongoose');
var jobModel = require('./models/Job');

var app = express();

app.set('views', __dirname);
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));

app.get('/api/jobs', function(req, res) {
    mongoose.model('Job').find({}).exec(function(error, collection) {
       res.send(collection); 
    });
});

app.get('*', function(req, res) {
    res.render('index');
});

// mongoose.connect('mongodb://localhost/job-finder');
mongoose.connect('mongodb://sandboxdb:password@ds149040.mlab.com:49040/job-finder');

var con = mongoose.connection;

con.once('open', function() {
    console.log('Connected to the Database successfully!');
    jobModel.seedJobs();
});

app.listen(process.env.PORT, process.env.IP);