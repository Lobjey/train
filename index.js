var myApp = angular.module('myApp', ['ui.router', 'oc.lazyLoad']);

myApp.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('home');

    $stateProvider
        .state('home', {
            url: '/',
            template: ''
        })  
        .state('demo', {
            url: '/demo',
            templateUrl: 'views/demo.html'
        })  
        .state('demo.example1', { 
            url: '/example1', 
            templateUrl: 'views/demo/example1.html',
            controller: "example1",
            resolve:{
                example1: ["$ocLazyLoad", function ($ocLazyLoad) {
                    return $ocLazyLoad.load('demoJs/example1.js');
                }]
            }
        })   
        .state('demo.example2', { 
            url: '/example2', 
            templateUrl: 'views/demo/example2.html',
            controller: "example2",
            resolve:{
                palyerData: function($http) {
                    return $http.get('/jsonData/playersData.json')
                        .then(function(response) {
                            return response.data;
                        });
                },
                example2: ["$ocLazyLoad", function ($ocLazyLoad) {
                    return $ocLazyLoad.load('demoJs/example2.js');
                }]
            }
        })   
        .state('demo.example3', { 
            url: '/example3', 
            templateUrl: 'views/demo/example3.html',
            controller: "example3",
            resolve:{
                example3: ["$ocLazyLoad", function ($ocLazyLoad) {
                    return $ocLazyLoad.load('demoJs/example3.js');
                }]
            }
        })   
        .state('about', { 
            url: '/about', 
            templateUrl: 'views/about.html'
        })     
});