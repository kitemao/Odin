define([], function () {
    'use strict';

    angular.module('adminRoute', [ 'ngRoute' ])
        .provider('adminRoute', ['$routeProvider', '$locationProvider',
            function($routeProvider, $locationProvider) {
                //$locationProvider.html5Mode(true);

                function attachController(route) {
                    var controllerCfg = route.controllerCfg;

                    if (_.isObject(controllerCfg)) {

                        route.controller = [ '$scope', function ($scope) {
                            _.extend($scope, controllerCfg);
                        }];
                    }
                    return route;
                }

                var navigation = {};

                this.assignRoutes = function(routes) {
                    _.forEach(routes, function(route, path) {

                        $routeProvider.when(path, route);
                        //$routeProvider.when(path, attachController(route));

                        navigation[route.name] = path;
                    });
                };

                this.$get = ['$rootScope',
                    function($rootScope) {
                        return {
                            attachNavigationToRootScope: function() {
                                $rootScope.navigation = navigation;
                            }
                        };
                    }
                ];
            }
        ])
        .run(['adminRoute', '$rootScope', '$location', '$window',
            function(adminRoute, $rootScope, $location, $window) {
                adminRoute.attachNavigationToRootScope();

                $rootScope.changeRoute = function(name) {
                    $location.path($rootScope.navigation[nickName]);
                };
                $rootScope.changeUrl = function(url) {
                    $window.location.href = url;
                };

                $rootScope.$on('$routeChangeStart', function(event, newLoc, oldLoc) {

                });
                $rootScope.$on('$routeChangeSuccess', function(e, current, pre) {

                });
            }
        ]);
});
