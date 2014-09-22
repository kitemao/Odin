/**
 * @author  miaojian@wandoujia.com
 */

define([], function (tpl) {
    'use strict';

    angular.module('co.grid', [])
        .constant('coGridConfig', {
            itemTemplateUrl: '/admin/ui_components/co-grid/table.html',
            fields: [],
            actions: null
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
                templateUrl: '/admin/ui_components/co-grid/co-grid.html',
                link: function ($scope, element, attrs, ctrls) {

                    $scope.itemTemplateUrl =
                        angular.isDefined(attrs.itemTemplateUrl) ? $scope.$parent.$eval(attrs.itemTemplateUrl) : coGridConfig.itemTemplateUrl;

                    $scope.fields =
                        angular.isDefined(attrs.fields) ? $scope.$parent.$eval(attrs.fields) : coGridConfig.fields;

                    $scope.actions =
                        angular.isDefined(attrs.actions) ? $scope.$parent.$eval(attrs.actions) : coGridConfig.actions;
                }
            };
        }])
});
