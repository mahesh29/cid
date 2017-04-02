angular.module('app', []);

angular.module('app').controller('testCtrl', function($scope) {
    $scope.jobs = [{
        title: 'Sales Consultant',
        description: 'fight dragons'
    }, {
        title: 'Software Developer',
        description: 'use keyboard'
    }];
});