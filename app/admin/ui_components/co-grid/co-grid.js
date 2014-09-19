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
                    gridData: '='
                },
                templateUrl: '/admin/ui_components/co-grid/co-grid.html',
                link: function ($scope, element, attrs, ctrls) {

                    $scope.itemTemplateUrl =
                        angular.isDefined(attrs.itemTemplateUrl) ? $scope.$parent.$eval(attrs.itemTemplateUrl) : coGridConfig.itemTemplateUrl;

                    $scope.fields =
                        angular.isDefined(attrs.fields) ? $scope.$parent.$eval(attrs.fields) : coGridConfig.fields;

                    $scope.actions =
                        angular.isDefined(attrs.actions) ? $scope.$parent.$eval(attrs.actions) : coGridConfig.actions;


                    $scope.deleteAction = function (action) {
                        console.log('delete:', action);
                    };

                    $scope.editAction = function (action) {
                        console.log('edit:', action);
                    };
                }
            };
        }])
});
