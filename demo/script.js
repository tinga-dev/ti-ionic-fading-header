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
                        templateUrl: "templates/home.html",
                        controller: "HomeCtrl"
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
    .controller('HomeCtrl', function ($scope, tiNavBarDelegate) {
        $scope.$on('$ionicView.enter', function () {
            tiNavBarDelegate.makeNavBarTransparent();
        });
    })

    .controller('FadeInCtrl', function ($scope, tiNavBarDelegate) {
        $scope.$on('$ionicView.enter', function () {
            tiNavBarDelegate.makeNavBarTransparent();
        });
    })

    .controller('MoreCtrl', function ($scope) {

    });