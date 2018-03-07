var myApp = angular.module('myApp', ['ui.router', 'oc.lazyLoad']);

myApp.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('home');

    $stateProvider
        .state('home', {
            url: '/',
            template: '<h1>sdfds</h1>'
        })
        .state('demo', {
            url: '/demo',
            templateUrl: 'views/demo.html'
        })
        .state('demo.example1', {
            url: '/example1',
            templateUrl: 'views/demo/example1.html',
            controller: "example1",
            resolve: {
                userObj:  function(){
                    return {value: 'WDL'};
                 },
                example1: ["$ocLazyLoad", function ($ocLazyLoad) {
                    return $ocLazyLoad.load('demoJs/example1.js');
                }]
            }
        })
        .state('demo.example2', {
            url: '/example2/:id',
            templateUrl: 'views/demo/example2.html',
            controller: "example2",
            // params: {
            //     id: 0
            // },
            resolve: {
                firstService: 'myService',
                getPlayerData: function(firstService) {
                    return firstService.readJson("playersData");
                },
                example2: ["$ocLazyLoad", function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['demoJs/example2.js']);
                }]
            }
        })
        .state('demo.example3', {
            url: '/example3',
            templateUrl: 'views/demo/example3.html',
            controller: "example1",
            resolve: {
                userObj:  function(){
                    return {value: 'Lobjey'};
                 },
                example2: ["$ocLazyLoad", function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['demoJs/example1.js']);
                }]
            }
        })
        .state('refer', {
            url: '/refer',
            templateUrl: 'views/refer/refer.html',
            controller: "refer",
            resolve: {
                example3: ["$ocLazyLoad", function ($ocLazyLoad) {
                    return $ocLazyLoad.load('referJs/refer.js');
                }]
            }
        })
});

myApp.service('myService', myService)

myService.$inject = ['$http'];

function myService($http) {
    var _this = this;

    _this.readJson = function (fileName) {
        return $http.get('jsonData/' + fileName + '.json');
    }
}