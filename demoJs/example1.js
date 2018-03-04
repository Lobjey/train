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
        .controller('example1', example1)
    
    example1.$inject = ['$scope'];

    function example1 ($scope) {
        $scope.mobile = '13572951547';
    }
})(angular)
