/**
 * @author  miaojian@wandoujia.com
 */

define([], function (tpl) {
    'use strict';

    angular.module('co.loading', [])
        .directive('coLoading', function ($timeout, $rootScope) {
            return {
                restrict: 'E',
                scope: true,
                templateUrl: function (tElement, tAttrs) {
                    return tAttrs.templateUrl || '/admin/ui_components/co-loading/co-loading.html';
                },
                link: function ($scope, element, attrs) {
                    $scope.isLoading = false;

                    $rootScope.$watch('isLoading', function(isLoading) {
                        $timeout(function () {
                            $scope.isLoading = isLoading;
                        });
                    });
                }
            };
        })
});
