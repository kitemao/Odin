/**
 * @author  miaojian@wandoujia.com
 */

define([], function (tpl) {
    'use strict';

    angular.module('co.grid', [])
        .constant('coGridConfig', {
            fields: [],
            actions: null,
            multiChoose: false,
            checkedData: []
        })
        .directive('coGrid', ['coGridConfig', function (coGridConfig) {
            return {
                restrict: 'E',
                scope: {
                    gridData: '=',
                    sort: '=',
                    sortBy: '=',
                    onDeleteItem: '&',
                    onEditItem: '&'
                },
                controller: function ($scope) {
                    $scope.deleteAction = function (item, action) {
                        $scope.onDeleteItem({
                            item: item,
                            action: action
                        });
                    };

                    $scope.editAction = function (item, action) {
                        $scope.onEditItem({
                            item: item,
                            action: action
                        });
                    };

                    $scope.customAction = function (item, action) {
                        if (typeof action.action === 'function') {

                            action.action(item, action, $scope);
                        }
                    }
                    // use double-bind
                    $scope.sortObj = {
                        sort: $scope.sort,
                        sortBy: $scope.sortBy
                    };

                    $scope.$watch('sortObj', function () {
                        $scope.sort   = $scope.sortObj.sort;
                        $scope.sortBy = $scope.sortObj.sortBy;
                    }, true)

                },
                templateUrl: function (tElement, tAttrs) {
                    return tAttrs.templateUrl || '/admin/ui_components/co-grid/table.html';
                },
                link: function ($scope, element, attrs, ctrls) {
                    $scope.multiChoose =
                        angular.isDefined(attrs.multiChoose) ? $scope.$parent.$eval(attrs.multiChoose) : coGridConfig.multiChoose;

                    $scope.fields =
                        angular.isDefined(attrs.fields) ? $scope.$parent.$eval(attrs.fields) : coGridConfig.fields;

                    $scope.actions =
                        angular.isDefined(attrs.actions) ? $scope.$parent.$eval(attrs.actions) : coGridConfig.actions;

                    // multiChoose logic
                    $scope.checkedSource = {
                        isAllChecked: false
                    };

                    // ng-if has new scope, so checkedData put the checkedSource
                    // no use scope =checkedData, not need initialized checkedData
                    $scope.checkedSource.checkedData =
                        angular.isDefined(attrs.checkedData)
                            ? ($scope.$parent.$eval(attrs.checkedData) ? $scope.$parent.$eval(attrs.checkedData) : coGridConfig.checkedData)
                            : coGridConfig.checkedData;

                    $scope.$watch('checkedSource.checkedData', function (checkedData) {
                        $scope.$parent[attrs.checkedData] = checkedData;
                    });

                    if ($scope.multiChoose) {
                        $scope.$watch(function () {
                            return $scope.gridData && ($scope.gridData.length === $scope.checkedSource.checkedData.length);
                        }, function (isAll) {
                            $scope.checkedSource.isAllChecked = isAll ? true : false;
                        });
                    }
                    $scope.multiCheckboxChange = function () {
                        if ($scope.checkedSource.isAllChecked) {
                            $scope.checkedSource.checkedData = angular.copy($scope.gridData);
                        }
                        else {
                            $scope.checkedSource.checkedData = [];
                        }
                    }
                }
            };
        }])
});
