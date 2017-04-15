'use strict';

const mongoose = require('mongoose');
const Promise = require('bluebird');
const Job = mongoose.model('Job');

let jobs = [
    {title:'Developer', description:'Write lots of bugs, and bluff at the standups'},
    {title:'Manager', description:'Cry over broken builds and contemplate meaning of life'},
    {title:'Hrs', description:'Hire Developers, and small talk at the water cooler'},
    {title:'CEO', description:'Acquire Companies, and then contemplate about what to do next'}
];

let findJobs = (query) => {
    return Promise.cast(mongoose.model('Job').find(query).exec());
};

exports.findJobs;

exports.connectDB = Promise.promisify(mongoose.connect, {context: mongoose});

var createJob = Promise.promisify(Job.create, {context: Job});

exports.seedJobs = () => {
    return findJobs({}).then((collection) => {
        if(collection.length === 0){
            return Promise.map(jobs, job => createJob(job));
        }
    });
};
