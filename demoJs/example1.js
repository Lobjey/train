(function(angular){
    angular.module('myApp', [])
        .filter('hidePhoneNumber', function (){
            return function (mobile, start, length){
                start = start && start > 0 ? start : 1;
                length = length && length > 0 ? length : mobile.length - start + 1;
                return mobile.substr(0,start - 1) + new String('*').repeat(length) + 
                    mobile.substr(start + length - 1, mobile.length);
            }
        })
        .controller('example1', example1);
    
    example1.$inject = ['$scope', '$filter', 'userObj'];

    function example1 ($scope, $filter, userObj) {

        $scope.mobile = '13572951547';
        $scope.testCurrency = 1234567.8;
        $scope.initMobile = '13512345678';
        var back = $scope.initMobile;

        $scope.show = function () {
            return $scope.initMobile.indexOf("*") > -1;
        }

        $scope.toggleNumber = function (start, length) {
            if (!$scope.show()) {
                $scope.initMobile = $filter("hidePhoneNumber")($scope.initMobile, start, length);
            } else {
                $scope.initMobile = back;
            }
        }

        $scope.userValue = userObj.value;
    }
})(angular)
