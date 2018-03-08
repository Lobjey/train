(function(angular){
    angular.module('myApp', [])
        .controller('refer', refer);
    
    refer.$inject = ['$scope', 'myService'];

    function refer ($scope, myService) {
        myService.readJson("referData").then(function (response) {
            $scope.referData = response.data;
        });   
    }
})(angular)
