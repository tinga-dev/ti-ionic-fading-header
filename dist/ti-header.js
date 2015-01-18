/**
 *
 */
angular.module('tiNavBar', ['ionic'])
    .directive('tiTransparentNavBar', function ($rootScope, tiNavBarDelegate) {
        return {
            restrict: 'A',
            link: function ($scope, $element, $attr) {
                console.log('tiTransparentNavBar');
                var thisState = $attr.stateName;
                $element.css({top: 0});
                tiNavBarDelegate.makeNavBarTransparent();
                $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                    if (toState.name == thisState) {
                        tiNavBarDelegate.makeNavBarTransparent();
                    } else {
                        tiNavBarDelegate.resetNavBar();
                    }
                });
            }
        }
    })

    .directive('tiFadeInNavBarOnScroll', function ($document, tiNavBarDelegate, $rootScope) {
        return {
            restrict: 'A',
            link: function ($scope, $element, $attr) {
                $element.css({top: 0});
                var navbars = tiNavBarDelegate.getNavBars();
                tiNavBarDelegate.makeNavBarTransparent();
                var thisState = $attr.stateName;
                var opacity = 0;

                function onScroll(event) {
                    var scrollTop = event.detail.scrollTop;
                    if (scrollTop <= 140) {
                        //console.log('scrollTop', scrollTop);
                        handleNavBarFade(scrollTop);
                    } else {
                        ionic.requestAnimationFrame(function () {
                            //navbar.css({opacity: 1});
                            //buttons.css({color: themeColor});
                            tiNavBarDelegate.resetNavBar();
                        });
                    }

                }

                $element.bind('scroll', onScroll);

                function handleNavBarFade(scrollTop) {
                    // TODO: make less hardcoded numbers and more in params to this directive
                    if (scrollTop <= 20) {
                        opacity = 0;
                    } else if (scrollTop > 20 && scrollTop <= 140) {
                        opacity = (scrollTop - 20) / 120;
                    } else {
                        opacity = 1;
                    }

                    ionic.requestAnimationFrame(function () {
                        // TODO: if we want to change button color in animation
                        //if (opacity >= 0.7) {
                        //    buttons.css({color: themeColor});
                        //} else if (opacity < 0.7) {
                        //    buttons.css({color: whiteColor});
                        //}
                        // TODO: only fade bg color, with correct colors
                        for (var i = 0; i < navbars.length; i++) {
                            var header = angular.element(navbars[i]);
                            header.css({borderColor: 'rgba(255, 0, 0, ' + opacity + ')', backgroundColor: 'rgba(255, 0, 0,' + opacity + ')'})
                            //header.css({opacity: opacity});
                        }

                    });
                }
            }
        }
    })
    .factory('tiNavBarDelegate', function ($document) {

        var navbars = angular.element($document[0].body.querySelectorAll('ion-header-bar.ti-transparent'));
        return {
            makeNavBarTransparent: function () {
                console.log('navbars', navbars);
                for (var i = 0; i < navbars.length; i++) {
                    var header = angular.element(navbars[i]);
                    //header.css({borderColor: 'rgba(255, 0, 0, 0)', backgroundColor: 'rgba(255, 0, 0, 0)'})
                    header.css({borderColor: 'transparent', backgroundColor: 'transparent'})
                }
            },
            resetNavBar: function () {
                for (var i = 0; i < navbars.length; i++) {
                    var header = angular.element(navbars[i]);
                    header.css({borderColor: '', backgroundColor: ''})
                }
            },
            getNavBars: function () {
                return navbars;
            }
        }
    })