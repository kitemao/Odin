define([
    'business/main/routes'
], function (routes) {
    'use strict';

    angular.module('bsMain', [])
        .config(['adminRouteProvider',
            function(adminRouteProvider) {
                adminRouteProvider.assignRoutes(routes);
            }
        ])
});
