angular.module('tiNavBar', ['ionic'])

    .directive('tiTransparentNavBar', function (tiNavBarDelegate, $rootScope) {
        return {
            restrict: 'A',
            link: function ($scope, $element, $attr) {
                $element.css({top: 0});
                tiNavBarDelegate.makeNavBarTransparent();

                $rootScope.$on('$stateChangeStart', function (event, toState) {
                    if (toState.name != $attr.stateName) {
                        tiNavBarDelegate.resetNavBar();
                    }
                });

                $rootScope.$on('$stateChangeSuccess', function (event, toState) {
                    if (toState.name == $attr.stateName) {
                        tiNavBarDelegate.makeNavBarTransparent();
                    }
                });
            }
        }
    })

    .directive('tiFadeInNavBarOnScroll', function (tiNavBarDelegate, $rootScope) {
        return {
            restrict: 'A',
            link: function ($scope, $element, $attr) {
                $element.css({top: 0});
                var targetRgbs = $attr.fadeToRgb.split(',');
                var navbars = tiNavBarDelegate.getNavBars();
                tiNavBarDelegate.makeNavBarTransparent();
                var opacity = 0;

                function onScroll(event) {
                    var scrollTop = event.detail.scrollTop;
                    if (scrollTop <= 140) {
                        handleNavBarFade(scrollTop);
                    } else {
                        ionic.requestAnimationFrame(function () {
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
                    setOpacityToNavBar();
                }

                function setOpacityToNavBar() {
                    ionic.requestAnimationFrame(function () {
                        for (var i = 0; i < navbars.length; i++) {
                            var header = angular.element(navbars[i]);
                            header.css({
                                borderColor: 'rgba(' + targetRgbs[0] + ', ' + targetRgbs[1] + ', ' + targetRgbs[2] + ', ' + opacity + ')',
                                backgroundColor: 'rgba(' + targetRgbs[0] + ', ' + targetRgbs[1] + ', ' + targetRgbs[2] + ', ' + opacity + ')'
                            })
                        }
                    });
                }

                $rootScope.$on('$stateChangeStart', function (event, toState) {
                    if (toState.name != $attr.stateName) {
                        tiNavBarDelegate.resetNavBar();
                    }
                });

                $rootScope.$on('$stateChangeSuccess', function (event, toState) {
                    if (toState.name == $attr.stateName) {
                        setOpacityToNavBar();
                    }
                });
            }
        }
    })
    .service('tiNavBarDelegate', function ($document) {
        var navbars = $document[0].body.querySelectorAll('.nav-bar-block ion-header-bar');
        return {
            makeNavBarTransparent: function () {
                for (var i = 0; i < navbars.length; i++) {
                    var header = angular.element(navbars[i]);
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
    });