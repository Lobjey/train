(function(angular){
    angular.module('myApp', [])
        .controller('example2', example2)
    
        example2.$inject = ['$scope','palyerData'];

    function example2 ($scope,palyerData) {
        $scope.palyersData = palyerData;
    }
})(angular)
