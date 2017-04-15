// integration tests
'use strict';

var expect = require('chai').expect;
var mongoose = require('mongoose');
var Promise = require('bluebird');
var jobsData = require('../jobs-data');

let resetJobs = () => {
    return new Promise((resolve, reject) => {
        mongoose.connection.collections['jobs'].drop(resolve, reject);
    });
}

describe('get jobs', () => {
    let jobs;
    before((done) => {
        jobsData.connectDB('mongodb://localhost/job-finder')
        .then(resetJobs)
        .then(jobsData.seedJobs)
        .then(jobsData.findJobs)
        .then((collection) => {
           jobs = collection;
           done();
        });
    });

    it('should never be empty since jobs are seeded', () => {
       expect(jobs.length).to.be.at.least(1);
    });
    
    it('should hahve a job with title', () => {
        expect(jobs[0].title).to.not.be.empty;
    });
    
    it('should hahve a job with description', () => {
        expect(jobs[0].description).to.not.be.empty;
    });
});