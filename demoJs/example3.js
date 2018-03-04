(function(angular){
    angular.module('myApp', [])
        .controller('example3', example3)
    
        example3.$inject = ['$scope'];

    function example3 ($scope) {
        $scope.test = 'example3';
    }
})(angular)