/**
 * @author  miaojian@wandoujia.com
 */

define([], function (tpl) {
    'use strict';

    angular.module('co.sort', [])
        .directive('coSort', function () {
            return {
                restrict: 'E',
                transclude: true,
                scope: {
                    sort: '=',
                    sortBy: '='
                },
                controller: function ($scope) {
                    $scope.toggleAction = function (sort) {
                        $scope.sort   = $scope.sort == 'asc' ? 'desc' : 'asc';
                        $scope.sortBy = $scope.sortByField;
                    };
                    $scope.removeSort = function () {
                        $scope.sort   = '';
                        $scope.sortBy = '';
                    };

                    $scope.$watch(function () {
                        return $scope.sortBy === $scope.sortByField;
                    }, function (val) {
                        if (!val) {
                            $scope.sortMatch = false;
                        }
                        else {
                            $scope.sortMatch = true;
                        }
                    });
                },
                templateUrl: '/admin/ui_components/co-sort/co-sort.html',
                link: function ($scope, element, attrs) {

                    if (angular.isDefined(attrs.sortByField)) {
                        $scope.sortByField = $scope.$parent.$eval(attrs.sortByField);
                    }
                    else {
                        throw(new Error('need to set sortByField'));
                    }
                }
            };
        })
});
