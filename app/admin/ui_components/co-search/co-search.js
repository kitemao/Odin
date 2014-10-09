/**
 * @author  miaojian@wandoujia.com
 */

define([], function (tpl) {
    'use strict';

    angular.module('co.search', [])
        .directive('coSearch', function () {
            return {
                restrict: 'E',
                scope: {
                    keyword: '='
                },
                templateUrl: function (tElement, tAttrs) {
                    return tAttrs.templateUrl || '/admin/ui_components/co-search/co-search.html';
                },
                link: function ($scope, element, attrs) {
                    $scope.search = function () {
                        $scope.keyword = $scope.key;
                    };

                    $scope.reset = function () {
                        $scope.keyword = '';
                        $scope.key = '';
                    };
                }
            };
        })
});
