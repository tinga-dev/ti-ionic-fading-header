/**
 *
 */
angular.module('tiNavBar', ['ionic'])
    .directive('tiTransparentNavBar', function (tiNavBarDelegate) {
        return {
            restrict: 'A',
            link: function ($scope, $element, $attr) {
                $element.css({top: 0});
                tiNavBarDelegate.makeNavBarTransparent();
            }
        }
    })

    .directive('tiFadeInNavBarOnScroll', function (tiNavBarDelegate) {
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
                            header.css({
                                borderColor: 'rgba(' + targetRgbs[0] + ', ' + targetRgbs[1] + ', ' + targetRgbs[2] + ', ' + opacity + ')',
                                backgroundColor: 'rgba(' + targetRgbs[0] + ', ' + targetRgbs[1] + ', ' + targetRgbs[2] + ', ' + opacity + ')'
                            })
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
    });