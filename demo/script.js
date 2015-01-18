angular.module('App', ['ionic', 'tiNavBar'])

    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "templates/menu.html"
            })
            .state('app.home', {
                url: "/home",
                views: {
                    'menuContent': {
                        templateUrl: "templates/home.html"
                    }
                }
            })
            .state('app.fadein', {
                url: "/fade-in",
                views: {
                    'menuContent': {
                        templateUrl: "templates/fade-in.html",
                        controller: "FadeInCtrl"
                    }
                }
            })
            .state('app.more', {
                url: "/more",
                views: {
                    'menuContent': {
                        templateUrl: "templates/more.html",
                        controller: "MoreCtrl"
                    }
                }
            })

        $urlRouterProvider.otherwise("/app/home");
    })

    .controller('FadeInCtrl', function ($scope) {

    })

    .controller('MoreCtrl', function ($scope) {

    });