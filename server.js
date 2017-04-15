var express = require('express');
var jobModel = require('./models/Job');
var jobsData = require('./jobs-data');

var app = express();

app.set('views', __dirname);
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));

app.get('/api/jobs', function(req, res) {
    jobsData.findJobs().then(function(collection) {
       res.send(collection); 
    });
});

app.get('*', function(req, res) {
    res.render('index');
});

// mongoose.connect('mongodb://localhost/job-finder');
jobsData.connectDB('mongodb://sandboxdb:password@ds149040.mlab.com:49040/job-finder')
.then(function() {
    console.log('Connected to the Database successfully!');
    jobModel.seedJobs();
});

app.listen(process.env.PORT, process.env.IP);