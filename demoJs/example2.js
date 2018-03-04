(function(angular){
    angular.module('myApp', [])
        .controller('example2', example2)
    
        example2.$inject = ['$scope'];

    function example2 ($scope) {
        $scope.test = 'example2';
    }
})(angular)
