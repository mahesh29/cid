var mongoose = require('mongoose');

var jobSchema = mongoose.Schema({
    title: {type:String},
    description:{type:String}
});

var Job = mongoose.model('Job', jobSchema);

exports.seedJobs = function() {
    Job.find({}).exec(function(error, collection) {
        if(collection.length === 0){
            Job.create({title:'Developer', description:'Write lots of bugs, and bluff at the standups'});
            Job.create({title:'Manager', description:'Cry over broken builds and contemplate meaning of life'});
            Job.create({title:'Hrs', description:'Hire Developers, and small talk at the water cooler'});
            Job.create({title:'CEO', description:'Acquire Companies, and then contemplate about what to do next'});
        }
    });
};