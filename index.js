var myApp = angular.module('myApp', ['ui.router']);

myApp.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/team');

    $stateProvider.state('team', {
            url: '/team',
            templateUrl: 'team.html'
        })
        .state('team_Cleveland', {
            url: '/team_Cleveland',
            templateUrl: 'team_Cleveland.html',

        })
        .state('team_Rockets', {
            url: '/team_Rockets',
            templateUrl: 'team_Rockets.html'
        })
        .state('team_GoldenStates', {
            url: '/team_GoldenStates',
            templateUrl: 'team_GoldenStates.html'
        })
        .state('setting', {
            url: '/setting', 
            views: {
                '': { templateUrl: 'setting.html' },
                'backGroungSetting@setting': { templateUrl: 'setting_backGroung.html' },
                'fontSizeSetting@setting': { template: 'fontSizeSetting!' }
            }
        })
});

myApp.controller('myCtrl', function ($scope) {

});