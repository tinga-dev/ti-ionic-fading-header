angular.module('App', ['ionic', 'tiNavBar'])

    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "templates/menu.html"
            })
            .state('app.transparent', {
                url: "/transparent",
                views: {
                    'menuContent': {
                        templateUrl: "templates/transparent.html",
                        controller: "TransparentCtrl"
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
        $urlRouterProvider.otherwise("/app/transparent");
    })
    .controller('TransparentCtrl', function () {
    })

    .controller('FadeInCtrl', function () {
    })

    .controller('MoreCtrl', function () {
    });